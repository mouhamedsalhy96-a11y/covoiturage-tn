
export default function CancellationPolicyPage() {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 30px",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
        Cancellation Policy
      </h1>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "850px",
        }}
      >
        <p style={{ marginBottom: "12px" }}>
          This demo version does not process live payments or real cancellation charges.
        </p>
        <p style={{ marginBottom: "12px" }}>
          In a real platform, cancellation rules would define whether refunds or penalties apply
          depending on timing and booking status.
        </p>
        <p>
          Drivers and passengers should have clear visibility on cancellation terms before confirming a trip.
        </p>
      </div>
    </main>
  );
}
