import { motion } from 'motion/react';
import { ArrowRight, Smartphone, Zap } from 'lucide-react';

interface FinalCTAProps {
  onGetStarted: () => void;
}

export function FinalCTA({ onGetStarted }: FinalCTAProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500">
        {/* Animated circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Zap className="w-5 h-5 text-white" />
                <span className="text-white">Begin in minuten</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl text-white">
                Klaar om je sportleven te transformeren?
              </h2>
              
              <p className="text-xl text-white/90">
                Sluit je aan bij duizenden atleten die sport spontaan, sociaal en simpel hebben gemaakt met BuffelSport.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {[
                'Boek elke sport in seconden',
                'Vind spelers op jouw niveau',
                'Mis nooit een last-minute kans',
                'Volg je sportactiviteit',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Gratis aanmelden</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl border border-white/30 hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span>Download app</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-8 pt-8 items-center">
              <div className="text-white/80">
                <div className="text-2xl">50K+</div>
                <div className="text-sm">Actieve gebruikers</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl">500+</div>
                <div className="text-sm">Locaties</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl">4.9★</div>
                <div className="text-sm">App beoordeling</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            {/* Mock phone/device showcase */}
            <div className="relative">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-white rounded-3xl blur-3xl opacity-30" />
              
              {/* Main showcase card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  {/* Mock app interface elements */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
                      <div>
                        <div className="h-4 w-24 bg-white/80 rounded mb-2" />
                        <div className="h-3 w-32 bg-white/60 rounded" />
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/80" />
                  </div>

                  {/* Mock booking cards */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white rounded-xl p-4 shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="h-3 w-24 bg-gray-300 rounded" />
                          <div className="h-3 w-16 bg-green-300 rounded-full" />
                        </div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                        <div className="h-3 w-3/4 bg-gray-200 rounded" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Mock action button */}
                  <div className="h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}