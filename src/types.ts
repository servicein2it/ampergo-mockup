export type ScreenId =
  | "F1.1"
  | "F1.2"
  | "F1.3"
  | "F1.4"
  | "F1.5"
  | "F1.6"
  | "F1.7"
  | "F1.8"
  | "F2.1"
  | "F2.2"
  | "F2.3"
  | "F2.4"
  | "F2.5"
  | "F3.1"
  | "F3.2"
  | "F3.3"
  | "F3.4"
  | "F3.5"
  | "F3.6"
  | "F4.1"
  | "F4.2"
  | "F4.3"
  | "F4.4"
  | "F4.5"
  | "F4.6"
  | "F4.7"
  | "F4.8";

export type Lang = "EN" | "TH";

export type RouteOutcome = "GREEN" | "YELLOW" | "RED";

export type TripSegment =
  | {
      kind: "drive";
      from: string;
      to: string;
      distanceKm: number;
      energyKwh: number;
      timeMin: number;
      socStart: number;
      socEnd: number;
      whPerKm: number;
      elev: string;
    }
  | {
      kind: "charge";
      station: string;
      network: string;
      networkColor: string;
      powerKw: number;
      addedKwh: number;
      timeMin: number;
      costThb: number;
      socStart: number;
      socEnd: number;
      isP2P?: boolean;
    };

export type Station = {
  id: string;
  name: string;
  network: string;
  networkColor: string;
  distanceKm: number;
  power: string;
  pricePerKwh: number;
  rating: number;
  reviews: number;
  available: number;
  total: number;
  connectors: { type: string; powerKw: number; count: number }[];
  isP2P?: boolean;
  hostName?: string;
};
