
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getClientLang } from "@/lib/getClientLang";
import { messages } from "@/lib/i18n";

type Trip = {
  id: string;
  fromCity: string;
  toCity: string;
  date: string;
  time: string;
  price: number;
  seats: number;
  driver: {
    name: string;
  };
};

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const lang = getClientLang();
  const t = messages[lang];

  const [trip, setTrip] = useState<Trip | null>(null);
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTrip() {
      try {
        const res = await fetch(`/api/trips/${params.id}`);
        const data = await res.json();
        setTrip(data);
      } catch {
        setError(t.bookingPage.unable);
      } finally {
        setPageLoading(false);
      }
    }

    loadTrip();
  }, [params.id, t.bookingPage.unable]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trip) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tripId: trip.id,
          seatsBooked,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Booking failed");
      }

      router.push(`/checkout/${data.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return <main className="page-wrap">{t.bookingPage.loading}</main>;
  }

  if (!trip) {
    return <main className="page-wrap">{error}</main>;
  }

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.bookingPage.title}</h1>
        <p className="page-subtitle">{t.bookingPage.subtitle}</p>
      </section>

      <div className="split">
        <section className="surface info-box">
          <h2>
            {trip.fromCity} → {trip.toCity}
          </h2>

          <p>Date: {trip.date}</p>
          <p>Time: {trip.time}</p>
          <p>{t.bookingPage.driver}: {trip.driver.name}</p>
          <p>{t.bookingPage.pricePerSeat}: £{trip.price}</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>{t.bookingPage.seatsToBook}</label>
              <input
                type="number"
                min={1}
                max={trip.seats}
                value={seatsBooked}
                onChange={(e) => setSeatsBooked(Number(e.target.value))}
                required
              />
            </div>

            <p style={{ marginTop: 12 }}>
              <strong>{t.bookingPage.total}:</strong> £{seatsBooked * trip.price}
            </p>

            <div className="actions">
              <button className="btn btn-primary" disabled={loading}>
                {loading
                  ? `${t.bookingPage.continueCheckout}...`
                  : t.bookingPage.continueCheckout}
              </button>
            </div>

            {error && <p className="error-text">{error}</p>}
          </form>
        </section>
      </div>
    </main>
  );
}
