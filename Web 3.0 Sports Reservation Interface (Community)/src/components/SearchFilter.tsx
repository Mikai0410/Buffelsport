import { motion } from 'motion/react';
import { Search, MapPin, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SearchFilterProps {
  onSearch: () => void;
}

export function SearchFilter({ onSearch }: SearchFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-sport-primary/10 flex items-center justify-center">
          <Filter className="w-5 h-5 text-sport-primary" />
        </div>
        <h2 className="text-2xl font-bold text-sport-dark">Zoek & Filter Faciliteiten</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Locatie
          </label>
          <Select>
            <SelectTrigger className="border-sport-secondary/30 focus:border-sport-primary focus:ring-sport-primary/20 rounded-xl">
              <SelectValue placeholder="Selecteer locatie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown">Centrum</SelectItem>
              <SelectItem value="north">Noord District</SelectItem>
              <SelectItem value="south">Zuid District</SelectItem>
              <SelectItem value="east">Oost District</SelectItem>
              <SelectItem value="west">West District</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sport Type */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Sporttype
          </label>
          <Select>
            <SelectTrigger className="border-sport-secondary/30 focus:border-sport-primary focus:ring-sport-primary/20 rounded-xl">
              <SelectValue placeholder="Selecteer sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="futsal">Futsal</SelectItem>
              <SelectItem value="basketball">Basketbal</SelectItem>
              <SelectItem value="badminton">Badminton</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="volleyball">Volleybal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Datum
          </label>
          <Input
            type="date"
            className="border-sport-secondary/30 focus:border-sport-primary focus:ring-sport-primary/20 rounded-xl"
          />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Tijdslot
          </label>
          <Select>
            <SelectTrigger className="border-sport-secondary/30 focus:border-sport-primary focus:ring-sport-primary/20 rounded-xl">
              <SelectValue placeholder="Selecteer tijd" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="08-10">08:00 - 10:00</SelectItem>
              <SelectItem value="10-12">10:00 - 12:00</SelectItem>
              <SelectItem value="12-14">12:00 - 14:00</SelectItem>
              <SelectItem value="14-16">14:00 - 16:00</SelectItem>
              <SelectItem value="16-18">16:00 - 18:00</SelectItem>
              <SelectItem value="18-20">18:00 - 20:00</SelectItem>
              <SelectItem value="20-22">20:00 - 22:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6"
      >
        <Button
          onClick={onSearch}
          className="w-full gradient-accent text-white py-6 rounded-xl hover:shadow-lg hover:shadow-sport-accent/50 transition-all"
        >
          <Search className="w-5 h-5 mr-2" />
          Zoek Beschikbare Faciliteiten
        </Button>
      </motion.div>
    </motion.div>
  );
}