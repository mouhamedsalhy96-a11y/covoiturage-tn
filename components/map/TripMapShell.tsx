
"use client";

import dynamic from "next/dynamic";

type TripMapShellProps = {
  fromCity: string;
  toCity: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  pickupPoint?: string | null;
};

const TripMap = dynamic(() => import("@/components/map/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="map-card">
      <div
        className="trip-map"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          background: "#f8fafc",
        }}
      >
        Loading map...
      </div>
    </div>
  ),
});

export default function TripMapShell(props: TripMapShellProps) {
  return <TripMap {...props} />;
}
