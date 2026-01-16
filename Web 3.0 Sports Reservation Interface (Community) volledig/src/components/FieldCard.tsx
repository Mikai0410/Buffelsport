import { motion } from 'motion/react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FieldCardProps {
  id: number;
  name: string;
  sportType: string;
  image: string;
  location: string;
  price: number;
  available: boolean;
  onReserve: (id: number) => void;
}

export function FieldCard({
  id,
  name,
  sportType,
  image,
  location,
  price,
  available,
  onReserve,
}: FieldCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            className={`${
              available
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } backdrop-blur-sm`}
          >
            <div className="w-2 h-2 rounded-full bg-white mr-2" />
            {available ? 'Beschikbaar' : 'Geboekt'}
          </Badge>
        </div>

        {/* Sport Type */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-sport-primary text-white backdrop-blur-sm">
            {sportType}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-sport-dark mb-2">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-sport-accent" />
            <div>
              <div className="text-2xl font-bold text-sport-dark">${price}</div>
              <div className="text-xs text-gray-500">per uur</div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onReserve(id)}
              disabled={!available}
              className={`${
                available
                  ? 'gradient-accent text-white hover:shadow-lg hover:shadow-sport-accent/50'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } rounded-xl transition-all`}
            >
              <Clock className="w-4 h-4 mr-2" />
              {available ? 'Nu Reserveren' : 'Niet Beschikbaar'}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}