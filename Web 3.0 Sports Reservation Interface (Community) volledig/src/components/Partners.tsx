import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Search, Star, MapPin, Trophy, Medal, UserPlus, MessageCircle, Filter } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

const partners = [
  {
    id: 1,
    name: 'Sophie van der Berg',
    age: 28,
    location: 'Amsterdam',
    image: 'https://images.unsplash.com/photo-1663576748367-4ff6bec25639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBwbGF5ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc5NjczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sports: ['Tennis', 'Padel', 'Badminton'],
    level: 'Gevorderd',
    bio: 'Zoek een vaste speelpartner voor tennis, speel graag 2x per week',
    rating: 4.8,
    matchesPlayed: 47,
    favoriteSport: 'Tennis',
  },
  {
    id: 2,
    name: 'Tom Janssen',
    age: 32,
    location: 'Rotterdam',
    image: 'https://images.unsplash.com/photo-1669627960958-b4a809aa76ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcHJvZmlsZSUyMHBob3RvfGVufDF8fHx8MTc2Nzk2NzM2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sports: ['Futsal', 'Voetbal', 'Basketball'],
    level: 'Gemiddeld',
    bio: 'Sociale speler, altijd in voor een potje futsal of basketbal!',
    rating: 4.6,
    matchesPlayed: 89,
    favoriteSport: 'Futsal',
  },
  {
    id: 3,
    name: 'Lisa de Vries',
    age: 25,
    location: 'Utrecht',
    image: 'https://images.unsplash.com/photo-1609540204874-3f48f851636c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc5Mzc4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sports: ['Tennis', 'Squash', 'Badminton'],
    level: 'Beginner',
    bio: 'Net begonnen met tennis, zoek gelijkgestemde beginners om mee te oefenen',
    rating: 4.9,
    matchesPlayed: 23,
    favoriteSport: 'Tennis',
  },
  {
    id: 4,
    name: 'Mark Peters',
    age: 29,
    location: 'Amsterdam',
    image: 'https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY3OTI2MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sports: ['Basketball', 'Volleyball', 'Tennis'],
    level: 'Expert',
    bio: 'Competitieve speler, speel graag tegen mensen op hoog niveau',
    rating: 4.7,
    matchesPlayed: 156,
    favoriteSport: 'Basketball',
  },
  {
    id: 5,
    name: 'Emma Bakker',
    age: 27,
    location: 'Den Haag',
    image: 'https://images.unsplash.com/photo-1663576748367-4ff6bec25639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBwbGF5ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc5NjczNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sports: ['Padel', 'Tennis', 'Squash'],
    level: 'Gevorderd',
    bio: 'Padel fanaat! Speel al 5 jaar en altijd in voor nieuwe uitdagingen',
    rating: 4.8,
    matchesPlayed: 134,
    favoriteSport: 'Padel',
  },
  {
    id: 6,
    name: 'David Smit',
    age: 31,
    location: 'Rotterdam',
    image: 'https://images.unsplash.com/photo-1669627960958-b4a809aa76ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcHJvZmlsZSUyMHBob3RvfGVufDF8fHx8MTc2Nzk2NzM2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    sports: ['Futsal', 'Padel', 'Volleyball'],
    level: 'Gemiddeld',
    bio: 'Flexibele speler, kan zowel doordeweeks als in het weekend',
    rating: 4.5,
    matchesPlayed: 67,
    favoriteSport: 'Futsal',
  },
];

const levelColors = {
  'Beginner': 'bg-green-100 text-green-700',
  'Gemiddeld': 'bg-blue-100 text-blue-700',
  'Gevorderd': 'bg-orange-100 text-orange-700',
  'Expert': 'bg-purple-100 text-purple-700',
};

export function Partners() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('matches');

  const handleConnect = (partnerId: number, partnerName: string) => {
    toast.success(`Verbindingsverzoek verstuurd naar ${partnerName}!`, {
      duration: 3000,
    });
  };

  const handleMessage = (partnerName: string) => {
    toast.info(`Bericht versturen naar ${partnerName} (functie komt binnenkort beschikbaar)`, {
      duration: 3000,
    });
  };

  // Filter partners
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'all' || partner.sports.includes(selectedSport);
    const matchesLevel = selectedLevel === 'all' || partner.level === selectedLevel;
    
    return matchesSearch && matchesSport && matchesLevel;
  });

  // Sort partners
  const sortedPartners = [...filteredPartners].sort((a, b) => {
    if (sortBy === 'matches') return b.matchesPlayed - a.matchesPlayed;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-sport-background pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sport-primary to-sport-accent text-white rounded-full mb-6">
            <Users className="w-5 h-5" />
            <span className="font-medium">Vind jouw sportpartner</span>
          </div>
          <h1 className="text-5xl font-bold text-sport-dark mb-4">
            Sportpartners
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Match met sportpartners op jouw niveau en maak sport sociaal
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-sport-primary" />
            <h2 className="text-lg font-semibold text-sport-dark">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Zoek op naam of locatie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sport Filter */}
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle sporten</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Padel">Padel</SelectItem>
                <SelectItem value="Futsal">Futsal</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Badminton">Badminton</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle niveaus</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Gemiddeld">Gemiddeld</SelectItem>
                <SelectItem value="Gevorderd">Gevorderd</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sorteer op" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matches">Meest gespeelde wedstrijden</SelectItem>
                <SelectItem value="rating">Hoogste beoordeling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {sortedPartners.length} {sortedPartners.length === 1 ? 'sportpartner' : 'sportpartners'} gevonden
          </p>
        </div>

        {/* Partners Grid */}
        {sortedPartners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-sport-primary to-sport-accent">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover opacity-90"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-sm">{partner.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    {/* Name and Location */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-sport-dark mb-1">
                        {partner.name}, {partner.age}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {partner.location}
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="mb-3">
                      <Badge className={`${levelColors[partner.level as keyof typeof levelColors]} border-0`}>
                        {partner.level}
                      </Badge>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {partner.bio}
                    </p>

                    {/* Sports */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {partner.sports.map((sport) => (
                          <Badge key={sport} variant="outline" className="text-xs">
                            {sport}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-sport-primary" />
                        <span>{partner.matchesPlayed} wedstrijden</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Medal className="w-4 h-4 text-sport-accent" />
                        <span>{partner.favoriteSport}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => handleMessage(partner.name)}
                        variant="outline"
                        className="w-full"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Bericht
                      </Button>
                      <Button
                        onClick={() => handleConnect(partner.id, partner.name)}
                        className="w-full bg-gradient-to-r from-sport-primary to-sport-accent text-white"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Verbinden
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Geen sportpartners gevonden
            </h3>
            <p className="text-gray-500">
              Probeer de filters aan te passen om meer resultaten te zien
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
