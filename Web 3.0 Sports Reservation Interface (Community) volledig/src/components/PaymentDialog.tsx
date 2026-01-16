import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onPaymentComplete: () => void;
}

export function PaymentDialog({ open, onOpenChange, amount, onPaymentComplete }: PaymentDialogProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            Betalingsgegevens
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Voer je betalingsgegevens in om de transactie te voltooien.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gradient-accent rounded-xl p-6 text-white mb-6">
            <div className="text-sm opacity-80 mb-1">Totaal Bedrag</div>
            <div className="text-4xl font-bold">${amount}</div>
          </div>

          <div className="mb-6">
            <Label>Betaalmethode</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="ewallet">E-Portemonnee</SelectItem>
                <SelectItem value="bank">Bankoverschrijving</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === 'card' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Kaarthouder Naam</Label>
                <Input
                  id="cardName"
                  type="text"
                  placeholder="JOHN DOE"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Kaartnummer</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Vervaldatum</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className="pl-10"
                      maxLength={5}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      className="pl-10"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                <Button
                  type="submit"
                  className="w-full gradient-accent text-white py-6 rounded-xl hover:shadow-lg hover:shadow-sport-accent/50 transition-all"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Betaal ${amount}
                </Button>
              </motion.div>

              <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Beveiligd door SSL-versleuteling
              </div>
            </form>
          )}

          {paymentMethod === 'ewallet' && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Selecteer je voorkeurs e-portemonnee:</p>
              <div className="grid grid-cols-2 gap-4">
                {['PayPal', 'Apple Pay', 'Google Pay', 'Samsung Pay'].map((wallet) => (
                  <Button key={wallet} variant="outline" className="h-16">
                    {wallet}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="text-center py-8 space-y-4">
              <p className="text-gray-600">Overmaken naar:</p>
              <div className="bg-gray-100 rounded-lg p-4 text-left">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Banknaam:</div>
                  <div className="font-medium">BuffelSport Bank</div>
                  <div className="text-gray-600">Rekeningnummer:</div>
                  <div className="font-medium">1234567890</div>
                  <div className="text-gray-600">Bedrag:</div>
                  <div className="font-bold text-sport-accent">${amount}</div>
                </div>
              </div>
              <Button onClick={onPaymentComplete} className="w-full gradient-accent text-white">
                Ik heb de overschrijving gedaan
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}