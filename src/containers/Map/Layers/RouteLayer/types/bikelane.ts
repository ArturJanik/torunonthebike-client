type Roadlane = 'south' | 'north' | 'east' | 'west';

export interface RawBikeLane {
    id: number;
    street: string;
    roadlane: Roadlane;
    name_from: string;
    name_to: string;
    points: string;
    type: number;
    surface: number;
    quality: number;
    visible: number;
    created_at: string;
    updated_at?: string;
}

export interface BikeLane {
  type: 'Feature';
  properties: {
    street: string;
    roadlane: Roadlane;
    nameFrom: string;
    nameTo: string;
    type: number;
    surface: number;
    quality: number;
  },
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  }
}
