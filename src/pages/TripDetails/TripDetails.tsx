import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExpensesofTrip,
  deleteExpenseDetails,
} from "../../store/AddExpense/actions";
import { selectToken } from "../../store/user/selectors";
import { selectExpenses } from "../../store/AddExpense/selector";
import Container from "react-bootstrap/Container";
import {
  Fastfood,
  Flight,
  ShoppingCart,
  House,
  Notes,
  Delete,
} from "@material-ui/icons";
import { TripUsersType } from "../../types/tripdetails";
import { TypesExpenses } from "../../types/expense";

import "./Tripdetails.css";
import { fetchAllUsersforTrip } from "../../store/Homepage/actions";
import { selectUsersofTrips } from "../../store/Homepage/selector";
import { selectNewTrip } from "../../store/Addtrip/selectors";

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { expenses }: { expenses: TypesExpenses[] } = useSelector(
    selectExpenses
  );
  const [total, setTotal] = useState(0);
  const [budget, setBudget] = useState(0);
  const history = useHistory();
  const { trip } = useSelector(selectNewTrip);
  const tripUsers: TripUsersType[] = useSelector(selectUsersofTrips);

  console.log("tripUsers:", tripUsers);

  useEffect(() => {
    dispatch(fetchAllExpensesofTrip(id, token));
    dispatch(fetchAllUsersforTrip(id, token));
  }, [id]);

  const deleteExpense = (id: number) => {
    dispatch(deleteExpenseDetails(id));
  };

  useEffect(() => {
    const amount = expenses.reduce(function (acc, obj) {
      return acc + obj.amount;
    }, 0);
    setTotal(amount); //Total amount spent so far
    if (expenses.length) {
      console.log("trip:", trip);
    }
  }, [expenses]);

  useEffect(() => {
    if (tripUsers.length !== 0) {
      setBudget(tripUsers[0].trip.budget); //Trip budget
    }
  }, [tripUsers]);

  console.log("expenses:", expenses);
  console.log("total:", total);
  console.log("budget:", budget);

  return (
    <div className="expense">
      <Container className="cont bg-dark ">
        <div className="card text-white bg-dark text-center">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Expenses
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/trip/statistics/${id}`}>
                  Statistics
                </Link>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <h2 className="card-title">Trip Expenses</h2>
            <p className="mx-3" style={{ textAlign: "center" }}>
              {" "}
              Budget: € {budget}{" "}
              <span className="mx-3">Amount Spent: € {total}</span>
            </p>
            <div className="mt-5">
              <div
                className="card text-white bg-dark"
                style={{ borderStyle: "none" }}
              >
                <ul className="list-group list-group-flush">
                  {expenses.map((expense, i) => {
                    return (
                      <div key={i} className="list-item">
                        {expense.expensetypeId === 1 ? (
                          <Fastfood />
                        ) : expense.expensetypeId === 2 ? (
                          <Flight />
                        ) : expense.expensetypeId === 3 ? (
                          <House />
                        ) : expense.expensetypeId === 4 ? (
                          <ShoppingCart />
                        ) : (
                          <Notes />
                        )}
                        <li className="list-inline-item">{expense.title}</li>
                        <li className="list-inline-item">€ {expense.amount}</li>
                        {/*                         <button
                          className="list-buttons"
                          onClick={() => deleteExpense(expense.id)}
                        >
                          <Delete />
                        </button> */}
                        <Delete onClick={() => deleteExpense(expense.id)} />
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="card-footer">
            Add Expense
            <button
              onClick={() => history.push("/trip/addexpense")}
              style={{ marginRight: "100px" }}
              type="button"
              className="btn btn-primary btn-circle btn-md"
            >
              <strong style={{ fontSize: "2em" }}>+</strong>
            </button>
            <button
              style={{ marginLeft: "70px" }}
              onClick={() => history.push(`/trip/statistics/${id}`)}
              className="btn btn-primary"
            >
              See Statistics
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
