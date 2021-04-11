import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Service from './Service';
import UploadPage from './UploadPage';

function App(){
    return(
        <Router>
            <Switch>
                <Route path= "/service">
                    <Service />
                </Route>
                <Route path="/">
                    <UploadPage />
                </Route>
            </Switch>
    </Router>
    );
}


export default hot(module)(App);
