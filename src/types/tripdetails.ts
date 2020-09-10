export type Trip = {
  budget: number;
  image: string;
  title: string;
};

export type Trips = {
  id: number;
  trip: Trip;
  tripId: number;
  userId: number;
};

export type TripGroups = {
  tripId: number;
  n_tripId: number;
};

export interface DefaultGroup {
  [key: number]: number;
}
