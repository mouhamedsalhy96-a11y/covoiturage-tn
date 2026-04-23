
import { User } from "@/types/user";

type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "24px",
        maxWidth: "760px",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>{user.name}</h2>

      <p style={{ marginBottom: "8px" }}>
        <strong>Email:</strong> {user.email}
      </p>

      <p style={{ marginBottom: "8px" }}>
        <strong>Phone:</strong> {user.phone}
      </p>

      <p style={{ marginBottom: "8px" }}>
        <strong>City:</strong> {user.city}
      </p>

      <p style={{ marginBottom: "8px" }}>
        <strong>Role:</strong> {user.role}
      </p>

      <p style={{ marginTop: "16px" }}>
        <strong>Bio:</strong> {user.bio}
      </p>
    </div>
  );
}
