import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import TextLoop from "react-text-loop";
import { CloudinaryContext } from "cloudinary-react";

import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import HomePage from "./pages/HomePage/HomePage";
import TripDetails from "./pages/TripDetails/TripDetails";
import AddTrip from "./pages/AddTrip/AddTrip";
import AddExpense from "./pages/AddExpense/AddExpense";
import Statistics from "./pages/Statistics/Statistics";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  const FrontPage = () => {
    return (
      <CloudinaryContext cloudName="geekscloud">
        <div style={{ height: "700px" }} className="front">
          <h1 className="text">
            Travel wallet for
            <span style={{ paddingLeft: "5px", color: "#93b768" }}>
              <TextLoop
                interval={[3000, 1000]}
                children={["Backpackers", "Families", "nomads"]}
              />
            </span>
          </h1>
        </div>
      </CloudinaryContext>
    );
  };

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route path="/trip/statistics/:id" component={Statistics} />
        <Route path="/home/addtrip" component={AddTrip} />
        <Route path="/trip/addexpense" component={AddExpense} />
        <Route path="/trip/addexpense/:id" component={AddExpense} />
        <Route path="/home/:id" component={TripDetails} />
        <Route path="/home" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/" component={FrontPage} />
      </Switch>
    </div>
  );
}

export default App;
