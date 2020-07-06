import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import {
  fetchAllExpensesSummary,
  fetchAllExpenseTypes,
  fetchAllUserExpenses,
} from "../../store/AddExpense/actions";
import { selectExpenses } from "../../store/AddExpense/selector";
import "../TripDetails/Tripdetails.css";
import "./Statistics.css";
import Row from "react-bootstrap/Row";
import { createEmail } from "../../store/Email/action";
import { selectEmailResponse } from "../../store/Email/selector";

export default function Statistics() {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const { expenseTypes } = useSelector(selectExpenses);
  const { expensesSummary } = useSelector(selectExpenses);
  const { userExpenses } = useSelector(selectExpenses);
  const { fullname } = useSelector(selectUser);
  const [labelValues, setLabels] = useState([]);
  const [finalData, setFinalData] = useState({});
  const [dataValues, setData] = useState([]);
  const { msg } = useSelector(selectEmailResponse);

  useEffect(() => {
    dispatch(fetchAllExpenseTypes(token));
    dispatch(fetchAllExpensesSummary(id, token));
    dispatch(fetchAllUserExpenses(id, token));
  }, [id]);

  useEffect(() => {
    console.log("expensesSummary:", expensesSummary);
    const values = expensesSummary.map((e) => e.total_amount);
    const types = expensesSummary.map((e) => {
      return expenseTypes.find((type) => type.id === e.expensetypeId);
    });
    console.log("types:", types);
    if (types[0] !== undefined) {
      const titles = types.map((l) => l.title);
      setLabels(titles);
      setData(values);
    }
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

  const sendEmail = () => {
    const emailIds = userExpenses.map((u) => u.user.email);

    const message = `
    Hi,

    Here is the summary of the trip:

    ${userExpenses.map(
      (u) => `
    ${u.user.fullname} ${
        u.total < 0 ? `owes ${u.total * -1}` : `gets back ${u.total}`
      }`
    )}

    Regards,
    TravelGeeks
    `;

    dispatch(createEmail(fullname, message, emailIds, token));
  };
  console.log("userExpenses:", userExpenses);

  return (
    <div className="stats">
      <Container className="cont">
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <Link className="nav-link" to={`/home/${id}`}>
                  Expenses
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Statistics
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {expensesSummary.length !== 0 ? (
              <h5 className="card-title">Statistics of the Trip</h5>
            ) : (
              <h5 className="card-title">No Expenses for the trip </h5>
            )}

            <div className="piechart">
              <Pie data={finalData} />
            </div>
            {/*             <div className="statDetails">
              {userExpenses.length > 1 ? (
                <div>
                  {userExpenses.map((user, i) => {
                    return (
                      <Row className="row-detail" key={i}>
                        <p className="mx-5">{user.user.fullname}</p>
                        <div>
                          {user.total < 0 ? (
                            <p style={{ color: "red" }}>
                              owes € {user.total * -1}
                            </p>
                          ) : (
                            <p style={{ color: "green" }}>
                              Gets back € {user.total}{" "}
                            </p>
                          )}
                        </div>
                      </Row>
                    );
                  })}
                  <button onClick={sendEmail}>Send Email</button>
                </div>
              ) : null}
            </div> */}
            <div className="card-body">
              <div className="mt-5">
                <div className="card" style={{ borderStyle: "none" }}>
                  {userExpenses.length > 1 ? (
                    <ul
                      className="list-group list-group-flush"
                      style={{ fontWeight: "bold" }}
                    >
                      {userExpenses.map((user, i) => {
                        return (
                          <div key={i} className="list-item">
                            <li className="list-inline-item">
                              {user.user.fullname}
                            </li>
                            <li className="list-inline-item">
                              {user.total < 0 ? (
                                <p style={{ color: "red" }}>
                                  owes € {user.total * -1}
                                </p>
                              ) : (
                                <p style={{ color: "green" }}>
                                  Gets back € {user.total}{" "}
                                </p>
                              )}
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  ) : null}
                  <button
                    onClick={sendEmail}
                    className="btn btn-primary"
                    style={{
                      width: "15%",
                      marginLeft: "43%",
                      marginTop: "20px",
                    }}
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
