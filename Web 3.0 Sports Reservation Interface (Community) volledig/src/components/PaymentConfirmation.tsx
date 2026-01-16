import { motion } from 'motion/react';
import { CheckCircle, Calendar, MapPin, Clock, DollarSign, CreditCard, Smartphone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PaymentConfirmationProps {
  bookingDetails: {
    fieldName: string;
    sport: string;
    date: string;
    time: string;
    price: number;
  };
  onClose: () => void;
  onProceedToPayment: () => void;
  onGoToDashboard?: () => void;
}

export function PaymentConfirmation({ bookingDetails, onClose, onProceedToPayment }: PaymentConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-sport-dark mb-2">Boeking Bevestigd!</h2>
        <p className="text-gray-600">Je sportveld is succesvol gereserveerd</p>
      </motion.div>

      {/* Booking Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-bold text-sport-dark mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sport-primary" />
            Boekingsoverzicht
          </h3>
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-4 border-b">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sport-accent" />
                <div>
                  <div className="text-sm text-gray-600">Veldnaam</div>
                  <div className="font-semibold text-sport-dark">{bookingDetails.fieldName}</div>
                </div>
              </div>
              <Badge className="bg-sport-secondary/20 text-sport-primary">
                {bookingDetails.sport}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-sport-primary" />
                <div>
                  <div className="text-sm text-gray-600">Datum</div>
                  <div className="font-semibold text-sport-dark">{bookingDetails.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-sport-primary" />
                <div>
                  <div className="text-sm text-gray-600">Tijd</div>
                  <div className="font-semibold text-sport-dark">{bookingDetails.time}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5" />
                <span>Totaal Bedrag</span>
              </div>
              <div className="text-3xl font-bold text-sport-accent">
                ${bookingDetails.price}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-bold text-sport-dark mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-sport-primary" />
            Betaalmethode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Credit Card', icon: CreditCard },
              { name: 'E-Portemonnee', icon: Smartphone },
              { name: 'Bankoverschrijving', icon: CreditCard },
            ].map((method, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 border-2 border-sport-secondary/30 rounded-xl hover:border-sport-primary transition-all"
              >
                <method.icon className="w-8 h-8 text-sport-primary mx-auto mb-2" />
                <div className="text-sm font-medium text-sport-dark">{method.name}</div>
              </motion.button>
            ))}
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Button 
              onClick={onProceedToPayment}
              className="w-full gradient-accent text-white py-6 rounded-xl hover:shadow-lg hover:shadow-sport-accent/50 transition-all"
            >
              Doorgaan naar Betaling
            </Button>
          </motion.div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1 py-6 rounded-xl border-2 hover:bg-sport-primary/5"
        >
          Dashboard Bekijken
        </Button>
        <Button
          onClick={onClose}
          className="flex-1 bg-sport-primary text-white py-6 rounded-xl hover:bg-sport-primary/90"
        >
          Boek Nog Een Veld
        </Button>
      </motion.div>

      {/* Email Notification Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-center text-sm text-gray-600"
      >
        📧 Een bevestigingsmail is verzonden naar je geregistreerde e-mailadres
      </motion.div>
    </div>
  );
}