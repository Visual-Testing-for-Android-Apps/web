import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import ReportPage from "./reportPage/ReportPage";
import LiveJob from "./reportPage/LiveJob";
import BatchJob from "./reportPage/BatchJob";

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
        <Route path="/livejob">
          <LiveJob />
          </Route>

        <Route path="/batchjob">
        <BatchJob/>
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
