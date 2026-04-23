
import Link from "next/link";

type LocalPaymentInfoPageProps = {
  params: Promise<{ bookingId: string }>;
  searchParams: Promise<{
    provider?: string;
    state?: string;
  }>;
};

export default async function LocalPaymentInfoPage({
  params,
  searchParams,
}: LocalPaymentInfoPageProps) {
  const { bookingId } = await params;
  const query = await searchParams;

  const provider = query.provider ?? "local-gateway";
  const state = query.state ?? "info";

  const title =
    state === "unreachable"
      ? "Provider Temporarily Unavailable"
      : state === "error"
      ? "Online Payment Could Not Be Started"
      : state === "missing_url"
      ? "Online Payment Link Missing"
      : "Local Online Payment";

  const subtitle =
    state === "unreachable"
      ? "The payment provider could not be reached from the current environment. Your booking remains saved, and you can retry later or use Cash on Delivery."
      : state === "error"
      ? "The payment provider responded with an error. Your booking remains saved and unpaid."
      : state === "missing_url"
      ? "The payment provider did not return a hosted payment link. Your booking remains saved and unpaid."
      : "Your booking has been prepared for a Tunisia-ready online payment path.";

  return (
    <main className="page-wrap">
      <div className="surface info-box" style={{ maxWidth: "760px" }}>
        <h1 className="page-title" style={{ marginTop: 0 }}>
          {title}
        </h1>

        <p className="page-subtitle">{subtitle}</p>

        <div className="stat-grid">
          <div className="stat-card">
            <h3>Provider</h3>
            <p style={{ fontSize: "18px" }}>{provider.toUpperCase()}</p>
          </div>

          <div className="stat-card">
            <h3>State</h3>
            <p style={{ fontSize: "18px" }}>{state}</p>
          </div>

          <div className="stat-card">
            <h3>Booking</h3>
            <p style={{ fontSize: "14px" }}>{bookingId}</p>
          </div>

          <div className="stat-card">
            <h3>Recommended</h3>
            <p style={{ fontSize: "18px" }}>
              {state === "unreachable" ? "Use COD" : "Retry later"}
            </p>
          </div>
        </div>

        <div className="actions">
          <Link href={`/checkout/${bookingId}`} className="btn btn-secondary">
            Return to Checkout
          </Link>

          <Link href="/dashboard/bookings" className="btn btn-primary">
            Go to My Bookings
          </Link>
        </div>
      </div>
    </main>
  );
}
