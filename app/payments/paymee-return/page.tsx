
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { verifyPaymeeChecksum } from "@/lib/paymee";

type PaymeeReturnPageProps = {
  searchParams: Promise<{
    booking_id?: string;
    token?: string;
    payment_status?: string;
    check_sum?: string;
  }>;
};

export default async function PaymeeReturnPage({
  searchParams,
}: PaymeeReturnPageProps) {
  const params = await searchParams;

  const bookingId = params.booking_id;
  const token = params.token;
  const paymentStatus = params.payment_status;
  const checksum = params.check_sum;

  let outcome = "Payment return received.";
  let verified = false;

  if (bookingId && token && paymentStatus && checksum) {
    verified = verifyPaymeeChecksum(token, paymentStatus, checksum);

    if (verified && paymentStatus === "1") {
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          paymentMethod: "PAYMEE",
          paymentStatus: "PAID",
          status: "Confirmed",
          paymentReference: token,
          paidAt: new Date(),
        },
      });

      outcome = "Paymee payment completed successfully.";
    } else if (verified && paymentStatus === "0") {
      outcome = "Paymee payment was not completed.";
    } else {
      outcome = "Paymee return could not be verified.";
    }
  } else {
    outcome = "Missing Paymee return parameters.";
  }

  return (
    <main className="page-wrap">
      <div className="surface info-box" style={{ maxWidth: "760px" }}>
        <h1 className="page-title" style={{ marginTop: 0 }}>
          Paymee Payment Result
        </h1>

        <p className="page-subtitle">{outcome}</p>

        <div className="stat-grid">
          <div className="stat-card">
            <h3>Verified</h3>
            <p style={{ fontSize: "18px" }}>{verified ? "Yes" : "No"}</p>
          </div>

          <div className="stat-card">
            <h3>Payment status</h3>
            <p style={{ fontSize: "18px" }}>{paymentStatus ?? "N/A"}</p>
          </div>

          <div className="stat-card">
            <h3>Booking</h3>
            <p style={{ fontSize: "14px" }}>{bookingId ?? "N/A"}</p>
          </div>

          <div className="stat-card">
            <h3>Reference</h3>
            <p style={{ fontSize: "14px" }}>{token ?? "N/A"}</p>
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
