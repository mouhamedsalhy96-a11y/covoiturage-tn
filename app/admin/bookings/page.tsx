
import { prisma } from "@/lib/prisma";
import MarkCashCollectedButton from "@/components/payments/MarkCashCollectedButton";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function AdminBookingsPage() {
  const lang = await getLang();
  const t = messages[lang];

  const bookings = await prisma.booking.findMany({
    include: { trip: true },
    orderBy: { createdAt: "desc" },
  });

  const codPending = bookings.filter(
    (b) =>
      b.paymentMethod === "CASH_ON_DELIVERY" &&
      b.cashCollectionStatus !== "COLLECTED"
  );

  const codCollected = bookings.filter(
    (b) =>
      b.paymentMethod === "CASH_ON_DELIVERY" &&
      b.cashCollectionStatus === "COLLECTED"
  );

  const otherPayments = bookings.filter(
    (b) => b.paymentMethod !== "CASH_ON_DELIVERY"
  );

  function renderAdminBookingCard(booking: (typeof bookings)[number]) {
    return (
      <div key={booking.id} className="admin-booking-card">
        <div className="admin-booking-top">
          <div>
            <h3 className="admin-booking-title">
              {booking.trip.fromCity} → {booking.trip.toCity}
            </h3>
            <p className="admin-booking-subtitle">
              {booking.trip.date} at {booking.trip.time}
            </p>
          </div>

          <div className="admin-booking-badges">
            <span className="badge badge-pending">{booking.paymentStatus}</span>
          </div>
        </div>

        <div className="admin-booking-grid">
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

          <div className="booking-detail-box">
            <strong>{t.bookings.cashCollection}</strong>
            <span>{booking.cashCollectionStatus ?? "N/A"}</span>
          </div>

          <div className="booking-detail-box booking-detail-box-wide">
            <strong>{t.bookings.cashCollectedAt}</strong>
            <span>
              {booking.cashCollectedAt
                ? new Date(booking.cashCollectedAt).toLocaleString()
                : t.bookings.notCollectedYet}
            </span>
          </div>
        </div>

        <div className="actions" style={{ marginTop: "16px" }}>
          {booking.paymentMethod === "CASH_ON_DELIVERY" &&
            booking.cashCollectionStatus !== "COLLECTED" && (
              <MarkCashCollectedButton bookingId={booking.id} />
            )}
        </div>
      </div>
    );
  }

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.adminBookings.title}</h1>
        <p className="page-subtitle">{t.adminBookings.subtitle}</p>
      </section>

      <section className="dashboard-bookings-sections">
        <div className="surface info-box">
          <h2 className="section-title">{t.adminBookings.codPending}</h2>
          <div className="dashboard-list-stack">
            {codPending.length > 0 ? (
              codPending.map(renderAdminBookingCard)
            ) : (
              <p className="helper-text">{t.adminBookings.noCodPending}</p>
            )}
          </div>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.adminBookings.codCollected}</h2>
          <div className="dashboard-list-stack">
            {codCollected.length > 0 ? (
              codCollected.map(renderAdminBookingCard)
            ) : (
              <p className="helper-text">{t.adminBookings.noCodCollected}</p>
            )}
          </div>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.adminBookings.otherPayments}</h2>
          <div className="dashboard-list-stack">
            {otherPayments.length > 0 ? (
              otherPayments.map(renderAdminBookingCard)
            ) : (
              <p className="helper-text">{t.adminBookings.noOther}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
