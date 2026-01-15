import { motion } from 'motion/react';
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Velden', href: '#' },
    { name: 'Boeken', href: '#' },
    { name: 'Over', href: '#' },
  ];

  const legalLinks = [
    { name: 'Privacybeleid', href: '#' },
    { name: 'Servicevoorwaarden', href: '#' },
    { name: 'Cookiebeleid', href: '#' },
  ];

  return (
    <footer className="bg-sport-dark text-white mb-16 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                Buffel<span className="text-sport-accent">Sport</span>
              </span>
            </div>
            <p className="text-sport-secondary/80 mb-6">
              Jouw vertrouwde platform voor het boeken van sportfaciliteiten met gemak en gemak.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-sport-accent flex items-center justify-center transition-all hover:shadow-lg hover:shadow-sport-accent/50"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Snelle links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-sport-secondary/80 hover:text-sport-accent transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacteer ons</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sport-secondary/80">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Sportlaan 123, Atletiekwijk, Stad 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sport-secondary/80">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sport-secondary/80">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>support@buffelsport.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Blijf op de hoogte</h3>
            <p className="text-sport-secondary/80 mb-4">
              Abonneer je op onze nieuwsbrief voor de laatste updates en aanbiedingen.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Vul je e-mail in"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-sport-accent text-white placeholder:text-sport-secondary/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-sport-accent rounded-lg hover:shadow-lg hover:shadow-sport-accent/50 transition-all"
              >
                Abonneren
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sport-secondary/60 text-sm">
              © 2025 BuffelSport. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sport-secondary/60 hover:text-sport-accent text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}