
import { Booking } from "@/types/booking";

export const bookings: Booking[] = [
  {
    id: "b1",
    tripId: "1",
    passengerName: "Mohamed",
    from: "Manchester",
    to: "Liverpool",
    date: "2026-04-20",
    time: "09:00",
    seatsBooked: 1,
    totalPrice: 15,
    status: "Confirmed",
  },
  {
    id: "b2",
    tripId: "2",
    passengerName: "Mohamed",
    from: "London",
    to: "Birmingham",
    date: "2026-04-21",
    time: "14:30",
    seatsBooked: 2,
    totalPrice: 40,
    status: "Pending",
  },
  {
    id: "b3",
    tripId: "3",
    passengerName: "Mohamed",
    from: "Leeds",
    to: "Sheffield",
    date: "2026-04-22",
    time: "08:15",
    seatsBooked: 1,
    totalPrice: 10,
    status: "Cancelled",
  },
];
