
import { Review } from "@/types/review";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{review.passengerName}</h3>
      <p style={{ marginBottom: "8px" }}>Rating: {review.rating}/5</p>
      <p>{review.comment}</p>
    </div>
  );
}
