
export default function DriverRequestsPage() {
  const requests = [
    {
      id: "r1",
      passengerName: "Mohamed",
      route: "Manchester → Liverpool",
      seats: 1,
      status: "Pending",
    },
    {
      id: "r2",
      passengerName: "James",
      route: "London → Birmingham",
      seats: 2,
      status: "Approved",
    },
    {
      id: "r3",
      passengerName: "Ali",
      route: "Leeds → Sheffield",
      seats: 1,
      status: "Pending",
    },
  ];

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">Trip Requests</h1>
        <p className="page-subtitle">
          View passenger requests for your published trips.
        </p>
      </section>

      <div className="stack" style={{ maxWidth: "760px" }}>
        {requests.map((request) => (
          <div key={request.id} className="card">
            <h2 style={{ fontSize: "18px", marginTop: 0, marginBottom: "8px" }}>
              {request.passengerName}
            </h2>
            <p>Trip: {request.route}</p>
            <p>Seats requested: {request.seats}</p>
            <p>Status: {request.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
