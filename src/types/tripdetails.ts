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

export type ExpenseValueTypes = {
  title: string;
  amount: number;
  expenseType: number;
  spentBy: string;
  sharedBy: number[];
};

export type TripValueTypes = {
  title: string;
  amount: number;
};

export type FriendTypes = {
  id: number;
  email: string;
  fullname: string;
};
