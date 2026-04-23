
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getClientLang } from "@/lib/getClientLang";
import { finalMessages } from "@/lib/finalI18n";

type MarkCashCollectedButtonProps = {
  bookingId: string;
};

export default function MarkCashCollectedButton({
  bookingId,
}: MarkCashCollectedButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const lang = getClientLang();
  const t = finalMessages[lang].cashButton;

  async function handleClick() {
    setLoading(true);

    try {
      const res = await fetch(`/api/payments/cash-collected/${bookingId}`, {
        method: "POST",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || t.failed);
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : t.failed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? t.loading : t.label}
    </button>
  );
}
