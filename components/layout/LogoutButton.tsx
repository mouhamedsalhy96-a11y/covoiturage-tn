
"use client";

import { useState } from "react";

type LogoutButtonProps = {
  label: string;
  loadingLabel: string;
};

export default function LogoutButton({
  label,
  loadingLabel,
}: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        cache: "no-store",
      });
    } catch (error) {
      console.error(error);
    } finally {
      window.location.assign("/");
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="nav-logout-button"
      disabled={loading}
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
``
