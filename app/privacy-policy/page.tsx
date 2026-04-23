
export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 30px",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>Privacy Policy</h1>
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
          This demo platform stores and displays trip, profile, booking, and message information
          for demonstration purposes.
        </p>
        <p style={{ marginBottom: "12px" }}>
          In a real production version, user data should be processed securely and in line with
          applicable privacy regulations.
        </p>
        <p>
          Users should be informed about what data is collected, why it is collected, and how long it
          is stored.
        </p>
      </div>
    </main>
  );
}
