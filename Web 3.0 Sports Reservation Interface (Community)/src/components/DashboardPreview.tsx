import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, TrendingUp, Activity } from 'lucide-react';

export function DashboardPreview({ bookings }: { bookings: Array<any> }) {
  const upcomingBookings = bookings.slice(0, 2).map((b: any) => ({
    id: b.id,
    sport: b.sport,
    venue: b.fieldName,
    date: b.date,
    time: b.time,
    players: 0,
    maxPlayers: 0,
    status: b.status?.toLowerCase?.() ?? 'confirmed',
  }));


  const availableSlots = [
    { venue: 'Downtown Futsal Arena', time: '8:00 PM', distance: '0.8 km', price: 45 },
    { venue: 'Premium Tennis Club', time: '7:30 PM', distance: '1.2 km', price: 50 },
    { venue: 'Beachside Volleyball', time: '9:00 PM', distance: '2.1 km', price: 40 },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
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
            Jouw sport commandocentrum
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beheer boekingen, ontdek mogelijkheden en volg je sportactiviteit allemaal op één plek
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <div className="relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 rounded-3xl transform rotate-1" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-100 to-teal-50 rounded-3xl transform -rotate-1" />

          {/* Main Dashboard Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12"
          >
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl text-gray-900 mb-2">
                  Welkom terug, Alex! 👋
                </h3>
                <p className="text-gray-600">Hier is je sportschema voor vandaag</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <div className="text-center px-6 py-3 bg-blue-50 rounded-xl">
                  <div className="text-2xl text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Gespeeld</div>
                </div>
                <div className="text-center px-6 py-3 bg-green-50 rounded-xl">
                  <div className="text-2xl text-green-600">3</div>
                  <div className="text-sm text-gray-600">Aankomend</div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upcoming Bookings */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Aankomende boekingen
                  </h4>
                </div>

                <div className="space-y-4">
                  {upcomingBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {booking.sport}
                            </span>
                            {booking.status === 'confirmed' && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                Bevestigd
                              </span>
                            )}
                            {booking.status === 'open' && (
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                Nog 2 spelers nodig
                              </span>
                            )}
                          </div>
                          
                          <div className="text-lg text-gray-900">
                            {booking.venue}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {booking.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {booking.players}/{booking.maxPlayers} spelers
                            </div>
                          </div>
                        </div>

                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Bekijk details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Available Now & Stats */}
              <div className="space-y-6">
                {/* Available Now */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white"
                >
                  <h4 className="text-lg mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Nu beschikbaar
                  </h4>
                  
                  <div className="space-y-3">
                    {availableSlots.map((slot, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-sm opacity-90 mb-1">{slot.venue}</div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {slot.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {slot.distance}
                          </span>
                        </div>
                        <div className="text-sm mt-2">€{slot.price}/uur</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Activity Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6"
                >
                  <h4 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Jouw statistieken
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Deze maand</span>
                        <span>8 games</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-4/5" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Actieve uren</span>
                        <span>24 uur</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 w-3/5" />
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">Favoriete sport</div>
                      <div className="text-lg text-gray-900">🏀 Basketball</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}