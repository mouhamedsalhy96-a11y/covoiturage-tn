
import TripCard from "@/components/search/TripCard";
import { prisma } from "@/lib/prisma";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function SearchPage() {
  const lang = await getLang();
  const t = messages[lang];

  const trips = await prisma.trip.findMany({
    include: {
      driver: true,
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
        <h1 className="page-title">{t.search.title}</h1>
        <p className="page-subtitle">{t.search.subtitle}</p>
      </section>

      <section className="search-summary-grid">
        <div className="surface info-box">
          <h2 className="section-title">{t.search.availability}</h2>

          <div className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <h3>{t.search.totalTrips}</h3>
              <p>{trips.length}</p>
            </div>

            <div className="dashboard-stat-card">
              <h3>{t.search.totalSeats}</h3>
              <p>{trips.reduce((sum, trip) => sum + trip.seats, 0)}</p>
            </div>

            <div className="dashboard-stat-card">
              <h3>{t.search.totalBookings}</h3>
              <p>{trips.reduce((sum, trip) => sum + trip.bookings.length, 0)}</p>
            </div>

            <div className="dashboard-stat-card">
              <h3>{t.search.totalMessages}</h3>
              <p>{trips.reduce((sum, trip) => sum + trip.messages.length, 0)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="trip-polish-list">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={{
                id: trip.id,
                fromCity: trip.fromCity,
                toCity: trip.toCity,
                date: trip.date,
                time: trip.time,
                price: trip.price,
                seats: trip.seats,
                driver: {
                  id: trip.driver.id,
                  name: trip.driver.name,
                },
              }}
            />
          ))
        ) : (
          <div className="surface info-box">
            <p className="helper-text">{t.search.noTrips}</p>
          </div>
        )}
      </section>
    </main>
  );
}
