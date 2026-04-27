import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const info = await prisma.$queryRaw<
    { db: string; schema: string }[]
  >`select current_database() as db, current_schema() as schema`;

  const cols = await prisma.$queryRaw<
    { column_name: string }[]
  >`select column_name from information_schema.columns where table_name = 'User' order by ordinal_position`;

  return NextResponse.json({ info, cols });
}