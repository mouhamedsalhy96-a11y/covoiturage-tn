
import { prisma } from "@/lib/prisma";

type TripWithDriver = {
  id: string;
  fromCity: string;
  toCity: string;
  date: string;
  price: number;
  driver: {
    name: string;
  };
};

export default async function AdminTripsPage() {
  const trips: TripWithDriver[] = await prisma.trip.findMany({
    include: {
      driver: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">Admin Trips</h1>
      </section>

      <div className="stack" style={{ maxWidth: "760px" }}>
        {trips.map((trip: TripWithDriver) => (
          <div key={trip.id} className="card">
            {trip.fromCity} → {trip.toCity} | {trip.date} | £{trip.price} | Driver:{" "}
            {trip.driver.name}
          </div>
        ))}
      </div>
    </main>
  );
}
