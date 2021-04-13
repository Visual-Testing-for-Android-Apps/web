import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Service from './Service';
import UploadPage from './UploadPage';

function App(){
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <UploadPage />
                </Route>
                <Route path= "/service">
                    <Service />
                </Route>
            </Switch>
    </Router>
    );
}


export default hot(module)(App);
