import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import LiveJob from "./reportPage/LiveJob";
import BatchJob from "./reportPage/BatchJob";
import Navigation from "./navbar/Navigation";
import ReportPage from "./reportPage/ReportPage";
import BatchSubmitPage from "./reportPage/BatchSubmitPage";
import PrivacyPolicyPage from "./mainPage/PrivacyPolicyPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/livejob">
          <LiveJob />
        </Route>
        <Route path="/batchjob">
          <BatchJob />
        </Route>
        <Route path="/reportpage">
          <ReportPage />
        </Route>
        <Route path="/batchsubmitpage">
          <BatchSubmitPage />
        </Route>
        <Route path="/privacypolicypage">
          <PrivacyPolicyPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
