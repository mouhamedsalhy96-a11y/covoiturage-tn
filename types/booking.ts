
export type Booking = {
  id: string;
  tripId: string;
  passengerName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seatsBooked: number;
  totalPrice: number;
  status: "Confirmed" | "Pending" | "Cancelled";
};
