
import Link from "next/link";
import { Booking } from "@/types/booking";

type BookingCardProps = {
  booking: Booking;
};

export default function BookingCard({ booking }: BookingCardProps) {
  const statusClass =
    booking.status === "Confirmed"
      ? "badge badge-confirmed"
      : booking.status === "Pending"
      ? "badge badge-pending"
      : "badge badge-cancelled";

  return (
    <div className="card">
      <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
        {booking.from} → {booking.to}
      </h3>

      <p>Date: {booking.date}</p>
      <p>Time: {booking.time}</p>
      <p>Passenger: {booking.passengerName}</p>
      <p>Seats booked: {booking.seatsBooked}</p>
      <p>Total price: £{booking.totalPrice}</p>

      <div style={{ margin: "14px 0" }}>
        <span className={statusClass}>{booking.status}</span>
      </div>

      <Link href={`/trip/${booking.tripId}`} className="btn btn-secondary">
        View Trip Details
      </Link>
    </div>
  );
}
