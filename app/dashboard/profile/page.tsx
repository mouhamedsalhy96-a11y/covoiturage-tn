
export default function DashboardProfilePage() {
  const user = {
    name: "Mohamed",
    email: "mohamed@example.com",
    phone: "+44 7000 000000",
    city: "Manchester",
    role: "Passenger and Driver",
    bio: "I use the platform both as a passenger and as a driver.",
  };

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">
          View your personal information and travel profile.
        </p>
      </section>

      <section className="surface info-box" style={{ maxWidth: "760px" }}>
        <h2 style={{ marginTop: 0, marginBottom: "16px" }}>{user.name}</h2>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
      </section>
    </main>
  );
}
