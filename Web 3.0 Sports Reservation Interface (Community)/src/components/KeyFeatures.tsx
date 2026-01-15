import { motion } from 'motion/react';
import { Clock, Zap, Users, TrendingUp, Shield, Bell } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-time beschikbaarheid',
    description: 'Zie live veldbeschikbaarheid bij alle locaties. Geen rondbellen of dubbele boekingen meer.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Last-minute boeken',
    description: 'Boek op dezelfde dag of zelfs hetzelfde uur. Perfect voor spontane sportsessies.',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Sportpartner matching',
    description: 'Vind spelers op jouw niveau. Doe mee met open sessies of creëer je eigen groep.',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Niveau indicatoren',
    description: 'Match met spelers van vergelijkbaar niveau. Van beginners tot profs, iedereen vindt zijn game.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Betrouwbare reserveringen',
    description: 'Alle boekingen worden direct bevestigd. Jouw veld is gegarandeerd wanneer je aankomt.',
    gradient: 'from-red-400 to-rose-500',
  },
  {
    icon: Bell,
    title: 'Slimme meldingen',
    description: 'Ontvang herinneringen over je boekingen en meldingen wanneer plekken vrijkomen bij je favoriete locaties.',
    gradient: 'from-indigo-400 to-blue-500',
  },
];

export function KeyFeatures() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-gray-900">
            Krachtige functies voor atleten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Alles wat je nodig hebt om sportboeking moeiteloos en plezierig te maken
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 transition-all hover:shadow-xl flex flex-col w-full">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Animated glow effect on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
                </div>

                {/* Content */}
                <h3 className="text-xl mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Klaar om de toekomst van sportboeking te ervaren?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
            Nu boeken
          </button>
        </motion.div>
      </div>
    </section>
  );
}