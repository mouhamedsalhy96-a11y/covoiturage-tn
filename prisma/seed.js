
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  await prisma.message.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  const passenger = await prisma.user.create({
    data: {
      name: "Mohamed",
      email: "mohamed@example.com",
      passwordHash,
      city: "Manchester",
      bio: "I use the platform as a passenger and sometimes as a driver.",
      role: "BOTH",
    },
  });

  const driver1 = await prisma.user.create({
    data: {
      name: "Ahmed",
      email: "ahmed@example.com",
      passwordHash,
      city: "Manchester",
      bio: "Friendly driver with regular trips.",
      role: "DRIVER",
    },
  });

  const driver2 = await prisma.user.create({
    data: {
      name: "Sara",
      email: "sara@example.com",
      passwordHash,
      city: "London",
      bio: "Experienced driver who shares empty seats.",
      role: "DRIVER",
    },
  });

  const driver3 = await prisma.user.create({
    data: {
      name: "Omar",
      email: "omar@example.com",
      passwordHash,
      city: "Leeds",
      bio: "Reliable driver for medium-distance trips.",
      role: "DRIVER",
    },
  });

  const trip1 = await prisma.trip.create({
    data: {
      fromCity: "Manchester",
      toCity: "Liverpool",
      date: "2026-04-20",
      time: "09:00",
      price: 15,
      seats: 3,
      pickupPoint: "Manchester Piccadilly Station",
      luggage: "1 small suitcase",
      notes: "Please arrive 10 minutes before departure.",
      driverId: driver1.id,
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      fromCity: "London",
      toCity: "Birmingham",
      date: "2026-04-21",
      time: "14:30",
      price: 20,
      seats: 2,
      pickupPoint: "King's Cross Station entrance",
      luggage: "1 medium bag",
      notes: "No smoking in the car.",
      driverId: driver2.id,
    },
  });

  const trip3 = await prisma.trip.create({
    data: {
      fromCity: "Leeds",
      toCity: "Sheffield",
      date: "2026-04-22",
      time: "08:15",
      price: 10,
      seats: 4,
      pickupPoint: "Leeds City Bus Station",
      luggage: "Backpack only",
      notes: "Morning trip, please be on time.",
      driverId: driver3.id,
    },
  });

  await prisma.booking.createMany({
    data: [
      {
        passengerName: passenger.name,
        passengerEmail: passenger.email,
        seatsBooked: 1,
        totalPrice: 15,
        status: "Confirmed",
        tripId: trip1.id,
        passengerId: passenger.id,
      },
      {
        passengerName: passenger.name,
        passengerEmail: passenger.email,
        seatsBooked: 2,
        totalPrice: 40,
        status: "Pending",
        tripId: trip2.id,
        passengerId: passenger.id,
      },
      {
        passengerName: passenger.name,
        passengerEmail: passenger.email,
        seatsBooked: 1,
        totalPrice: 10,
        status: "Cancelled",
        tripId: trip3.id,
        passengerId: passenger.id,
      },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        passengerName: "James",
        rating: 5,
        comment: "Very punctual and friendly driver.",
        driverId: driver1.id,
        tripId: trip1.id,
      },
      {
        passengerName: "Ali",
        rating: 4,
        comment: "Good trip and clean car.",
        driverId: driver1.id,
        tripId: trip1.id,
      },
      {
        passengerName: "Mia",
        rating: 5,
        comment: "Excellent communication and safe driving.",
        driverId: driver2.id,
        tripId: trip2.id,
      },
      {
        passengerName: "Noah",
        rating: 4,
        comment: "Smooth short trip, everything was clear.",
        driverId: driver3.id,
        tripId: trip3.id,
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        sender: "Ahmed",
        text: "Hello, is the pickup point near the station?",
        tripId: trip1.id,
      },
      {
        sender: "You",
        text: "Yes, pickup is outside the main entrance.",
        tripId: trip1.id,
      },
      {
        sender: "Sara",
        text: "I have booked 2 seats. Thank you!",
        tripId: trip2.id,
      },
      {
        sender: "Omar",
        text: "Can I bring one small suitcase?",
        tripId: trip3.id,
      },
    ],
  });

  console.log("Database seeded successfully.");
  console.log("Demo accounts:");
  console.log("mohamed@example.com / password123");
  console.log("ahmed@example.com / password123");
  console.log("sara@example.com / password123");
  console.log("omar@example.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
``
