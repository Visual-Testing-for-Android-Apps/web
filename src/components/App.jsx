import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import ReportPage from "./reportPage/ReportPage";
import LiveJob from "./reportPage/LiveJob";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/reportpage">
          <ReportPage />
        </Route>
        <Route exact path="/livejob">
          <LiveJob />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
