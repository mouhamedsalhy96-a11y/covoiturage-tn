
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getLang } from "@/lib/getLang";
import { finalMessages } from "@/lib/finalI18n";

export default async function DriverTripsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const lang = await getLang();
  const t = finalMessages[lang].driverTrips;

  const trips = await prisma.trip.findMany({
    where: {
      driverId: user.id,
    },
    include: {
      bookings: true,
      messages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
      </section>

      <section className="dashboard-bookings-sections">
        <div className="surface info-box">
          <div className="actions" style={{ marginBottom: "16px" }}>
            <Link href="/driver/publish" className="btn btn-primary">
              {t.publishAnother}
            </Link>
          </div>

          <div className="dashboard-list-stack">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div key={trip.id} className="booking-polish-card">
                  <div className="booking-polish-top">
                    <div>
                      <h3 className="booking-polish-title">
                        {trip.fromCity} → {trip.toCity}
                      </h3>
                      <p className="booking-polish-subtitle">
                        {trip.date} at {trip.time}
                      </p>
                    </div>

                    <span className="badge badge-confirmed">
                      £{trip.price}
                    </span>
                  </div>

                  <div className="booking-polish-grid">
                    <div className="booking-detail-box">
                      <strong>{t.price}</strong>
                      <span>£{trip.price}</span>
                    </div>

                    <div className="booking-detail-box">
                      <strong>{t.seats}</strong>
                      <span>{trip.seats}</span>
                    </div>

                    <div className="booking-detail-box">
                      <strong>{t.bookings}</strong>
                      <span>{trip.bookings.length}</span>
                    </div>

                    <div className="booking-detail-box">
                      <strong>{t.messages}</strong>
                      <span>{trip.messages.length}</span>
                    </div>
                  </div>

                  <div className="actions" style={{ marginTop: "16px" }}>
                    <Link href={`/trip/${trip.id}`}>{t.viewTrip}</Link>
                    <Link href={`/messages/${trip.id}`}>{t.openConversation}</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="helper-text">{t.noTrips}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
