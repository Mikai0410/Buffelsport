import { motion } from 'motion/react';
import { Zap, Shield, Clock, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Zap,
    title: 'Fast Booking',
    description:
      'Book your favorite sports field in seconds with our streamlined reservation process.',
    gradient: 'from-[#3d5a80] to-[#98c1d9]',
  },
  {
    icon: Clock,
    title: 'Real-Time Availability',
    description:
      'Check live field availability and pick the perfect time slot that fits your schedule.',
    gradient: 'from-[#98c1d9] to-[#ee6c4d]',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description:
      'Multiple payment options with bank-level security to ensure safe transactions.',
    gradient: 'from-[#ee6c4d] to-[#293241]',
  },
  {
    icon: TrendingUp,
    title: 'Easy Management',
    description:
      'Manage all your bookings, track history, and reschedule with ease from your dashboard.',
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
            About <span className="text-sport-accent">BuffelSport</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing the way you book and manage sports facilities with cutting-edge
            technology and seamless user experience.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gradient-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-sport-secondary/90 leading-relaxed">
            BuffelSport is dedicated to making sports more accessible by providing a centralized,
            digital platform that connects athletes and teams with the best sports facilities. We
            believe that finding and booking a sports field should be as easy as ordering food
            online. Our SQL-based backend ensures real-time updates, reliable data management, and
            seamless booking experiences for thousands of users every day.
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
            Why Choose BuffelSport?
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
            BuffelSport by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Sports Facilities' },
              { number: '10,000+', label: 'Active Users' },
              { number: '25,000+', label: 'Bookings Completed' },
              { number: '98%', label: 'Customer Satisfaction' },
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
          <h2 className="text-3xl font-bold text-sport-dark mb-6">Powered by Modern Technology</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Built on a robust SQL database backend with real-time synchronization, ensuring your
            bookings are always up-to-date and secure. Our Web 3.0 interface combines beautiful
            design with powerful functionality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'SQL Database', 'Real-time Sync', 'Secure Payments', 'Cloud Hosting'].map(
              (tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-sport-primary/10 rounded-full text-sport-primary font-medium"
                >
                  {tech}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}