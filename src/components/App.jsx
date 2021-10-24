import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import LiveJob from "./reportPage/LiveJob";
import BatchJob from "./reportPage/BatchJob";
import Navigation from "./navbar/Navigation";
import ReportPage from "./reportPage/ReportPage";
import BatchSubmitPage from "./reportPage/BatchSubmitPage";
import BatchReportPage from "./reportPage/BatchReportPage";
import PrivacyPolicyPage from "./mainPage/PrivacyPolicyPage";
import Footer from "./footer/Footer";
import AboutUsPage from "./mainPage/AboutUsPage";

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
        <Route path="/batchreportpage">
          <BatchReportPage />
        </Route>
        <Route path="/batchsubmitpage">
          <BatchSubmitPage />
        </Route>
        <Route path="/privacypolicypage">
          <PrivacyPolicyPage />
        </Route>
        <Route path="/aboutus">
          <AboutUsPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
