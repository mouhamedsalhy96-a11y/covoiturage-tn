
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import TripTimeline from "@/components/trip/TripTimeline";
import TripMapShell from "@/components/map/TripMapShell";
import { getCityCoordinate } from "@/data/cityCoordinates";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  const lang = await getLang();
  const t = messages[lang];

  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      driver: true,
      bookings: true,
      messages: true,
      reviews: true,
    },
  });

  if (!trip) {
    notFound();
  }

  const fromCoord = getCityCoordinate(trip.fromCity);
  const toCoord = getCityCoordinate(trip.toCity);

  const isDriver = currentUser ? trip.driverId === currentUser.id : false;
  const hasBooked = currentUser
    ? trip.bookings.some((booking) => booking.passengerId === currentUser.id)
    : false;

  const averageRating =
    trip.reviews.length > 0
      ? (
          trip.reviews.reduce((sum, review) => sum + review.rating, 0) /
          trip.reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">
          {trip.fromCity} → {trip.toCity}
        </h1>
        <p className="page-subtitle">{t.trip.subtitle}</p>

        <div className="route-bar">
          <span className="route-chip">{t.trip.price}: £{trip.price}</span>
          <span className="route-chip">{t.trip.seats}: {trip.seats}</span>
          <span className="route-chip">{t.trip.bookings}: {trip.bookings.length}</span>
          <span className="route-chip">{t.trip.messages}: {trip.messages.length}</span>
          <span className="route-chip">{t.trip.rating}: {averageRating}</span>
        </div>
      </section>

      <div className="detail-grid">
        <section className="stack">
          <div className="surface info-box">
            <h2 className="section-title">{t.trip.tripInformation}</h2>

            <div className="info-list">
              <div className="info-row">
                <span className="info-label">{t.trip.departure}</span>
                <span className="info-value">{trip.fromCity}</span>
              </div>

              <div className="info-row">
                <span className="info-label">{t.trip.destination}</span>
                <span className="info-value">{trip.toCity}</span>
              </div>

              <div className="info-row">
                <span className="info-label">{t.trip.pickup}</span>
                <span className="info-value">
                  {trip.pickupPoint ?? t.trip.notSpecified}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">{t.trip.luggage}</span>
                <span className="info-value">
                  {trip.luggage ?? t.trip.notSpecified}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">{t.trip.notes}</span>
                <span className="info-value">{trip.notes ?? t.trip.noNotes}</span>
              </div>
            </div>
          </div>

          <div className="surface info-box">
            <h2 className="section-title">{t.trip.routeTimeline}</h2>
            <TripTimeline
              fromCity={trip.fromCity}
              toCity={trip.toCity}
              pickupPoint={trip.pickupPoint}
              notes={trip.notes}
            />
          </div>

          <div className="surface info-box">
            <h2 className="section-title">{t.trip.driverTrust}</h2>

            <div className="booking-polish-grid">
              <div className="booking-detail-box">
                <strong>{t.trip.driverName}</strong>
                <span>{trip.driver.name}</span>
              </div>

              <div className="booking-detail-box">
                <strong>{t.trip.city}</strong>
                <span>{trip.driver.city ?? t.trip.notSpecified}</span>
              </div>

              <div className="booking-detail-box">
                <strong>{t.trip.averageRating}</strong>
                <span>{averageRating}</span>
              </div>

              <div className="booking-detail-box booking-detail-box-wide">
                <strong>{t.trip.bio}</strong>
                <span>{trip.driver.bio ?? t.trip.noBio}</span>
              </div>
            </div>

            <div className="actions" style={{ marginTop: "16px" }}>
              <Link
                href={`/driver-profile/${trip.driver.id}`}
                className="btn btn-secondary"
              >
                {t.trip.viewDriverProfile}
              </Link>
            </div>
          </div>
        </section>

        <aside className="stack">
          {fromCoord && toCoord ? (
            <TripMapShell
              fromCity={trip.fromCity}
              toCity={trip.toCity}
              fromLat={fromCoord.lat}
              fromLng={fromCoord.lng}
              toLat={toCoord.lat}
              toLng={toCoord.lng}
              pickupPoint={trip.pickupPoint}
            />
          ) : (
            <div className="mini-map">
              <h2 className="section-title">Map</h2>
              <p className="helper-text">No coordinates configured yet.</p>
            </div>
          )}

          <div className="surface info-box">
            <h2 className="section-title">{t.trip.bookingAction}</h2>
            <p className="helper-text">{t.trip.bookingActionText}</p>

            <div className="actions">
              <Link href={`/booking/${trip.id}`} className="btn btn-primary">
                {t.trip.bookThisTrip}
              </Link>

              {(isDriver || hasBooked) && (
                <Link href={`/messages/${trip.id}`} className="btn btn-secondary">
                  {t.trip.openConversation}
                </Link>
              )}
            </div>

            {!currentUser && (
              <p className="empty-note">{t.trip.loginNote}</p>
            )}

            {currentUser && !isDriver && !hasBooked && (
              <p className="empty-note">{t.trip.bookingNote}</p>
            )}
          </div>

          <div className="surface info-box">
            <h2 className="section-title">{t.trip.paymentNoteTitle}</h2>
            <p className="helper-text">{t.trip.paymentNoteText}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
