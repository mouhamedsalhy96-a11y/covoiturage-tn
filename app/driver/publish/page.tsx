
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getClientLang } from "@/lib/getClientLang";
import { finalMessages } from "@/lib/finalI18n";

export default function PublishTripPage() {
  const router = useRouter();
  const lang = getClientLang();
  const t = finalMessages[lang].publishTrip;

  const [form, setForm] = useState({
    fromCity: "",
    toCity: "",
    date: "",
    time: "",
    price: "",
    seats: "",
    pickupPoint: "",
    luggage: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          seats: Number(form.seats),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.errorFallback);
      }

      router.push(t.successRedirect);
      router.refresh();
    } catch (err: any) {
      setError(err.message || t.errorFallback);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
      </section>

      <section className="surface info-box publish-trip-panel">
        <form className="publish-trip-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>{t.fromCity}</label>
            <input
              value={form.fromCity}
              onChange={(e) => updateField("fromCity", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>{t.toCity}</label>
            <input
              value={form.toCity}
              onChange={(e) => updateField("toCity", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>{t.date}</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>{t.time}</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>{t.price}</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>{t.seats}</label>
            <input
              type="number"
              value={form.seats}
              onChange={(e) => updateField("seats", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>{t.pickupPoint}</label>
            <input
              value={form.pickupPoint}
              onChange={(e) => updateField("pickupPoint", e.target.value)}
            />
          </div>

          <div className="field">
            <label>{t.luggage}</label>
            <input
              value={form.luggage}
              onChange={(e) => updateField("luggage", e.target.value)}
            />
          </div>

          <div className="field field-wide">
            <label>{t.notes}</label>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          <div className="actions field-wide">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? t.publishing : t.publish}
            </button>
          </div>

          {error && <p className="error-text field-wide">{error}</p>}
        </form>
      </section>
    </main>
  );
}
