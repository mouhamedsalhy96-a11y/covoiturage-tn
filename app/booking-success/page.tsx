
import Link from "next/link";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function BookingSuccessPage() {
  const lang = await getLang();
  const t = messages[lang];

  return (
    <main className="page-wrap">
      <section className="surface info-box" style={{ maxWidth: 600 }}>
        <h1 className="page-title" style={{ color: "#15803d" }}>
          {t.success.title}
        </h1>

        <p className="page-subtitle">{t.success.subtitle}</p>

        <div className="actions">
          <Link href="/dashboard/bookings" className="btn btn-primary">
            {t.success.viewBookings}
          </Link>

          <Link href="/search" className="btn btn-secondary">
            {t.success.searchMore}
          </Link>
        </div>
      </section>
    </main>
  );
}
