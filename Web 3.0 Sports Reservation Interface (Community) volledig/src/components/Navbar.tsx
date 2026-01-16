import { useState } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  Calendar,
  LogIn,
  User as UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userName: string;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  isLoggedIn,
  userName,
  onLoginClick,
  onRegisterClick,
  onLogout,
  onProfileClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Faciliteiten", id: "fields" },
    { name: "Sportpartners", id: "partners" },
    { name: "Cadeaus", id: "gifts" },
    { name: "Over ons", id: "about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-sport-dark border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-['Poppins']">
              Buffel
              <span className="text-sport-accent">Sport</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative px-1 py-2 transition-colors ${
                  currentPage === link.id
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
                {currentPage === link.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sport-accent"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
            {/* Dashboard link - only show when logged in */}
            {isLoggedIn && (
              <motion.button
                onClick={() => onNavigate('dashboard')}
                className={`relative px-1 py-2 transition-colors ${
                  currentPage === 'dashboard'
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
              >
                Dashboard
                {currentPage === 'dashboard' && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sport-accent"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="gradient-accent text-white hover:text-sport-accent"
                  onClick={onLoginClick}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Inloggen
                </Button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="gradient-accent text-white hover:shadow-lg hover:shadow-sport-accent/50 transition-all"
                    onClick={onRegisterClick}
                  >
                    Registreren
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <div className="text-white font-medium">
                  Welkom, {userName}
                </div>
                <Button
                  variant="ghost"
                  className="text-white hover:text-sport-accent"
                  onClick={onProfileClick}
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  Profiel
                </Button>
                <Button
                  variant="outline"
                  onClick={onLogout}
                  className="hover:bg-red-50 hover:text-red-500 hover:border-red-500"
                >
                  Uitloggen
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-sport-dark border-t border-white/20"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === link.id
                    ? "bg-sport-primary text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </button>
            ))}
            {/* Dashboard link in mobile menu - only show when logged in */}
            {isLoggedIn && (
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'dashboard'
                    ? "bg-sport-primary text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Dashboard
              </button>
            )}
            <div className="pt-4 space-y-2">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      onLoginClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Inloggen
                  </Button>
                  <Button
                    className="w-full gradient-accent text-white"
                    onClick={() => {
                      onRegisterClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Registreren
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center py-2 font-medium text-white">
                    Welkom, {userName}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      onProfileClick();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profiel
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-red-50 hover:text-red-500 hover:border-red-500"
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Uitloggen
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}