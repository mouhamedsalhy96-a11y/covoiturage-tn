
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLang } from "@/lib/getLang";
import { finalMessages } from "@/lib/finalI18n";

export default async function DriverProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lang = await getLang();
  const t = finalMessages[lang].driverProfile;

  const driver = await prisma.user.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
      trips: true,
    },
  });

  if (!driver) {
    notFound();
  }

  const averageRating =
    driver.reviews.length > 0
      ? (
          driver.reviews.reduce((sum, review) => sum + review.rating, 0) /
          driver.reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">{t.pageTitle}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
      </section>

      <div className="profile-hero">
        <section className="surface info-box">
          <h2 style={{ marginTop: 0, marginBottom: "12px" }}>{driver.name}</h2>
          <p className="helper-text" style={{ marginBottom: "20px" }}>
            {driver.bio ?? t.noBio}
          </p>

          <div className="profile-meta">
            <div className="card">
              <h3 style={{ marginTop: 0, marginBottom: "8px" }}>{t.city}</h3>
              <p style={{ margin: 0 }}>{driver.city ?? "—"}</p>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0, marginBottom: "8px" }}>{t.role}</h3>
              <p style={{ margin: 0 }}>{driver.role}</p>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
                {t.averageRating}
              </h3>
              <p style={{ margin: 0 }}>{averageRating}</p>
            </div>
          </div>

          <div className="stat-grid" style={{ marginTop: "20px" }}>
            <div className="stat-card">
              <h3>{t.publishedTrips}</h3>
              <p>{driver.trips.length}</p>
            </div>

            <div className="stat-card">
              <h3>{t.reviews}</h3>
              <p>{driver.reviews.length}</p>
            </div>

            <div className="stat-card">
              <h3>{t.profileType}</h3>
              <p style={{ fontSize: "18px" }}>{driver.role}</p>
            </div>

            <div className="stat-card">
              <h3>{t.status}</h3>
              <p style={{ fontSize: "18px" }}>{t.active}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">{t.passengerReviews}</h2>

          {driver.reviews.length > 0 ? (
            <div className="stack">
              {driver.reviews.map((review) => (
                <div key={review.id} className="card">
                  <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
                    {review.passengerName}
                  </h3>
                  <p style={{ marginBottom: "8px" }}>
                    ⭐ {review.rating}
                  </p>
                  <p style={{ margin: 0 }}>{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card">
              <p>{t.noReviews}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
