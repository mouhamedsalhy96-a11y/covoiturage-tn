
import { Review } from "@/types/review";

export const reviews: Review[] = [
  {
    id: "r1",
    driverId: "d1",
    passengerName: "James",
    rating: 5,
    comment: "Very punctual and friendly driver.",
  },
  {
    id: "r2",
    driverId: "d1",
    passengerName: "Ali",
    rating: 4,
    comment: "Good trip and clean car.",
  },
  {
    id: "r3",
    driverId: "d2",
    passengerName: "Mia",
    rating: 5,
    comment: "Excellent communication and safe driving.",
  },
  {
    id: "r4",
    driverId: "d3",
    passengerName: "Noah",
    rating: 4,
    comment: "Smooth short trip, everything was clear.",
  },
];

export function getReviewsByDriverId(driverId: string) {
  return reviews.filter((review) => review.driverId === driverId);
}
