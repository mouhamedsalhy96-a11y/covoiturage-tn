
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const drivers = await prisma.user.findMany({
    where: {
      role: "DRIVER",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(drivers);
}
