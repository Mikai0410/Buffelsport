import { motion } from 'motion/react';
import { Calendar, Users, MapPin, Zap } from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1658491830143-72808ca237e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMGNvdXJ0JTIwaW5kb29yfGVufDF8fHx8MTc2NjE0NTM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm">Sport toegankelijk & spontaan maken</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
              Boek elke sport,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                altijd, overal
              </span>
            </h1>
          </motion.div>

          {/* Problem/Solution Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-xl text-gray-300">
              Moe van gefragmenteerde boekingssystemen en beperkte beschikbaarheid?
            </p>
            <p className="text-lg text-gray-400">
              BuffelSport brengt alle sportlocaties samen op één platform met real-time beschikbaarheid, 
              last-minute boekingen en de mogelijkheid om sportpartners te vinden. 
              Maak sport weer spontaan en sociaal.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8"
          >
            {[
              { icon: MapPin, label: 'Locaties', value: '500+' },
              { icon: Users, label: 'Actieve gebruikers', value: '50K+' },
              { icon: Calendar, label: 'Boekingen/maand', value: '100K+' },
              { icon: Zap, label: 'Gem. reactie', value: '<5min' },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto" />
                <div className="text-3xl text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              Gratis beginnen
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Hoe het werkt
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm">Scroll om te verkennen</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}