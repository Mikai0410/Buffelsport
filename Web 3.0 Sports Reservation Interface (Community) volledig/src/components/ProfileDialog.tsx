import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Save, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    name: string;
    email: string;
    phone: string;
    phoneApproval?: boolean;
  };
  onSave: (data: { name: string; email: string; phone: string; phoneApproval?: boolean }) => void;
}

export function ProfileDialog({ open, onOpenChange, userData, onSave }: ProfileDialogProps) {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [phoneApproval, setPhoneApproval] = useState(userData.phoneApproval || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, phone, phoneApproval });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            Profiel Bewerken
          </DialogTitle>
          <DialogDescription>
            Breng hier wijzigingen aan in je profiel. Klik op opslaan wanneer je klaar bent.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Volledige Naam</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefoonnummer</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-3 p-4 bg-sport-secondary/10 rounded-lg border-2 border-sport-secondary/30">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <Label htmlFor="phone-approval" className="flex items-center gap-2 cursor-pointer">
                  <CheckCircle className="w-5 h-5 text-sport-primary" />
                  Goedkeuring telefoon
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  activeer dit om mee te doen aan open teams en sportpartners te vinden
                </p>
              </div>
              <Switch
                id="phone-approval"
                checked={phoneApproval}
                onCheckedChange={setPhoneApproval}
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full gradient-accent text-white py-6 rounded-xl hover:shadow-lg hover:shadow-sport-accent/50 transition-all"
            >
              <Save className="w-5 h-5 mr-2" />
              Wijzigingen Opslaan
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}