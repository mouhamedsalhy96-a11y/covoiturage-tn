
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/", request.url));
}
