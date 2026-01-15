import { motion } from 'motion/react';
import { Search, Calendar, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Ontdek sportlocaties',
    description: 'Bekijk alle beschikbare sportlocaties op één plek met real-time beschikbaarheidsgegevens.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Calendar,
    title: 'Boek direct',
    description: 'Selecteer jouw gewenste tijdslot en boek in seconden. Last-minute boekingen welkom!',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Users,
    title: 'Vind sportpartners',
    description: 'Doe mee met open sessies of creëer je eigen groep. Match met spelers op jouw niveau.',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: CheckCircle,
    title: 'Speel & geniet',
    description: 'Kom opdagen en speel! Alle boekingen worden direct bevestigd met betrouwbare gegevens.',
    color: 'from-green-500 to-emerald-500',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50">
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
            Hoe BuffelSport Werkt
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Van ontdekking tot spelen in slechts een paar klikken. Zo eenvoudig is het.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -z-10" />
              )}

              {/* Step Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group flex flex-col w-full h-full min-h-[320px]">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl text-gray-200 group-hover:text-gray-300 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${step.color}`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Flow (Mobile) */}
        <div className="lg:hidden flex justify-center mt-8">
          <div className="flex flex-col items-center gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="w-1 h-12 bg-gradient-to-b from-gray-300 to-transparent"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}