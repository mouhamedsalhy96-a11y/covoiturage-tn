
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type MessageComposerProps = {
  tripId: string;
};

export default function MessageComposer({ tripId }: MessageComposerProps) {
  const router = useRouter();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/messages/${tripId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setText("");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface form-panel">
      <div className="field">
        <label>New message</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message..."
          required
        />
      </div>

      <div className="actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>

      {errorMessage && (
        <p style={{ marginTop: "16px", color: "#dc2626" }}>{errorMessage}</p>
      )}
    </form>
  );
}
