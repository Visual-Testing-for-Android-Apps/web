import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import ReportPage from "./reportPage/ReportPage";
import Navigation from "./navbar/Navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/reportpage">
          <ReportPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
