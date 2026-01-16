import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, CheckCircle } from 'lucide-react';

interface BookingCalendarProps {
  fieldName: string;
  onConfirm: (date: Date, time: string) => void;
}

export function BookingCalendar({ fieldName, onConfirm }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = [
    { time: '08:00 - 10:00', available: true },
    { time: '10:00 - 12:00', available: true },
    { time: '12:00 - 14:00', available: false },
    { time: '14:00 - 16:00', available: true },
    { time: '16:00 - 18:00', available: false },
    { time: '18:00 - 20:00', available: true },
    { time: '20:00 - 22:00', available: true },
  ];

  return (
    <div className="space-y-8 w-full">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-sport-dark mb-2">Boek {fieldName}</h2>
        <p className="text-gray-600">Selecteer je gewenste datum en tijdslot</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-10 w-full items-start">

        {/* Calendar */}
        <Card className="p-8 flex flex-col w-full">
          <h3 className="text-lg font-semibold text-sport-dark mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sport-primary" />
            Selecteer Datum
          </h3>
          <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-xl border border-sport-secondary/30"
            classNames={{
              day_selected: 'bg-sport-primary text-white hover:bg-sport-primary',
              day_today: 'bg-sport-secondary/20 text-sport-primary',
            }}
          />
          </div> 
        </Card>

        {/* Time Slots */}
        <Card className="p-8 flex flex-col w-full">
          <h3 className="text-lg font-semibold text-sport-dark mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sport-primary" />
            Beschikbare Tijdslots
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {timeSlots.map((slot, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: slot.available ? 1.02 : 1 }}
                whileTap={{ scale: slot.available ? 0.98 : 1 }}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedTime === slot.time
                    ? 'border-sport-accent bg-sport-accent/10'
                    : slot.available
                    ? 'border-sport-secondary/30 hover:border-sport-primary bg-white'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                }`}
                disabled={!slot.available}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sport-dark">{slot.time}</span>
                  {slot.available ? (
                    <Badge className="bg-green-500 text-white">
                      <div className="w-2 h-2 rounded-full bg-white mr-1" />
                      Beschikbaar
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white">Geboekt</Badge>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </Card>
      </div>

      {/* Confirm Button */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-6 bg-sport-primary/5 border-sport-primary/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-sport-accent" />
              <div className="text-left">
                <div className="text-sm text-gray-600">Jouw Selectie</div>
                <div className="font-semibold text-sport-dark">
                  {selectedDate.toLocaleDateString()} • {selectedTime}
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onConfirm(selectedDate, selectedTime)}
                className="gradient-accent text-white px-8 py-6 rounded-xl hover:shadow-lg hover:shadow-sport-accent/50 transition-all"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Boeking Bevestigen
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}