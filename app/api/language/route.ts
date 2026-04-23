
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidLang } from "@/lib/i18n";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lang = body?.lang;

    if (!lang || !isValidLang(lang)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set("lang", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update language" },
      { status: 500 }
    );
  }
}
