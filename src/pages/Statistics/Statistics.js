import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import {
  fetchAllExpensesSummary,
  fetchAllExpenseTypes,
  fetchAllUserExpenses,
} from "../../store/AddExpense/actions";
import { selectExpenses } from "../../store/AddExpense/selector";
import "../TripDetails/Tripdetails.css";
import "./Statistics.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Statistics() {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const { expenseTypes } = useSelector(selectExpenses);
  const { expensesSummary } = useSelector(selectExpenses);
  const { userExpenses } = useSelector(selectExpenses);

  const [labelValues, setLabels] = useState([]);
  const [finalData, setFinalData] = useState({});
  const [dataValues, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchAllExpenseTypes(token));
    dispatch(fetchAllExpensesSummary(id, token));
    dispatch(fetchAllUserExpenses(id, token));
  }, [id]);

  useEffect(() => {
    const values = expensesSummary.map((e) => e.total_amount);
    const types = expensesSummary.map((e) => {
      return expenseTypes.find((type) => type.id === e.expensetypeId);
    });
    const titles = types.map((l) => l.title);
    setLabels(titles);
    setData(values);
  }, [expensesSummary]);

  useEffect(() => {
    setFinalData({
      labels: labelValues,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        },
      ],
    });
  }, [dataValues, labelValues]);

  console.log("userExpenses:", userExpenses);

  return (
    <div className="stats">
      <Container className="cont">
        <div className="piechart">
          <Pie data={finalData} />
        </div>
        <div className="statDetails">
          {userExpenses.length > 1 ? (
            <div>
              {userExpenses.map((user, i) => {
                return (
                  <Row className="row-detail" key={i}>
                    {/*  <Col>{user.user.fullname}</Col>
                    <Col>
                      {user.total < 0 ? (
                        <p>owes {user.total}</p>
                      ) : (
                        <p>Gets back {user.total} </p>
                      )}
                    </Col> */}
                    <p className="mx-5">{user.user.fullname}</p>
                    <p>
                      {user.total < 0 ? (
                        <p style={{ color: "red" }}>owes {user.total}</p>
                      ) : (
                        <p style={{ color: "green" }}>
                          Gets back {user.total}{" "}
                        </p>
                      )}
                    </p>
                  </Row>
                );
              })}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
