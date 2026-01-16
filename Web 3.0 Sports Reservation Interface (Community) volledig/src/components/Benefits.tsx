import { motion } from "motion/react";
import {
  Users,
  Building2,
  TrendingUp,
  Heart,
  BarChart3,
  Sparkles,
} from "lucide-react";

const userBenefits = [
  {
    icon: Sparkles,
    title: "Spontaan sporten",
    description:
      "Boek last-minute zonder meerdere locaties te bellen. Perfect voor na-werk spelletjes.",
  },
  {
    icon: Users,
    title: "Vind sportmaatjes",
    description:
      "Speel nooit alleen. Match met spelers die jouw niveau en schema delen.",
  },
  {
    icon: Heart,
    title: "Blijf actief",
    description:
      "Makkelijk boeken betekent meer spelen. Zet je intenties om in actie.",
  },
];

const venueBenefits = [
  {
    icon: TrendingUp,
    title: "Betere bezetting",
    description:
      "Vul lege slots met last-minute boekingen. Maximaliseer veldgebruik.",
  },
  {
    icon: BarChart3,
    title: "Data inzichten",
    description:
      "Begrijp piekuren, populaire sporten en klantvoorkeuren met analytics.",
  },
  {
    icon: Building2,
    title: "Groei je bedrijf",
    description:
      "Bereik meer klanten via ons platform. Focus op operaties, wij brengen de boekingen.",
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl lg:text-5xl text-gray-900">
            Voordelen voor iedereen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Een win-win platform dat zowel atleten als
            sportlocaties versterkt
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* For Athletes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-8">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-900">
                    Voor atleten
                  </span>
                </div>
                <h3 className="text-3xl text-gray-900 mb-4">
                  Maak sport een deel van je leven
                </h3>
                <p className="text-gray-600 text-lg">
                  Verwijder de wrijving van boeken en focus op
                  wat belangrijk is - spelen.
                </p>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src="https://images.unsplash.com/photo-1715313055891-af120687e23b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBwbGF5aW5nJTIwc3BvcnRzfGVufDF8fHx8MTc2NTc5OTQzNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="People playing sports"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                {userBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-blue-100">
                        <benefit.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* For Venues */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-8">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 mb-4">
                  <Building2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-900">
                    Voor locaties
                  </span>
                </div>
                <h3 className="text-3xl text-gray-900 mb-4">
                  Optimaliseer je operaties
                </h3>
                <p className="text-gray-600 text-lg">
                  Verhoog omzet en stroomlijn beheer met
                  data-gedreven inzichten.
                </p>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src="https://images.unsplash.com/photo-1605144156743-b009789673f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBhZXJpYWx8ZW58MXx8fHwxNzY1Nzg5NTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Basketball court aerial view"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                {venueBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-green-100">
                        <benefit.icon className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}