
export type CityCoordinate = {
  lat: number;
  lng: number;
};

const cityCoordinates: Record<string, CityCoordinate> = {
  Manchester: { lat: 53.4808, lng: -2.2426 },
  Liverpool: { lat: 53.4084, lng: -2.9916 },
  London: { lat: 51.5072, lng: -0.1276 },
  Birmingham: { lat: 52.4862, lng: -1.8904 },
  Leeds: { lat: 53.8008, lng: -1.5491 },
  Sheffield: { lat: 53.3811, lng: -1.4701 },
  Ulverston: { lat: 54.1956, lng: -3.0963 },
};

export function getCityCoordinate(city: string) {
  return cityCoordinates[city] ?? null;
}
