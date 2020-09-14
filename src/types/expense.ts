import { NumberLocale } from "yup";

export type ExpenseTypes = {
  id: number;
  title: string;
};

export type ExpenseSummaryTypes = {
  expensetypeId: number;
  total_amount: number;
};

export type User = {
  fullname: string;
  email: string;
};

export type UserExpensesTypes = {
  total: number;
  user: User;
};

export type Colorstypes = {
  data: number[];
  backgroundColor: string[];
};

export type FinalDataTypes = {
  labels: (string | undefined)[];
  datasets: Colorstypes[];
};

export interface RouteParams {
  id: string;
}

export type TypesExpenses = {
  amount: number;
  expensetypeId: number;
  id: number;
  title: string;
  tripId: number;
};
