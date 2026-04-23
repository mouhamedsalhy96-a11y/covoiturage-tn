
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BrandLogo from "@/components/layout/BrandLogo";
import { getLang } from "@/lib/getLang";
import { messages } from "@/lib/i18n";

export default async function HomePage() {
  const lang = await getLang();
  const t = messages[lang];

  const tripCount = await prisma.trip.count();
  const bookingCount = await prisma.booking.count();
  const driverCount = await prisma.user.count({
    where: {
      OR: [{ role: "DRIVER" }, { role: "BOTH" }],
    },
  });

  return (
    <main className="home-page">
      <section className="hero-section hero-section-image">
        <div className="hero-overlay" />

        <div className="hero-content hero-content-on-image">
          <div className="hero-copy">
            <span className="hero-badge">{t.home.badge}</span>

            <div className="hero-brand-block">
              <BrandLogo lang={lang} large />
            </div>

            <h1 className="hero-title hero-title-strong">
              {t.home.title}{" "}
              <span className="hero-brand-highlight">{t.brand.name}</span>
            </h1>

            <p className="hero-subtitle hero-subtitle-light">
              {t.home.subtitle}
            </p>

            <div className="hero-actions">
              <Link href="/search" className="btn btn-primary">
                {t.home.searchTrips}
              </Link>

              <Link href="/register" className="btn btn-secondary">
                {t.home.createAccount}
              </Link>
            </div>

            <div className="hero-mini-stats">
              <div className="hero-stat">
                <strong>{tripCount}</strong>
                <span>{t.home.tripsAvailable}</span>
              </div>

              <div className="hero-stat">
                <strong>{bookingCount}</strong>
                <span>{t.home.bookingsCount}</span>
              </div>

              <div className="hero-stat">
                <strong>{driverCount}</strong>
                <span>{t.home.driversCount}</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="surface hero-card hero-card-soft">
              <h2 className="hero-card-title">{t.home.whyTitle}</h2>

              <ul className="trust-list">
                <li className="trust-item">
                  <strong>{t.home.why1Title}</strong>
                  <div>{t.home.why1Text}</div>
                </li>

                <li className="trust-item">
                  <strong>{t.home.why2Title}</strong>
                  <div>{t.home.why2Text}</div>
                </li>

                <li className="trust-item">
                  <strong>{t.home.why3Title}</strong>
                  <div>{t.home.why3Text}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-header">
          <h2>{t.home.howTitle}</h2>
          <p>{t.home.howSubtitle}</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>{t.home.step1Title}</h3>
            <p>{t.home.step1Text}</p>
          </div>

          <div className="feature-card">
            <h3>{t.home.step2Title}</h3>
            <p>{t.home.step2Text}</p>
          </div>

          <div className="feature-card">
            <h3>{t.home.step3Title}</h3>
            <p>{t.home.step3Text}</p>
          </div>

          <div className="feature-card">
            <h3>{t.home.step4Title}</h3>
            <p>{t.home.step4Text}</p>
          </div>
        </div>
      </section>

      <section className="landing-section alt-section">
        <div className="landing-section-header">
          <h2>{t.home.trustTitle}</h2>
          <p>{t.home.trustSubtitle}</p>
        </div>

        <div className="benefit-grid">
          <div className="benefit-card">
            <h3>{t.home.trust1Title}</h3>
            <p>{t.home.trust1Text}</p>
          </div>

          <div className="benefit-card">
            <h3>{t.home.trust2Title}</h3>
            <p>{t.home.trust2Text}</p>
          </div>

          <div className="benefit-card">
            <h3>{t.home.trust3Title}</h3>
            <p>{t.home.trust3Text}</p>
          </div>

          <div className="benefit-card">
            <h3>{t.home.trust4Title}</h3>
            <p>{t.home.trust4Text}</p>
          </div>
        </div>
      </section>

      <section className="landing-section cta-section">
        <div className="cta-panel">
          <div>
            <h2>{t.home.ctaTitle}</h2>
            <p>{t.home.ctaText}</p>
          </div>

          <div className="hero-actions">
            <Link href="/dashboard" className="btn btn-primary">
              {t.home.openDashboard}
            </Link>

            <Link href="/driver/publish" className="btn btn-secondary">
              {t.home.publishTrip}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
