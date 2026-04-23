
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="page-wrap">
      <div className="surface info-box" style={{ maxWidth: "760px" }}>
        <h1 className="page-title" style={{ marginTop: 0 }}>
          Page Not Found
        </h1>

        <p className="page-subtitle" style={{ marginBottom: "24px" }}>
          The page you requested does not exist.
        </p>

        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </main>
  );
}
