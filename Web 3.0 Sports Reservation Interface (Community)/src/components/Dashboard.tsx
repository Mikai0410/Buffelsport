import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, CreditCard, User, Clock, MapPin, Edit, Trash2, Heart, Camera, Users, UserPlus, Trophy, Crown, Shield, LogOut, UserCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';


const mockGroups = [
  {
    id: 1,
    name: 'Amsterdam Warriors',
    sport: 'Basketball',
    members: 8,
    wins: 12,
    losses: 3,
    isLeader: true,
    color: 'from-blue-500 to-blue-700',
    nextMatch: '2025-12-22 19:00',
    members_list: [
      { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=12', role: 'Leader' },
      { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=45', role: 'Member' },
      { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=33', role: 'Member' },
      { name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=23', role: 'Member' },
    ],
  },
  {
    id: 2,
    name: 'Futsal Legends',
    sport: 'Futsal',
    members: 10,
    wins: 8,
    losses: 5,
    isLeader: false,
    color: 'from-green-500 to-green-700',
    nextMatch: '2025-12-25 18:00',
    members_list: [
      { name: 'Lucas Silva', avatar: 'https://i.pravatar.cc/150?img=68', role: 'Leader' },
      { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=12', role: 'Member' },
      { name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=51', role: 'Member' },
      { name: 'Sofia Martinez', avatar: 'https://i.pravatar.cc/150?img=44', role: 'Member' },
    ],
  },
  {
    id: 3,
    name: 'Tennis Elite',
    sport: 'Tennis',
    members: 6,
    wins: 15,
    losses: 2,
    isLeader: false,
    color: 'from-purple-500 to-purple-700',
    nextMatch: '2025-12-28 14:00',
    members_list: [
      { name: 'Anna Schmidt', avatar: 'https://i.pravatar.cc/150?img=28', role: 'Leader' },
      { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=12', role: 'Member' },
      { name: 'Tom Brown', avatar: 'https://i.pravatar.cc/150?img=59', role: 'Member' },
    ],
  },
];

interface DashboardProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    profilePhoto?: string;
    favoriteSports?: string[];
  };
  bookings: {
    id: number;
    fieldName: string;
    sport: string;
    date: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Completed';
    price: number;
  }[];
  onEditProfile: () => void;
  onLogout: () => void;
  onDeleteBooking?: (id: number) => void;
}


export function Dashboard({ userData, onEditProfile, onLogout, bookings, onDeleteBooking }: DashboardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);

  const handleEditBooking = (id: number) => {
    alert(`Edit booking #${id} - Feature coming soon!`);
  };

  const handleDeleteClick = (id: number) => {
    setBookingToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (bookingToDelete !== null) {
      onDeleteBooking?.(bookingToDelete);
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    }
  };

  const totalSpent = bookings.reduce((sum, booking) => sum + booking.price, 0);

  return (
    <div className="min-h-screen bg-sport-background pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Profile Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6"
        >
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-sport-primary to-sport-accent shadow-lg">
              {userData.profilePhoto ? (
                <img
                  src={userData.profilePhoto}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all">
              <Camera className="w-4 h-4 text-sport-primary" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-sport-dark mb-2">Mijn Dashboard</h1>
            <p className="text-gray-600">Beheer je boekingen en profiel</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Mijn Reserveringen',
              value: bookings.length.toString(),
              icon: Calendar,
              color: 'sport-primary',
              gradient: 'from-[#3d5a80] to-[#293241]',
            },
            {
              title: 'Betaalstatus',
              value: `${totalSpent}`,
              icon: CreditCard,
              color: 'sport-accent',
              gradient: 'from-[#ee6c4d] to-[#3d5a80]',
            },
            {
              title: 'Profielinfo',
              value: 'Compleet',
              icon: User,
              color: 'sport-secondary',
              gradient: 'from-[#98c1d9] to-[#3d5a80]',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className={`h-2 bg-gradient-to-r ${stat.gradient}`} />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-sport-dark">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Booking History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-sport-primary" />
                Boekingsgeschiedenis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Veldnaam</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Tijd</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prijs</TableHead>
                      <TableHead>Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-sport-primary" />
                            <span className="font-medium">{booking.fieldName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-sport-secondary/20 text-sport-primary">
                            {booking.sport}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              booking.status === 'Confirmed'
                                ? 'bg-green-500 text-white'
                                : booking.status === 'Pending'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-500 text-white'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">€{booking.price}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-sport-primary/10"
                              onClick={() => handleEditBooking(booking.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 hover:text-red-500"
                              onClick={() => handleDeleteClick(booking.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-6 h-6 text-sport-primary" />
                Profielinformatie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Volledige naam</label>
                  <div className="text-sport-dark font-medium">{userData.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">E-mail</label>
                  <div className="text-sport-dark font-medium">{userData.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Telefoon</label>
                  <div className="text-sport-dark font-medium">{userData.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Lid sinds</label>
                  <div className="text-sport-dark font-medium">Januari 2025</div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6"
              >
                <Button 
                  className="gradient-accent text-white rounded-xl"
                  onClick={onEditProfile}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Profiel bewerken
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Favorite Sports Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-sport-primary" />
                Favoriete sporten
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userData.favoriteSports && userData.favoriteSports.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {userData.favoriteSports.map((sport, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-sport-primary to-sport-accent text-white rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      {sport}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Je hebt nog geen favoriete sporten geselecteerd</p>
                  <Button 
                    variant="outline"
                    onClick={onEditProfile}
                    className="hover:bg-sport-primary/10"
                  >
                    Voeg sporten toe
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* My Groups/Teams Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-sport-primary" />
                  Mijn groepen
                </CardTitle>
                <Button
                  className="bg-sport-primary text-white hover:bg-sport-primary/90"
                  size="sm"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nieuwe groep
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                      {/* Group Header with Gradient */}
                      <div className={`h-24 bg-gradient-to-r ${group.color} p-4 relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20">
                          <Shield className="w-32 h-32 absolute -right-8 -top-8 rotate-12" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-bold text-lg">{group.name}</h3>
                            {group.isLeader && (
                              <Crown className="w-5 h-5 text-yellow-300" />
                            )}
                          </div>
                          <Badge className="bg-white/20 text-white border-white/40">
                            {group.sport}
                          </Badge>
                        </div>
                      </div>

                      {/* Group Stats */}
                      <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{group.members} leden</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">{group.wins}W - {group.losses}L</span>
                          </div>
                        </div>

                        {/* Members Avatars */}
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Teamleden</p>
                          <div className="flex -space-x-2">
                            {group.members_list.slice(0, 4).map((member, idx) => (
                              <div
                                key={idx}
                                className="relative group/avatar"
                              >
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:z-10 transition-transform hover:scale-110"
                                />
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none z-20">
                                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                                    {member.name}
                                    {member.role === 'Leader' && (
                                      <Crown className="w-3 h-3 inline-block ml-1 text-yellow-300" />
                                    )}
                                  </div>
                                  <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </div>
                              </div>
                            ))}
                            {group.members > 4 && (
                              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center shadow-md">
                                <span className="text-xs text-gray-600">+{group.members - 4}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Next Match */}
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Volgende wedstrijd</span>
                            <span className="text-xs font-medium text-sport-primary">{group.nextMatch}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 hover:bg-sport-primary/10"
                          >
                            Details
                          </Button>
                          {group.isLeader ? (
                            <Button
                              size="sm"
                              className="flex-1 bg-sport-accent text-white hover:bg-sport-accent/90"
                            >
                              Beheren
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 hover:bg-red-50 hover:text-red-500"
                            >
                              Verlaten
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State if no groups */}
              {mockGroups.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen groepen</h3>
                  <p className="text-gray-500 mb-6">
                    Maak je eerste groep aan of word lid van een bestaande groep om tegen anderen te strijden
                  </p>
                  <Button className="bg-sport-primary text-white hover:bg-sport-primary/90">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Maak een groep
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Deze actie kan niet ongedaan worden gemaakt. Dit zal je boeking permanent verwijderen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}