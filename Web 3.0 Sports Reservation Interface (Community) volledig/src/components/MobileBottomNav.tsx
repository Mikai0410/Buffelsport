import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Calendar, MapPin, User, LogIn, Users } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export function MobileBottomNav({ 
  currentPage, 
  onNavigate, 
  isLoggedIn,
  onLoginClick 
}: MobileBottomNavProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number; id: string } | null>(null);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'fields',
      label: 'Faciliteiten',
      icon: MapPin,
    },
    {
      id: 'partners',
      label: 'Partners',
      icon: Users,
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
    },
  ];

  const handleNavClick = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRipple({ x, y, id });
    
    setTimeout(() => setRipple(null), 600);

    if (id === 'account') {
      // If logged in, go to dashboard, otherwise show login
      if (isLoggedIn) {
        onNavigate('dashboard');
      } else {
        onLoginClick();
      }
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
        {/* Main navigation container with glassmorphism effect */}
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || (item.id === 'account' && currentPage === 'dashboard');
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`flex flex-col items-center justify-center gap-1 relative py-3 transition-colors overflow-hidden ${
                    isActive ? 'text-sport-primary' : 'text-gray-500'
                  }`}
                  whileTap={{ scale: 0.9 }}
                  aria-label={item.label}
                >
                  {/* Ripple effect */}
                  <AnimatePresence>
                    {ripple && ripple.id === item.id && (
                      <motion.span
                        className="absolute rounded-full bg-sport-primary/20"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: 0,
                          height: 0,
                        }}
                        initial={{ width: 0, height: 0, opacity: 0.5 }}
                        animate={{ 
                          width: 100, 
                          height: 100, 
                          opacity: 0,
                          x: -50,
                          y: -50,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active indicator - top bar */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-accent rounded-b-full shadow-lg shadow-sport-accent/50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon container with background */}
                  <motion.div 
                    className={`relative flex items-center justify-center rounded-xl transition-all ${
                      isActive ? 'bg-sport-primary/10 px-4 py-1' : 'px-4 py-1'
                    }`}
                    animate={isActive ? { 
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      className={`w-6 h-6 transition-all ${
                        isActive ? 'drop-shadow-md' : ''
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {/* Notification badge with pulse */}
                    {item.id === 'booking' && isLoggedIn && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-sport-accent rounded-full border-2 border-white"
                      >
                        <motion.span
                          className="absolute inset-0 rounded-full bg-sport-accent"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.span>
                    )}
                  </motion.div>
                  
                  {/* Label */}
                  <motion.span 
                    className={`text-[10px] transition-all ${
                      isActive ? 'font-semibold' : 'font-normal'
                    }`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}