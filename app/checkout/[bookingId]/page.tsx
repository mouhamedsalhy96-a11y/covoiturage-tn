
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getClientLang } from "@/lib/getClientLang";
import { messages } from "@/lib/i18n";

export default function CheckoutPage() {
  const params = useParams<{ bookingId: string }>();
  const router = useRouter();
  const lang = getClientLang();
  const t = messages[lang];

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/payments/prepare/${params.bookingId}`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [params.bookingId]);

  async function confirmCOD() {
    setProcessing(true);

    try {
      await fetch(`/api/payments/cod/${params.bookingId}`, {
        method: "POST",
      });

      router.push("/booking-success?method=cod");
      router.refresh();
    } catch {
      setError(t.checkoutPage.failed);
      setProcessing(false);
    }
  }

  if (loading) {
    return <main className="page-wrap">{t.bookingPage.loading}</main>;
  }

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.checkoutPage.title}</h1>
        <p className="page-subtitle">{t.checkoutPage.subtitle}</p>
      </section>

      <section className="surface info-box" style={{ maxWidth: 600 }}>
        <h2>{t.checkoutPage.codTitle}</h2>
        <p>{t.checkoutPage.codText}</p>

        <div className="actions">
          <button
            className="btn btn-primary"
            onClick={confirmCOD}
            disabled={processing}
          >
            {processing ? t.checkoutPage.confirming : t.checkoutPage.confirmCOD}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </section>
    </main>
  );
}
