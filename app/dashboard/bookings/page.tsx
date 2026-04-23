
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function DashboardBookingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const lang = await getLang();
  const t = messages[lang];

  const bookings = await prisma.booking.findMany({
    where: { passengerId: user.id },
    include: { trip: true },
    orderBy: { createdAt: "desc" },
  });

  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed");
  const pendingBookings = bookings.filter((b) => b.status === "Pending");
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled");

  function getStatusClass(status: string) {
    if (status === "Confirmed") return "badge badge-confirmed";
    if (status === "Pending") return "badge badge-pending";
    return "badge badge-cancelled";
  }

  function renderBookingCard(booking: (typeof bookings)[number]) {
    return (
      <div key={booking.id} className="booking-polish-card">
        <div className="booking-polish-top">
          <div>
            <h3 className="booking-polish-title">
              {booking.trip.fromCity} → {booking.trip.toCity}
            </h3>
            <p className="booking-polish-subtitle">
              {booking.trip.date} at {booking.trip.time}
            </p>
          </div>

          <span className={getStatusClass(booking.status)}>{booking.status}</span>
        </div>

        <div className="booking-polish-grid">
          <div className="booking-detail-box">
            <strong>{t.bookings.passenger}</strong>
            <span>{booking.passengerName}</span>
          </div>

          <div className="booking-detail-box">
            <strong>{t.bookings.seats}</strong>
            <span>{booking.seatsBooked}</span>
          </div>

          <div className="booking-detail-box">
            <strong>{t.bookings.total}</strong>
            <span>£{booking.totalPrice}</span>
          </div>

          <div className="booking-detail-box">
            <strong>{t.bookings.paymentStatus}</strong>
            <span>{booking.paymentStatus}</span>
          </div>

          <div className="booking-detail-box">
            <strong>{t.bookings.paymentMethod}</strong>
            <span>{booking.paymentMethod ?? t.bookings.notSelectedYet}</span>
          </div>

          {booking.paymentMethod === "CASH_ON_DELIVERY" && (
            <div className="booking-detail-box">
              <strong>{t.bookings.cashCollection}</strong>
              <span>{booking.cashCollectionStatus ?? t.bookings.cashPending}</span>
            </div>
          )}

          {booking.paymentMethod === "CASH_ON_DELIVERY" && (
            <div className="booking-detail-box booking-detail-box-wide">
              <strong>{t.bookings.cashCollectedAt}</strong>
              <span>
                {booking.cashCollectedAt
                  ? new Date(booking.cashCollectedAt).toLocaleString()
                  : t.bookings.notCollectedYet}
              </span>
            </div>
          )}
        </div>

        <div className="actions" style={{ marginTop: "16px" }}>
          <Link href={`/trip/${booking.trip.id}`} className="btn btn-secondary">
            {t.bookings.viewTrip}
          </Link>

          <Link href={`/messages/${booking.trip.id}`} className="btn btn-secondary">
            {t.bookings.openConversation}
          </Link>

          {!booking.paymentMethod && (
            <Link href={`/checkout/${booking.id}`} className="btn btn-primary">
              {t.bookings.completeCheckout}
            </Link>
          )}

          {booking.paymentMethod === "PAYMEE" &&
            booking.paymentStatus !== "PAID" && (
              <Link href={`/checkout/${booking.id}`} className="btn btn-primary">
                {t.bookings.continuePaymee}
              </Link>
            )}
        </div>
      </div>
    );
  }

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.bookings.title}</h1>
        <p className="page-subtitle">{t.bookings.subtitle}</p>
      </section>

      <section className="dashboard-bookings-sections">
        <div className="surface info-box">
          <h2 className="section-title">{t.bookings.confirmed}</h2>
          <div className="dashboard-list-stack">
            {confirmedBookings.length > 0 ? (
              confirmedBookings.map(renderBookingCard)
            ) : (
              <p className="helper-text">{t.bookings.noConfirmed}</p>
            )}
          </div>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.bookings.pending}</h2>
          <div className="dashboard-list-stack">
            {pendingBookings.length > 0 ? (
              pendingBookings.map(renderBookingCard)
            ) : (
              <p className="helper-text">{t.bookings.noPending}</p>
            )}
          </div>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.bookings.cancelled}</h2>
          <div className="dashboard-list-stack">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map(renderBookingCard)
            ) : (
              <p className="helper-text">{t.bookings.noCancelled}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
