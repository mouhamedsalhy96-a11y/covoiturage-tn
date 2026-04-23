
export default function AdminUsersPage() {
  const users = ["Mohamed", "Ahmed", "Sara", "Omar"];

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">Admin Users</h1>
      </section>

      <div className="stack" style={{ maxWidth: "760px" }}>
        {users.map((user) => (
          <div key={user} className="card">
            {user}
          </div>
        ))}
      </div>
    </main>
  );
}
