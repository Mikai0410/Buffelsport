import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Check, Mail, User, MessageSquare, ShoppingCart, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const giftOptions = [
  {
    id: 1,
    title: '1 uur padel',
    description: 'Geniet van een uur spannend padel op een premium binnenbaan',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1657704358775-ed705c7388d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMGNvdXJ0JTIwdGVubmlzfGVufDF8fHx8MTc2NjE0ODU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-blue-500 to-cyan-500',
    popular: true,
  },
  {
    id: 2,
    title: '1 uur tennis',
    description: 'Een uur tennis op een professionele outdoor of indoor baan',
    price: 40,
    originalPrice: 50,
    image: 'https://images.unsplash.com/photo-1658491830143-72808ca237e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjYxNDg1NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-green-500 to-emerald-500',
    popular: false,
  },
  {
    id: 3,
    title: 'Sportschool dagpas',
    description: 'Volledige toegang tot een van de premium sportschool faciliteiten voor één dag',
    price: 25,
    originalPrice: 30,
    image: 'https://images.unsplash.com/photo-1632077804406-188472f1a810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBmaXRuZXNzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjE0ODU0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-orange-500 to-red-500',
    popular: false,
  },
  {
    id: 4,
    title: '100 ballen op de driving range',
    description: 'Oefen je swing met 100 golfballen op een van de moderne driving ranges',
    price: 20,
    originalPrice: 25,
    image: 'https://images.unsplash.com/photo-1566156814675-adc10b8a8dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xmJTIwZHJpdmluZyUyMHJhbmdlfGVufDF8fHx8MTc2NjE0ODU0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-purple-500 to-pink-500',
    popular: false,
  },
];

export function GiftPage() {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSelectGift = (giftId: number) => {
    setSelectedGift(giftId);
    setGiftDialogOpen(true);
  };

  const handlePurchaseGift = () => {
    // Mock purchase
    const giftName = selectedGiftData?.title || 'cadeau';
    setGiftDialogOpen(false);
    toast.success(`${giftName} succesvol aangekocht en verstuurd naar ${recipientEmail}!`, {
      duration: 4000,
    });
    setSelectedGift(null);
    setRecipientName('');
    setRecipientEmail('');
    setPersonalMessage('');
    setQuantity(1);
  };

  const selectedGiftData = giftOptions.find(g => g.id === selectedGift);
  const totalPrice = selectedGiftData ? selectedGiftData.price * quantity : 0;

  return (
    <div className="min-h-screen bg-sport-background pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sport-primary to-sport-accent text-white rounded-full mb-6">
            <Gift className="w-5 h-5" />
            <span className="font-medium">Geef het cadeau van sport</span>
          </div>
          <h1 className="text-5xl font-bold text-sport-dark mb-4">
            Geef een sport cadeau
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verras je vrienden en familie met een sportief cadeau. Perfect voor elke gelegenheid!
          </p>
        </motion.div>

        {/* Gift Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {giftOptions.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                {/* Popular Badge */}
                {gift.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-400 text-yellow-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Populair
                    </Badge>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gift.color} opacity-20`} />
                  <img
                    src={gift.image}
                    alt={gift.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-sport-dark mb-2">
                    {gift.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {gift.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-sport-primary">
                        €{gift.price}
                      </span>
                      <span className="text-gray-400 line-through">
                        €{gift.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      Bespaar €{gift.originalPrice - gift.price}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleSelectGift(gift.id)}
                      className={`w-full bg-gradient-to-r ${gift.color} text-white hover:shadow-lg`}
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Cadeau geven
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-sport-dark text-center mb-12">
            Waarom een BuffelSport cadeau?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-sport-dark mb-2">
                Direct per email
              </h3>
              <p className="text-gray-600 text-sm">
                De ontvanger krijgt het cadeau direct in de inbox met een persoonlijk bericht
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-sport-dark mb-2">
                Makkelijk inwisselen
              </h3>
              <p className="text-gray-600 text-sm">
                Simpel in te wisselen via de BuffelSport app of website, geen gedoe
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-sport-dark mb-2">
                Flexibel te gebruiken
              </h3>
              <p className="text-gray-600 text-sm">
                Geldig voor 12 maanden, zodat de ontvanger kan kiezen wanneer het uitkomt
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gift Purchase Dialog */}
      <Dialog open={giftDialogOpen} onOpenChange={setGiftDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Gift className="w-6 h-6 text-sport-primary" />
              Personaliseer je cadeau
            </DialogTitle>
            <DialogDescription>
              Vul de details in om je sportcadeau te versturen
            </DialogDescription>
          </DialogHeader>

          {selectedGiftData && (
            <div className="space-y-6">
              {/* Selected Gift Preview */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                <img
                  src={selectedGiftData.image}
                  alt={selectedGiftData.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-sport-dark">{selectedGiftData.title}</h4>
                  <p className="text-sm text-gray-600">{selectedGiftData.description}</p>
                  <p className="text-lg font-bold text-sport-primary mt-1">
                    €{selectedGiftData.price} per cadeau
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aantal
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold text-sport-dark w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600 ml-auto">
                    Totaal: <span className="font-bold text-sport-primary">€{totalPrice}</span>
                  </span>
                </div>
              </div>

              {/* Recipient Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Naam ontvanger
                  </label>
                  <Input
                    placeholder="Bijv. Jan de Vries"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email ontvanger
                  </label>
                  <Input
                    type="email"
                    placeholder="jan@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Persoonlijk bericht (optioneel)
                  </label>
                  <Textarea
                    placeholder="Schrijf een persoonlijke boodschap..."
                    rows={4}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dit bericht wordt toegevoegd aan de cadeaubon
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setGiftDialogOpen(false)}
                  className="flex-1"
                >
                  Annuleren
                </Button>
                <Button
                  onClick={handlePurchaseGift}
                  disabled={!recipientName || !recipientEmail}
                  className="flex-1 bg-gradient-to-r from-sport-primary to-sport-accent text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Koop cadeau - €{totalPrice}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}