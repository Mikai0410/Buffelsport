import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Search, Navigation, Clock, Star, Euro, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { facilityLocations, FacilityLocation } from './locationsData';
import { LocationBookingDialog } from './LocationBookingDialog';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


interface Location extends FacilityLocation {
  distance?: number;
  rating?: number;
  priceRange?: string;
  openNow?: boolean;
}

interface LocationsProps {
  onBookNow?: () => void;
  onGoToDashboard?: () => void;
  onBookingConfirmed?: (b: {
    fieldName: string;
    sport: string;
    date: string;
    time: string;
    price: number;
  }) => void;
}

// ENG → NL vertalingen
const sportTranslations: Record<string, string> = {
  // Teamsporten
  football: 'Voetbal',
  futsal: 'Zaalvoetbal',
  basketball: 'Basketbal',
  volleyball: 'Volleybal',
  badminton: 'Badminton',
  korfball: 'Korfbal',
  handball: 'Handbal',
  hockey: 'Hockey',
  rugby: 'Rugby',

  // Rackets
  tennis: 'Tennis',
  padel: 'Padel',
  squash: 'Squash',
  'table tennis': 'Tafeltennis',

  // Water
  swimming: 'Zwemmen',
  'swimming pool': 'Zwembad',
  'scuba diving': 'Duiken',
  'water ski': 'Waterskiën',
  canoe: 'Kano',

  // Fitness & indoor
  fitness: 'Fitness',
  'fitness centre': 'Fitnesscentrum',
  'sports centre': 'Sportcentrum',
  'sports hall': 'Sporthal',
  multi: 'Multi-sport',
  pilates: 'Pilates',
  yoga: 'Yoga / Pilates',
  spinning: 'Spinning',
  crossfit: 'CrossFit',
  gymnastics: 'Gymnastiek',
  trampoline: 'Trampoline',
  climbing: 'Klimmen',
  'climbing adventure': 'Klimpark',

  // Vechtsporten
  'martial arts': 'Vechtsport',
  boxing: 'Boksen',
  kickboxing: 'Kickboksen',
  'krav maga': 'Krav Maga',

  // Buiten & recreatie
  running: 'Hardlopen',
  cycling: 'Fietsen',
  mtb: 'Mountainbiken',
  bmx: 'BMX',
  skating: 'Skaten',
  'roller skating': 'Rolschaatsen',
  golf: 'Golf',
  petanque: 'Jeu de boules',
  equestrian: 'Paardrijden',
  archery: 'Boogschieten',
  shooting: 'Schietsport',
  klootschieten: 'Klootschieten',
  motocross: 'Motocross',
  karting: 'Karten',
  track: 'Circuit',

  // Spellen & overig
  billiards: 'Biljart',
  snooker: 'Snooker',
  pool: 'Pool',
  bowling: 'Bowlen',
  'bowling alley': 'Bowlingbaan',
  'escape game': 'Escape room',
  'rc car': 'RC-auto',
  miniature: 'Midgetgolf',
};

function normalizeSport(raw: string): string {
  return raw.replace(/<na>/gi, '').trim().toLowerCase();
}

// split 
function splitSports(raw: string): string[] {
  const cleaned = raw.replace(/<na>/gi, '').trim();
  if (!cleaned) return [];

  return cleaned
    .split(/[;,.\/]/g) // ✅ ook . en /
    .map((s) => normalizeSport(s))
    .filter(Boolean);
}

// map synoniemen naar 1 key (dedupe)
function canonicalSportKey(raw: string): string {
  const k = raw.trim().toLowerCase();
  if (k === 'boules' || k === 'petanque') return 'petanque';
  if (k === 'soccer' || k === 'football') return 'football';
  if (k === '10pin' || k === '9pin' || k === 'bowling alley') return 'bowling';
  if (k === 'exercise' || k === 'fitness station') return 'fitness';
  if (k === 'sports centre' || k === 'sports center') return 'sports centre';
  if (k === 'sports hall') return 'sports hall';
  if (k === 'scuba') return 'scuba diving';
  if (k === 'field hockey') return 'hockey';
  if (k.includes('yoga') || k.includes('pilates')) return 'yoga';
  return k;
}


function translateSport(raw: string): string | null {
  if (!raw) return null;

  const cleaned = raw.replace(/<na>/gi, '').trim();
  if (!cleaned || cleaned.toLowerCase() === 'na') return null;

  const key = cleaned.toLowerCase();
  const translated = sportTranslations[key];

  if (translated) return translated;

  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function hasDutchTranslation(raw: string): boolean {
  const key = raw.trim().toLowerCase();
  return Boolean(sportTranslations[key]);
}

function normalizeWebsite(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // als er geen http/https in zit er zelf https:// voor zetten
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

const initialLocations: Location[] = facilityLocations.map((loc, index) => ({
  ...loc,
  rating: 4 + (index % 10) * 0.1,
  priceRange: '40-60',
  openNow: true,
}));

export function Locations({ onBookNow, onGoToDashboard, onBookingConfirmed }: LocationsProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(initialLocations);
  const [selectedSport, setSelectedSport] = useState('Alle');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLocation, setBookingLocation] = useState<Location | null>(null);

  const [origin, setOrigin] = useState<{ lat: number; lng: number }>({
    lat: 52.3676, // Amsterdam
    lng: 4.9041,
  });

  const [visibleCount, setVisibleCount] = useState(10);

  const sportOptions = (() => {
    const set = new Set<string>();

    for (const loc of initialLocations) {
      for (const entry of loc.sports ?? []) {
        for (const s of splitSports(entry)) {
          const key = canonicalSportKey(s);
          if (key) set.add(key);
        }
      }
    }

    const opts = Array.from(set)
      .filter((key) => hasDutchTranslation(key))
      .map((key) => ({ key, label: sportTranslations[key] }))
      .sort((a, b) => a.label.localeCompare(b.label, 'nl'));


    return [{ key: 'Alle', label: 'Alle sporten' }, ...opts];
  })();



  function normalizeSportKey(raw: string): string {
    return raw
      .replace(/<na>/gi, '')
      .trim()
      .toLowerCase();
  }

  const handleSearch = () => {
    let filtered: Location[] = [...initialLocations];

    // 1. Filter op sport
  if (selectedSport !== 'Alle') {
    filtered = filtered.filter((loc) =>
      (loc.sports ?? []).some((entry) =>
        splitSports(entry).some((s) => canonicalSportKey(s) === selectedSport)
      )
    );
  }
    // 2. Tekstfilter, MAAR niet voor "Mijn locatie"
    const q = searchLocation.trim().toLowerCase();
    if (q && q !== 'mijn locatie') {
      filtered = filtered.filter((loc) =>
        (loc.city || '').toLowerCase().includes(q) ||
        (loc.name || '').toLowerCase().includes(q) ||
        (loc.address || '').toLowerCase().includes(q)
      );
    }

    // 3. Afstand berekenen vanaf huidige origin (kan Amsterdam zijn of de gebruiker)
    filtered = filtered.map((loc) => ({
      ...loc,
      distance: haversineDistanceKm(origin.lat, origin.lng, loc.lat, loc.lng),
    }));

    // 4. Sorteren op afstand
    filtered.sort((a, b) => (a.distance ?? 99999) - (b.distance ?? 99999));

    setFilteredLocations(filtered);
    setVisibleCount(10);
  };

  function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c * 10) / 10;
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Je browser ondersteunt geen locatiebepaling');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // 1. origin updaten naar de echte gebruikerslocatie
        setOrigin({ lat: latitude, lng: longitude });

        // 2. label in input
        setSearchLocation('Mijn locatie');

        // 3. meteen opnieuw filteren met nieuwe origin
        let filtered: Location[] = [...initialLocations];

        if (selectedSport !== 'Alle') {
          filtered = filtered.filter((loc) =>
            (loc.sports ?? []).some((s) => normalizeSportKey(s) === normalizeSportKey(selectedSport))
          );
        }

        // geen tekstfilter, want "Mijn locatie"
        filtered = filtered.map((loc) => ({
          ...loc,
          distance: haversineDistanceKm(latitude, longitude, loc.lat, loc.lng),
        }));

        filtered.sort((a, b) => (a.distance ?? 99999) - (b.distance ?? 99999));

        setFilteredLocations(filtered);
        setVisibleCount(10);
      },
      (err) => {
        console.error(err);
        alert('Kon je locatie niet ophalen. Controleer of je locatie delen hebt toegestaan.');
      }
    );
  };

  // Leaflet icon
const locationIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedLocationIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const userIcon = L.divIcon({
  className: '',
  html: `
    <div style="position: relative;">
      <div class="pulse-ring"></div>
      <div class="user-location-dot"></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});


  // Map die inzoomt op geselecteerde locatie
  function MapFocus({ selectedLocation }: { selectedLocation: Location | null }) {
    const map = useMap();

    React.useEffect(() => {
      if (selectedLocation) {
        map.setView([selectedLocation.lat, selectedLocation.lng], 13, { animate: true });
      }
    }, [selectedLocation, map]);

    return null;
  }

  function MapOrigin({
    origin,
    selectedLocation,
  }: {
    origin: { lat: number; lng: number };
    selectedLocation: Location | null;
  }) {
    const map = useMap();

    React.useEffect(() => {
      if (!selectedLocation) {
        map.setView([origin.lat, origin.lng], 12, { animate: true });
      }
    }, [origin, selectedLocation, map]);

    return null;
  }

const visibleLocations = filteredLocations.slice(0, visibleCount);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl text-gray-900 mb-4">Vind sportlocaties bij jou in de buurt</h1>
          <p className="text-xl text-gray-600">
            Ontdek alle beschikbare sportfaciliteiten en boek direct jouw favoriete veld
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Location Input */}
            <div className="md:col-span-5">
              <label className="block text-sm text-gray-600 mb-2">Locatie</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Voer stad of postcode in"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sport-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div className="md:col-span-4">
              <label className="block text-sm text-gray-600 mb-2">Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sport-primary focus:border-transparent"
              >
                {sportOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-3 flex items-end gap-2">
              <Button
                onClick={handleSearch}
                className="flex-1 bg-sport-primary text-white hover:bg-sport-primary/90 h-[46px]"
              >
                <Search className="w-4 h-4 mr-2" />
                Zoeken
              </Button>
              <Button
                onClick={handleUseMyLocation}
                variant="outline"
                className="h-[46px] px-3"
                title="Gebruik mijn locatie"
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-gray-900">
                {filteredLocations.length} locaties gevonden
              </h2>
            </div>

            {filteredLocations.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">Geen locaties gevonden</h3>
                <p className="text-gray-600">
                  Probeer een andere locatie of sport te selecteren
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {visibleLocations.map((location, index) => (
                    <motion.div
                      key={location.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                        selectedLocation?.id === location.id ? 'ring-2 ring-sport-primary' : ''
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl text-gray-900">{location.name}</h3>
                              {location.openNow && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  Open
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 flex items-center gap-1 mb-1">
                              <MapPin className="w-4 h-4" />
                              {location.address || location.city
                                ? `${location.address || ''}${
                                    location.address && location.city ? ', ' : ''
                                  }${location.city || ''}`
                                : 'Adres onbekend'}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {location.distance} km afstand
                            </p>
                          </div>
                          {location.rating && (
                            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-gray-900">{location.rating}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {Array.from(
                            new Set(
                              (location.sports ?? [])
                                .flatMap(splitSports)
                                .map(canonicalSportKey)
                                .map(translateSport)
                                .filter((s): s is string => !!s)
                            )
                          ).map((sport) => (
                              <span
                                key={sport}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {sport}
                              </span>
                            ))}
                        </div>

                        {/* Divider + Footer */}
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                            {location.priceRange && (
                              <span className="flex items-center gap-1">
                                <Euro className="w-4 h-4" />
                                {location.priceRange}
                              </span>
                            )}

                            {location.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {location.phone}
                              </span>
                            )}

                            {normalizeWebsite(location.website) && (
                              <a
                                href={normalizeWebsite(location.website)!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sport-primary hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Website
                              </a>
                            )}
                          </div>

                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setBookingLocation(location);
                              setBookingOpen(true);
                            }}
                            className="bg-sport-primary text-white hover:bg-sport-primary/90 rounded-xl px-6"
                          >
                            Boek nu
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load more knop */}
                {filteredLocations.length > visibleCount && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setVisibleCount((prev) => prev + 10)}
                    >
                      Toon 10 extra locaties
                    </Button>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Map */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-[600px]">
                  <MapContainer
                    center={[52.1, 5.3]}   
                    zoom={11}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap-bijdragers"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapOrigin origin={origin} selectedLocation={selectedLocation} /> {/* kaart center = origin */}
                    <MapFocus selectedLocation={selectedLocation} /> {/* zoom bij selectie */}

                    /* marker voor de gebruikerslocatie */
                    <Marker position={[origin.lat, origin.lng]} icon={userIcon}>
                      <Popup>Jouw locatie</Popup>
                    </Marker>

                    /* markers voor ALLEEN de gefilterde locaties met geldige coördinaten */
                    {filteredLocations
                      .filter(
                        (loc) =>
                          typeof loc.lat === 'number' &&
                          typeof loc.lng === 'number' &&
                          !Number.isNaN(loc.lat) &&
                          !Number.isNaN(loc.lng)
                      )
                      .map((location) => {
                        const isSelected = selectedLocation?.id === location.id;

                        return (
                          <Marker
                            key={location.id}
                            position={[location.lat, location.lng]}
                            icon={isSelected ? selectedLocationIcon : locationIcon}
                            zIndexOffset={isSelected ? 1000 : 0}
                            eventHandlers={{
                              click: () => setSelectedLocation(location),
                            }}
                          >
                            <Popup>
                              <div className="text-sm">
                                <div className="font-semibold mb-1">{location.name}</div>
                                <div>
                                  {location.address || location.city
                                    ? `${location.address || ''}${
                                        location.address && location.city ? ', ' : ''
                                      }${location.city || ''}`
                                    : 'Adres onbekend'}
                                </div>
                                {location.distance && (
                                  <div className="text-gray-500 text-xs mt-1">
                                    {location.distance} km afstand
                                  </div>
                                )}
                                {normalizeWebsite(location.website) && (
                                  <div className="mt-1">
                                    <a
                                      href={normalizeWebsite(location.website)!}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sport-primary text-xs hover:underline"
                                    >
                                      Website openen
                                    </a>
                                  </div>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                        );
                      })}
                  </MapContainer>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    <LocationBookingDialog
      location={bookingLocation}
      open={bookingOpen}
      onOpenChange={(open) => setBookingOpen(open)}
      onGoToDashboard={() => {
        setBookingOpen(false);
        setBookingLocation(null);
        onGoToDashboard?.();
      }}
      onBookingConfirmed={onBookingConfirmed}
    />
  </div>
  );
}
