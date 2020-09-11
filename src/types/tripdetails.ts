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

type User = {
  id: number;
  fullname: string;
};

export type Friend = {
  userId: number;
  tripId: number;
  user: User;
  trip: Trip;
};

export type ValueTypes = {
  title: string;
  amount: number;
  expenseType: number;
  spentBy: string;
  sharedBy: number[];
};

export type InitialValueTypes = {
  title: string;
  amount: number;
  expenseType: number;
  spentBy: string;
  sharedBy: number[];
};
