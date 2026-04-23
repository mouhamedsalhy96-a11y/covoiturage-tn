
"use client";

import "leaflet/dist/leaflet.css";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";

type TripMapProps = {
  fromCity: string;
  toCity: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  pickupPoint?: string | null;
};

const pickupIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: #15803d;
      border: 3px solid white;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.12);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function TripMap({
  fromCity,
  toCity,
  fromLat,
  fromLng,
  toLat,
  toLng,
  pickupPoint,
}: TripMapProps) {
  const centerLat = (fromLat + toLat) / 2;
  const centerLng = (fromLng + toLng) / 2;

  const routePoints: [number, number][] = [
    [fromLat, fromLng],
    [toLat, toLng],
  ];

  return (
    <div className="map-card">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={7}
        scrollWheelZoom={false}
        className="trip-map"
      >
        <TileLayer
          attribution={"© OpenStreetMap contributors"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={[fromLat, fromLng]}
          radius={10}
          pathOptions={{ color: "#2563eb" }}
        >
          <Popup>Departure: {fromCity}</Popup>
        </CircleMarker>

        <CircleMarker
          center={[toLat, toLng]}
          radius={10}
          pathOptions={{ color: "#dc2626" }}
        >
          <Popup>Destination: {toCity}</Popup>
        </CircleMarker>

        {pickupPoint ? (
          <Marker position={[fromLat, fromLng]} icon={pickupIcon}>
            <Popup>Pickup point: {pickupPoint}</Popup>
          </Marker>
        ) : null}

        <Polyline
          positions={routePoints}
          pathOptions={{ color: "#2563eb", weight: 4 }}
        />
      </MapContainer>

      <div className="map-caption">
        This map currently uses city-level coordinates for the trip route. In a
        later phase, this can be upgraded to exact geocoded pickup and destination
        points with live routing.
      </div>
    </div>
  );
}
``
