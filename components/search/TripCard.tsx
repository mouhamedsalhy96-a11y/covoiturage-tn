
import Link from "next/link";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

type TripCardProps = {
  trip: {
    id: string;
    fromCity: string;
    toCity: string;
    date: string;
    time: string;
    price: number;
    seats: number;
    driver?: {
      id?: string;
      name: string;
    };
  };
};

export default async function TripCard({ trip }: TripCardProps) {
  const lang = await getLang();
  const t = messages[lang];

  return (
    <article className="trip-polish-card">
      <div className="trip-polish-top">
        <div>
          <h3 className="trip-polish-title">
            {trip.fromCity} → {trip.toCity}
          </h3>
          <p className="trip-polish-subtitle">
            {trip.date} at {trip.time}
          </p>
        </div>

        <div className="trip-polish-price">£{trip.price}</div>
      </div>

      <div className="trip-polish-grid">
        <div className="trip-polish-detail">
          <strong>{t.search.seats}</strong>
          <span>{trip.seats}</span>
        </div>

        <div className="trip-polish-detail">
          <strong>{t.search.driver}</strong>
          <span>{trip.driver?.name ?? "—"}</span>
        </div>

        <div className="trip-polish-detail">
          <strong>{t.search.route}</strong>
          <span>
            {trip.fromCity} → {trip.toCity}
          </span>
        </div>
      </div>

      <div className="actions" style={{ marginTop: "16px" }}>
        <Link href={`/trip/${trip.id}`} className="btn btn-primary">
          {t.search.viewDetails}
        </Link>

        {trip.driver?.id ? (
          <Link
            href={`/driver-profile/${trip.driver.id}`}
            className="btn btn-secondary"
          >
            {t.search.driverProfile}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
