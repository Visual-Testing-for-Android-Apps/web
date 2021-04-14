import React from "react";
require("./style.css");
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Service from './Service';
import UploadPage from './UploadPage';
import FileUpload from './FileUpload'
function App(){
    return(
        <Router>
            <Switch>
                <Route exact path="/">

                    <FileUpload />
                </Route>
                <Route path= "/service">
                    <Service />
                </Route>
            </Switch>
    </Router>
    );
}


export default hot(module)(App);
