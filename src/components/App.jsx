import React, {useEffect} from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { loadReCaptcha } from 'react-recaptcha-v3';

import Service from './Service';
import UploadPage from './UploadPage';

function App(){
    // Created hook to load recaptcha
    useEffect(() => {
        loadReCaptcha("6Ld8T6oaAAAAAAiXL5GN6HdNsHGHHBXxJ3eVPkUn");
    })

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
