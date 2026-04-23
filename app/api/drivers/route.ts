
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const drivers = await prisma.user.findMany({
    where: {
      OR: [
        { role: "DRIVER" },
        { role: "Driver" },
        { role: "BOTH" },
        { role: "Both" },
        { role: "Passenger and Driver" },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(drivers);
}
