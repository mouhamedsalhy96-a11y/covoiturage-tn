
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data: { error?: string } | null = null;

      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }

      router.push("/dashboard");
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
    <main className="page-wrap">
      <section className="page-header">
        <h1 className="page-title">Login</h1>
        <p className="page-subtitle">
          Sign in to access your dashboard and protected pages.
        </p>
      </section>

      <form
        className="surface form-panel"
        onSubmit={handleSubmit}
        style={{ maxWidth: "560px" }}
      >
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        {errorMessage && (
          <p style={{ marginTop: "16px", color: "#dc2626" }}>{errorMessage}</p>
        )}

        <p style={{ marginTop: "20px" }}>
          Demo user: <strong>mohamed@example.com</strong> / <strong>password123</strong>
        </p>
      </form>
    </main>
  );
}
