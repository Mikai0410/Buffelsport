import { motion } from 'motion/react';
import { Zap, Shield, Clock, TrendingUp, Database, UserCheck, MapPin, Target, Lock } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Zap,
    title: 'Snel boeken',
    description:
      'Reserveer je favoriete sportveld in enkele seconden met ons gestroomlijnde reserveringsproces.',
    gradient: 'from-[#3d5a80] to-[#98c1d9]',
  },
  {
    icon: Clock,
    title: 'Real-time beschikbaarheid',
    description:
      'Controleer de live beschikbaarheid van velden en kies het perfecte tijdslot dat past bij jouw agenda.',
    gradient: 'from-[#98c1d9] to-[#ee6c4d]',
  },
  {
    icon: Shield,
    title: 'Veilige betaling',
    description:
      'Meerdere betaalmogelijkheden met beveiliging op bankniveau om veilige transacties te garanderen.',
    gradient: 'from-[#ee6c4d] to-[#293241]',
  },
  {
    icon: TrendingUp,
    title: 'Makkelijk beheer',
    description:
      'Beheer al je reserveringen, houd je geschiedenis bij en plan eenvoudig opnieuw vanuit je dashboard.',
    gradient: 'from-[#293241] to-[#3d5a80]',
  },
];

export function About() {
  return (
    <div className="min-h-screen bg-sport-background pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-sport-dark">
            Over <span className="text-sport-accent">BuffelSport</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           De manier waarop je sportfaciliteiten boekt en beheert wordt vernieuwd met geavanceerde technologie en een naadloze gebruikerservaring.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gradient-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Onze missie</h2>
          <p className="text-lg text-sport-secondary/90 leading-relaxed">
            BuffelSport zet zich in om sport toegankelijker te maken door een gecentraliseerd digitaal platform aan te bieden dat sporters en teams verbindt met de beste sportfaciliteiten. Wij geloven dat het vinden en reserveren van een sportveld net zo eenvoudig moet zijn als het online bestellen van eten.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-sport-dark text-center mb-12"
          >
            Waarom kiezen voor BuffelSport?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full p-6 shadow-lg hover:shadow-xl transition-all">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-sport-dark mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-sport-dark text-center mb-12">
            BuffelSport in getallen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Sport Faciliteiten' },
              { number: '50,000+', label: 'Actieve Geruikers' },
              { number: '100,000+', label: 'Maandelijkse boekingen' },
              { number: '98%', label: 'Klant tevredenheid' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-sport-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
        </motion.div>

        {/* Data Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-sport-primary to-sport-accent text-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-6">Jouw data, jouw controle</h2>
            <p className="text-center text-sport-secondary/90 mb-10 text-lg">
              Bij BuffelSport nemen we jouw privacy serieus. Hieronder zie je welke gegevens we verzamelen en waarom dit nodig is voor de beste sportervaring.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: UserCheck,
                  title: 'Gebruikersprofiel',
                  description: 'Naam, leeftijd en profielfoto om de gebruiker persoonlijk te herkennen en de app te personaliseren.',
                  color: 'from-blue-400 to-blue-600',
                },
                {
                  icon: Database,
                  title: 'Contactgegevens',
                  description: 'E-mailadres en telefoonnummer om in te loggen, notificaties te sturen en het account te beveiligen.',
                  color: 'from-green-400 to-green-600',
                },
                {
                  icon: MapPin,
                  title: 'Locatie',
                  description: 'Stad van de gebruiker om lokale trainingen, teams en sportactiviteiten te tonen.',
                  color: 'from-purple-400 to-purple-600',
                },
                {
                  icon: Target,
                  title: 'Sportvoorkeuren',
                  description: 'Gekozen sport, niveau en doelen om trainingen, schema\'s en aanbevelingen op maat te maken.',
                  color: 'from-orange-400 to-orange-600',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sport-secondary/90 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}

              {/* Privacy & Compliance - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border-2 border-white/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Privacy, toestemming en compliance</h3>
                    <p className="text-sport-secondary/90 leading-relaxed">
                      Instellingen waarin de gebruiker bepaalt welke data gedeeld wordt om privacy, veiligheid en wettelijke naleving te waarborgen. Je hebt altijd volledige controle over jouw gegevens.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="mt-8 text-center text-sm text-sport-secondary/80"
            >
              <p>
                Al jouw gegevens worden veilig opgeslagen en nooit zonder jouw toestemming gedeeld met derden.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}