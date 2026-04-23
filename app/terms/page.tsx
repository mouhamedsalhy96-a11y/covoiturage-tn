
export default function TermsPage() {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 30px",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
        Terms & Conditions
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
          This demo platform allows drivers to publish trips and passengers to search and book seats.
        </p>
        <p style={{ marginBottom: "12px" }}>
          In a real version, users would be expected to provide accurate information and use the
          platform responsibly.
        </p>
        <p>
          Trip publication, cancellations, communication, and user conduct would be governed by full
          platform terms.
        </p>
      </div>
    </main>
  );
}
