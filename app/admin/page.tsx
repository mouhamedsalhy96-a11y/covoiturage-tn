
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">
          Manage users, trips, and bookings from the admin area.
        </p>
      </section>

      <div className="grid-3">
        <div className="card">
          <h2>Users</h2>
          <p className="muted">Moderate and review registered accounts.</p>
          <Link href="/admin/users" className="btn btn-secondary">
            Open Users
          </Link>
        </div>

        <div className="card">
          <h2>Trips</h2>
          <p className="muted">Review published trips across the platform.</p>
          <Link href="/admin/trips" className="btn btn-secondary">
            Open Trips
          </Link>
        </div>

        <div className="card">
          <h2>Bookings</h2>
          <p className="muted">Inspect current booking records and statuses.</p>
          <Link href="/admin/bookings" className="btn btn-secondary">
            Open Bookings
          </Link>
        </div>
      </div>
    </main>
  );
}
