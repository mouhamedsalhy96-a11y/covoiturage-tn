
import Link from "next/link";

type CancelPageProps = {
  searchParams: Promise<{
    booking_id?: string;
  }>;
};

export default async function PaymentCancelPage({
  searchParams,
}: CancelPageProps) {
  const params = await searchParams;
  const bookingId = params.booking_id;

  return (
    <main className="page-wrap">
      <div className="surface info-box" style={{ maxWidth: "760px" }}>
        <h1 className="page-title" style={{ marginTop: 0 }}>
          Payment Cancelled
        </h1>

        <p className="page-subtitle">
          Your Stripe Checkout session was cancelled before payment completed.
          Your booking is still saved as unpaid.
        </p>

        <div className="actions">
          {bookingId ? (
            <Link href={`/checkout/${bookingId}`} className="btn btn-primary">
              Return to Checkout
            </Link>
          ) : (
            <Link href="/dashboard/bookings" className="btn btn-primary">
              Go to My Bookings
            </Link>
          )}

          <Link href="/dashboard/bookings" className="btn btn-secondary">
            View My Bookings
          </Link>
        </div>
      </div>
    </main>
  );
}
