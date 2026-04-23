
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "This route is no longer used. Use COD or local online payment." },
    { status: 400 }
  );
}
