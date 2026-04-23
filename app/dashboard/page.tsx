
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const lang = await getLang();
  const t = messages[lang];

  const myBookingsCount = await prisma.booking.count({
    where: { passengerId: user.id },
  });

  const myTripsCount = await prisma.trip.count({
    where: { driverId: user.id },
  });

  const myMessagesAsPassenger = await prisma.booking.findMany({
    where: { passengerId: user.id },
    include: {
      trip: {
        include: {
          messages: true,
        },
      },
    },
  });

  const myMessagesAsDriver = await prisma.trip.findMany({
    where: { driverId: user.id },
    include: {
      messages: true,
    },
  });

  const totalMessageCount =
    myMessagesAsPassenger.reduce(
      (sum, booking) => sum + booking.trip.messages.length,
      0
    ) + myMessagesAsDriver.reduce((sum, trip) => sum + trip.messages.length, 0);

  const isDriver = user.role === "DRIVER" || user.role === "BOTH";

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.dashboard.title}</h1>
        <p className="page-subtitle">
          {user.name}. {t.dashboard.subtitle}
        </p>
      </section>

      <section className="dashboard-hero-grid">
        <div className="dashboard-main-panel">
          <div className="surface info-box">
            <h2 className="section-title">{t.dashboard.overview}</h2>
            <p className="helper-text">{t.dashboard.overviewText}</p>

            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <h3>{t.dashboard.myBookings}</h3>
                <p>{myBookingsCount}</p>
              </div>

              <div className="dashboard-stat-card">
                <h3>{t.dashboard.myTrips}</h3>
                <p>{myTripsCount}</p>
              </div>

              <div className="dashboard-stat-card">
                <h3>{t.dashboard.messages}</h3>
                <p>{totalMessageCount}</p>
              </div>

              <div className="dashboard-stat-card">
                <h3>{t.dashboard.role}</h3>
                <p style={{ fontSize: "18px" }}>{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="dashboard-side-panel">
          <div className="surface info-box">
            <h2 className="section-title">{t.dashboard.quickActions}</h2>

            <div className="dashboard-action-list">
              <Link href="/dashboard/bookings" className="btn btn-secondary">
                {t.dashboard.openBookings}
              </Link>

              <Link href="/dashboard/messages" className="btn btn-secondary">
                {t.dashboard.openMessages}
              </Link>

              <Link href="/search" className="btn btn-secondary">
                {t.dashboard.searchTrips}
              </Link>

              {isDriver && (
                <>
                  <Link href="/driver/publish" className="btn btn-secondary">
                    {t.dashboard.publishTrip}
                  </Link>

                  <Link href="/driver/trips" className="btn btn-secondary">
                    {t.dashboard.viewMyTrips}
                  </Link>
                </>
              )}
            </div>
          </div>
        </aside>
      </section>

      <section className="dashboard-panels-grid">
        <div className="surface info-box">
          <h2 className="section-title">{t.dashboard.passengerTools}</h2>

          <div className="dashboard-link-grid">
            <Link href="/dashboard/bookings" className="dashboard-link-card">
              <h3>{t.dashboard.bookingsTitle}</h3>
              <p>{t.dashboard.bookingsText}</p>
            </Link>

            <Link href="/messages" className="dashboard-link-card">
              <h3>{t.dashboard.messagesTitle}</h3>
              <p>{t.dashboard.messagesText}</p>
            </Link>

            <Link href="/search" className="dashboard-link-card">
              <h3>{t.dashboard.searchTitle}</h3>
              <p>{t.dashboard.searchText}</p>
            </Link>
          </div>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.dashboard.driverTools}</h2>

          {isDriver ? (
            <div className="dashboard-link-grid">
              <Link href="/driver/publish" className="dashboard-link-card">
                <h3>{t.dashboard.publishTitle}</h3>
                <p>{t.dashboard.publishText}</p>
              </Link>

              <Link href="/driver/trips" className="dashboard-link-card">
                <h3>{t.dashboard.tripsTitle}</h3>
                <p>{t.dashboard.tripsText}</p>
              </Link>

              <Link href="/admin/bookings" className="dashboard-link-card">
                <h3>{t.dashboard.codTitle}</h3>
                <p>{t.dashboard.codText}</p>
              </Link>
            </div>
          ) : (
            <p className="helper-text">{t.dashboard.driverOnly}</p>
          )}
        </div>
      </section>
    </main>
  );
}
``
