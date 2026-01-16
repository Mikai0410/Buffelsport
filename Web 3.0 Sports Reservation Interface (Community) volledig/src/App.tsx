import { useState } from 'react';
import { Toaster, toast } from 'sonner@2.0.3';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LandingHero } from './components/LandingHero';
import { TransitionSection } from './components/TransitionSection';
import { HowItWorks } from './components/HowItWorks';
import { KeyFeatures } from './components/KeyFeatures';
import { Benefits } from './components/Benefits';
import { DashboardPreview } from './components/DashboardPreview';
import { FinalCTA } from './components/FinalCTA';
import { Locations } from './components/Locations';
import { GiftPage } from './components/GiftPage';
import { Partners } from './components/Partners';
import { SearchFilter } from './components/SearchFilter';
import { FieldCard } from './components/FieldCard';
import { BookingCalendar } from './components/BookingCalendar';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { PaymentConfirmation } from './components/PaymentConfirmation';
import { LoginDialog } from './components/LoginDialog';
import { RegisterDialog } from './components/RegisterDialog';
import { ProfileDialog } from './components/ProfileDialog';
import { PaymentDialog } from './components/PaymentDialog';
import { About } from './components/About';
import { Dialog, DialogContent, DialogDescription } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { LogIn } from 'lucide-react';

const sportsFields = [
  {
    id: 1,
    name: 'Downtown Futsal Arena',
    sportType: 'Futsal',
    image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBpbmRvb3IlMjBjb3VydHxlbnwxfHx8fDE3NjAwMDk4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Downtown District',
    price: 45,
    available: true,
  },
  {
    id: 2,
    name: 'Central Basketball Court',
    sportType: 'Basketball',
    image: 'https://images.unsplash.com/photo-1605144156743-b009789673f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBhZXJpYWx8ZW58MXx8fHwxNzYwMDExOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'North District',
    price: 35,
    available: true,
  },
  {
    id: 3,
    name: 'Elite Badminton Hall',
    sportType: 'Badminton',
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NTk5OTUyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'East District',
    price: 30,
    available: false,
  },
  {
    id: 4,
    name: 'Premium Tennis Club',
    sportType: 'Tennis',
    image: 'https://images.unsplash.com/photo-1566241121793-3e25f3586e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3J8ZW58MXx8fHwxNzYwMDY2NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'South District',
    price: 50,
    available: true,
  },
  {
    id: 5,
    name: 'Beachside Volleyball Court',
    sportType: 'Volleyball',
    image: 'https://images.unsplash.com/photo-1757661198723-dc48987ffbff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnQlMjBiZWFjaHxlbnwxfHx8fDE3NjAwMzQ0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'West District',
    price: 40,
    available: true,
  },
  {
    id: 6,
    name: 'Indoor Futsal Complex',
    sportType: 'Futsal',
    image: 'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBpbmRvb3IlMjBjb3VydHxlbnwxfHx8fDE3NjAwMDk4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'North District',
    price: 42,
    available: true,
  },
];

export default function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState('home');
  
  // Booking state
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    profilePhoto: 'https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdGhsZXRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDg0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    favoriteSports: ['Basketball', 'Futsal', 'Tennis', 'Padel'],
    phoneApproval: false,
  });
  

  
    type Booking = {
    id: number;
    fieldName: string;
    sport: string;
    date: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Completed';
    price: number;
  };

  const initialBookings: Booking[] = [
    {
      id: 1,
      fieldName: 'Downtown Futsal Arena',
      sport: 'Futsal',
      date: '2025-10-15',
      time: '18:00 - 20:00',
      status: 'Confirmed',
      price: 45,
    },
    {
      id: 2,
      fieldName: 'Central Basketball Court',
      sport: 'Basketball',
      date: '2025-10-18',
      time: '14:00 - 16:00',
      status: 'Pending',
      price: 35,
    },
    {
      id: 3,
      fieldName: 'Elite Tennis Club',
      sport: 'Tennis',
      date: '2025-10-12',
      time: '10:00 - 12:00',
      status: 'Completed',
      price: 50,
    },
  ];

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const addBooking = (b: {
    fieldName: string;
    sport: string;
    date: string;
    time: string;
    price: number;
  }) => {
    setBookings((prev) => [
      {
        id: Date.now(),
        fieldName: b.fieldName,
        sport: b.sport,
        date: b.date,
        time: b.time,
        status: 'Confirmed',
        price: b.price,
      },
      ...prev,
    ]);
  };

  // Profile and Payment state
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserve = (fieldId: number) => {
    if (!isLoggedIn) {
      toast.error('Log in om een reservering te maken', {
        duration: 3000,
      });
      setLoginDialogOpen(true);
      return;
    }
    setSelectedField(fieldId);
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = (date: Date, time: string) => {
    const field = sportsFields.find((f) => f.id === selectedField);
    if (field) {
      setBookingDetails({
        fieldName: field.name,
        sport: field.sportType,
        date: date.toLocaleDateString(),
        time: time,
        price: field.price,
      });
      setBookingDialogOpen(false);
      setConfirmationDialogOpen(true);
    }
  };

  const handleSearch = () => {
    toast.info('Zoeken naar beschikbare faciliteiten...', {
      duration: 2000,
    });
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    setIsLoggedIn(true);
    setUserData({
      name: 'John Doe',
      email: email,
      phone: '+1 234 567 8900',
      profilePhoto: 'https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdGhsZXRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDg0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      favoriteSports: ['Basketball', 'Futsal', 'Tennis', 'Padel'],
      phoneApproval: false,
    });
    setLoginDialogOpen(false);
    toast.success('Inloggen succesvol! Welkom terug.', {
      duration: 3000,
    });
  };

  const handleRegister = (data: { name: string; email: string; phone: string; password: string }) => {
    // Mock registration - in a real app, this would call an API
    setIsLoggedIn(true);
    setUserData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      profilePhoto: 'https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdGhsZXRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDg0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      favoriteSports: [],
      phoneApproval: false,
    });
    setRegisterDialogOpen(false);
    toast.success('Registratie succesvol! Welkom bij BuffelSport.', {
      duration: 3000,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      profilePhoto: 'https://images.unsplash.com/photo-1663576748377-cafb47103042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdGhsZXRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDg0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      favoriteSports: ['Basketball', 'Futsal', 'Tennis', 'Padel'],
      phoneApproval: false,
    });
    setCurrentPage('home');
    toast.info('Succesvol uitgelogd', {
      duration: 2000,
    });
  };

  const handleProfileSave = (data: { name: string; email: string; phone: string; phoneApproval?: boolean }) => {
    setUserData({
      ...userData,
      ...data,
    });
    setProfileDialogOpen(false);
    toast.success('Profiel succesvol bijgewerkt!', {
      duration: 3000,
    });
  };

  const handleProceedToPayment = () => {
    setConfirmationDialogOpen(false);
    setPaymentDialogOpen(true);
  };

  const handlePaymentComplete = () => {
    setPaymentDialogOpen(false);
    toast.success('Betaling succesvol! Je boeking is bevestigd.', {
      duration: 3000,
    });
    handleNavigate('dashboard');
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      handleNavigate('fields');
    } else {
      setRegisterDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster position="bottom-right" richColors className="md:bottom-4 bottom-20" />
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        userName={userData.name.split(' ')[0]}
        onLoginClick={() => setLoginDialogOpen(true)}
        onRegisterClick={() => setRegisterDialogOpen(true)}
        onLogout={handleLogout}
        onProfileClick={() => setProfileDialogOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setLoginDialogOpen(true)}
      />

      {/* Home Page */}
      {currentPage === 'home' && (
        <>
          <LandingHero onGetStarted={handleGetStarted} />
          <TransitionSection />
          <HowItWorks />
          <KeyFeatures />
          <Benefits />
          <DashboardPreview bookings={bookings} />
          
          {/* Featured Fields Section */}
          <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl text-gray-900 mb-4">
                  Uitgelichte Sportfaciliteiten
                </h2>
                <p className="text-xl text-gray-600">
                  Bekijk onze collectie van premium sportfaciliteiten
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sportsFields.slice(0, 6).map((field) => (
                  <FieldCard
                    key={field.id}
                    {...field}
                    onReserve={handleReserve}
                  />
                ))}
              </div>
            </div>
          </div>

          <FinalCTA onGetStarted={handleGetStarted} />
        </>
      )}

      {/* Fields Page - Combined with Locations */}
      {currentPage === 'fields' && (
        <div className="min-h-screen bg-sport-background pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-sport-dark mb-4">Alle sportfaciliteiten</h1>
              <p className="text-gray-600">Vind de perfecte faciliteit voor jouw game</p>
            </div>

            {/* Locations functionality integrated */}
            <Locations
              onBookNow={() => handleNavigate('booking')}
              onGoToDashboard={() => handleNavigate('dashboard')}
              onBookingConfirmed={addBooking}
            />


            {/* <SearchFilter onSearch={handleSearch} /> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sportsFields.map((field) => (
                <FieldCard key={field.id} {...field} onReserve={handleReserve} />
              ))}
            </div> */}
          </div>
        </div>
      )}

      {/* Gifts Page */}
      {currentPage === 'gifts' && <GiftPage />}

      {/* Partners Page */}
      {currentPage === 'partners' && <Partners />}

      {/* Booking Page */}
      {currentPage === 'booking' && (
        <div className="min-h-screen bg-sport-background pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <SearchFilter onSearch={handleSearch} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sportsFields.map((field) => (
                <FieldCard key={field.id} {...field} onReserve={handleReserve} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Page */}
      {currentPage === 'dashboard' && (
        <>
          {isLoggedIn ? (
            <Dashboard 
              userData={userData}
              bookings={bookings}
              onEditProfile={() => setProfileDialogOpen(true)}
              onLogout={handleLogout}
            />
          ) : (
            <div className="min-h-screen bg-sport-background pt-32 pb-24 px-4 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-sport-dark mb-4">Log in alstublieft</h2>
                <p className="text-gray-600 mb-8">Je moet inloggen om toegang te krijgen tot je dashboard</p>
                <Button
                  variant="ghost"
                  className="gradient-accent text-white hover:text-sport-accent px-8 py-6 text-lg"
                  onClick={() => setLoginDialogOpen(true)}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Inloggen
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* About Page */}
      {currentPage === 'about' && (
        <About />
      )}

      {/* Footer */}
      <Footer />

      {/* Login Dialog */}
      <LoginDialog
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setLoginDialogOpen(false);
          setRegisterDialogOpen(true);
        }}
      />

      {/* Register Dialog */}
      <RegisterDialog
        open={registerDialogOpen}
        onOpenChange={setRegisterDialogOpen}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setRegisterDialogOpen(false);
          setLoginDialogOpen(true);
        }}
      />

      {/* Profile Dialog */}
      <ProfileDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        userData={userData}
        onSave={handleProfileSave}
      />

      {/* Booking Calendar Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="w-[92vw] max-w-5xl max-h-[85vh] p-0 overflow-hidden">
          <div className="p-8 md:p-12 overflow-y-auto max-h-[92vh]">
          <DialogDescription className="sr-only">
            Selecteer een datum en tijd om je sportveld te boeken
          </DialogDescription>
          {selectedField && (
            <BookingCalendar
              fieldName={
                sportsFields.find((f) => f.id === selectedField)?.name || ''
              }
              onConfirm={handleConfirmBooking}
            />
          )}          
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogDescription className="sr-only">
            Bekijk je boekingsdetails en ga door naar betaling
          </DialogDescription>
          {bookingDetails && (
            <PaymentConfirmation
              bookingDetails={bookingDetails}
              onClose={() => setConfirmationDialogOpen(false)}
              onProceedToPayment={handleProceedToPayment}
              onGoToDashboard={() => handleNavigate('dashboard')}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        amount={bookingDetails?.price || 0}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}