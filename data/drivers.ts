
export const drivers = [
  {
    id: "d1",
    name: "Ahmed",
    city: "Manchester",
    rating: 4.8,
    bio: "Friendly driver with regular trips between Manchester and nearby cities.",
    vehicle: "Blue Toyota Corolla",
  },
  {
    id: "d2",
    name: "Sara",
    city: "London",
    rating: 4.9,
    bio: "Experienced driver who often travels for work and shares empty seats.",
    vehicle: "White Honda Civic",
  },
  {
    id: "d3",
    name: "Omar",
    city: "Leeds",
    rating: 4.7,
    bio: "Calm and reliable driver for short and medium-distance journeys.",
    vehicle: "Grey Ford Focus",
  },
];

export function getDriverById(id: string) {
  return drivers.find((driver) => driver.id === id);
}
