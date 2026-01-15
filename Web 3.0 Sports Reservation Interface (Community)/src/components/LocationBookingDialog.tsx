import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';
import { BookingCalendar } from './BookingCalendar';
import { PaymentDialog } from './PaymentDialog';
import { PaymentConfirmation } from './PaymentConfirmation';

type LocationLike = {
  id: string | number;
  name: string;
  sports: string[];
  priceRange?: string; // bv "€40-60"
  address?: string;
  city?: string;
};

interface LocationBookingDialogProps {
  location: LocationLike | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoToDashboard: () => void;
  onBookingConfirmed?: (b: {
    fieldName: string;
    sport: string;
    date: string;
    time: string;
    price: number;
  }) => void;
}

function parsePriceFromRange(priceRange?: string): number {
  if (!priceRange) return 50;

  // match €40-60 of 40-60
  const match = priceRange.match(/€?\s*(\d+)\s*-\s*(\d+)/);
  if (!match) return 50;

  const low = Number(match[1]);
  const high = Number(match[2]);
  if (!Number.isFinite(low) || !Number.isFinite(high)) return 50;

  return Math.round((low + high) / 2);
}

export function LocationBookingDialog({ location, open, onOpenChange, onGoToDashboard, onBookingConfirmed }: LocationBookingDialogProps) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [bookingDetails, setBookingDetails] = useState<{
    fieldName: string;
    sport: string;
    date: string;
    time: string;
    price: number;
  } | null>(null);

  const price = useMemo(() => parsePriceFromRange(location?.priceRange), [location?.priceRange]);

  if (!location) return null;

  const handleConfirmBooking = (date: Date, time: string) => {
    setBookingDetails({
      fieldName: location.name,
      sport: location.sports?.[0] ?? 'Sport',
      date: date.toLocaleDateString('nl-NL'),
      time,
      price,
    });
    onOpenChange(false);      // kalender dialog dicht
    setConfirmationOpen(true); // confirm dialog open
  };

  const handleProceedToPayment = () => {
    setConfirmationOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentComplete = () => {
    if (bookingDetails) {
      onBookingConfirmed?.(bookingDetails);
    }
    setPaymentOpen(false);
    setBookingDetails(null);
    onGoToDashboard();
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setBookingDetails(null);
  };

  return (
    <>
      {/* Booking Calendar */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogDescription className="sr-only">
            Selecteer een datum en tijd om te boeken
          </DialogDescription>

          <BookingCalendar fieldName={location.name} onConfirm={handleConfirmBooking} />
        </DialogContent>
      </Dialog>

      {/* Confirmation */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogDescription className="sr-only">
            Bekijk je boekingsdetails en ga door naar betaling
          </DialogDescription>

          {bookingDetails && (
            <PaymentConfirmation
              bookingDetails={bookingDetails}
              onClose={handleCloseConfirmation}
              onProceedToPayment={handleProceedToPayment}
              onGoToDashboard={() => {
                setConfirmationOpen(false);
                setPaymentOpen(false);
                setBookingDetails(null);
                onGoToDashboard();
              }}
            />

          )}
        </DialogContent>
      </Dialog>

      {/* Payment */}
      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        amount={bookingDetails?.price ?? price}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
}
