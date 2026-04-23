
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    return (
      <main className="page-wrap">
        <div className="surface info-box" style={{ maxWidth: "760px" }}>
          <h1 className="page-title">Payment Success</h1>
          <p className="page-subtitle">
            No session ID was provided. Please return to your bookings.
          </p>

          <div className="actions">
            <Link href="/dashboard/bookings" className="btn btn-primary">
              Go to My Bookings
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const bookingId =
    session.metadata?.bookingId || session.client_reference_id || null;

  if (bookingId && session.payment_status === "paid") {
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (existingBooking && existingBooking.paymentStatus !== "PAID") {
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: "PAID",
          status: "Confirmed",
          paymentReference: session.id,
          paidAt: new Date(),
        },
      });
    }
  }

  return (
    <main className="page-wrap">
      <div className="surface info-box success-panel" style={{ maxWidth: "760px" }}>
        <div>
          <h1 className="page-title" style={{ color: "#15803d", marginTop: 0 }}>
            Payment Successful
          </h1>

          <p className="page-subtitle">
            Your Stripe test payment has been completed. Your booking should now
            show as paid in your dashboard.
          </p>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <h3>Stripe session</h3>
            <p style={{ fontSize: "14px" }}>{session.id}</p>
          </div>

          <div className="stat-card">
            <h3>Payment status</h3>
            <p style={{ fontSize: "18px" }}>{session.payment_status}</p>
          </div>

          <div className="stat-card">
            <h3>Mode</h3>
            <p style={{ fontSize: "18px" }}>{session.mode}</p>
          </div>

          <div className="stat-card">
            <h3>Flow</h3>
            <p style={{ fontSize: "18px" }}>Stripe test mode</p>
          </div>
        </div>

        <div className="actions">
          <Link href="/dashboard/bookings" className="btn btn-primary">
            Go to My Bookings
          </Link>

          <Link href="/dashboard/messages" className="btn btn-secondary">
            Open My Messages
          </Link>
        </div>
      </div>
    </main>
  );
}
