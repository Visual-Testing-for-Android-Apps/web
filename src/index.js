import React from "react";
import ReactDom from "react-dom";
// Necessary import to support async/await
import "regenerator-runtime/runtime";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./components/App";
import "./index.css";

ReactDom.render(<App />, document.getElementById("root"));
