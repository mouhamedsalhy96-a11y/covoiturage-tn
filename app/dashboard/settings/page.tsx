
"use client";

import { useState } from "react";

export default function DashboardSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage("Settings saved successfully (demo only).");
  }

  return (
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Update your account and notification preferences.
        </p>
      </section>

      <form className="surface form-panel" onSubmit={handleSave} style={{ maxWidth: "760px" }}>
        <div className="field">
          <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              style={{ width: "auto" }}
            />
            Enable email notifications
          </label>
        </div>

        <div className="field">
          <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              style={{ width: "auto" }}
            />
            Enable SMS notifications
          </label>
        </div>

        <div className="field">
          <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={marketingEmails}
              onChange={(e) => setMarketingEmails(e.target.checked)}
              style={{ width: "auto" }}
            />
            Receive platform updates and announcements
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>

        {successMessage && (
          <p style={{ marginTop: "16px", color: "#15803d" }}>{successMessage}</p>
        )}
      </form>
    </main>
  );
}
