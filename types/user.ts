
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
  role: "Passenger" | "Driver" | "Both";
};
