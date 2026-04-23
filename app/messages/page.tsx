
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getLang } from "@/lib/getLang";
import { extraMessages } from "@/lib/extraI18n";

export default async function MessagesInboxPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const lang = await getLang();
  const t = extraMessages[lang].inbox;

  const passengerBookings = await prisma.booking.findMany({
    where: {
      passengerId: user.id,
    },
    include: {
      trip: {
        include: {
          driver: true,
          messages: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const driverTrips = await prisma.trip.findMany({
    where: {
      driverId: user.id,
    },
    include: {
      driver: true,
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
          <h2 className="section-title">{t.passengerTrips}</h2>

          <div className="dashboard-list-stack">
            {passengerBookings.length > 0 ? (
              passengerBookings.map((booking) => (
                <div key={booking.id} className="booking-polish-card">
                  <div className="booking-polish-top">
                    <div>
                      <h3 className="booking-polish-title">
                        {booking.trip.fromCity} → {booking.trip.toCity}
                      </h3>
                      <p className="booking-polish-subtitle">
                        {t.rolePassenger}
                      </p>
                    </div>

                    <span className="badge badge-pending">
                      {t.messagesCount}: {booking.trip.messages.length}
                    </span>
                  </div>

                  <div className="actions" style={{ marginTop: "16px" }}>
                    <Link href={`/messages/${booking.trip.id}`}>
                      {t.openConversation}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="helper-text">{t.noPassengerTrips}</p>
            )}
          </div>
        </div>

        <div className="surface info-box">
          <h2 className="section-title">{t.driverTrips}</h2>

          <div className="dashboard-list-stack">
            {driverTrips.length > 0 ? (
              driverTrips.map((trip) => (
                <div key={trip.id} className="booking-polish-card">
                  <div className="booking-polish-top">
                    <div>
                      <h3 className="booking-polish-title">
                        {trip.fromCity} → {trip.toCity}
                      </h3>
                      <p className="booking-polish-subtitle">
                        {t.roleDriver}
                      </p>
                    </div>

                    <span className="badge badge-pending">
                      {t.messagesCount}: {trip.messages.length}
                    </span>
                  </div>

                  <div className="actions" style={{ marginTop: "16px" }}>
                    <Link href={`/messages/${trip.id}`}>
                      {t.openConversation}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="helper-text">{t.noDriverTrips}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
