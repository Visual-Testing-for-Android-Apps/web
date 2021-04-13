import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Service from './Service';
import UploadPage from './UploadPage';
import InputBox from './InputBox';

function App(){
    return(

        <Router>
            <Switch>
                <Route path= "/service">
                    <Service />
                </Route>
                
                <Route path="/">
                    <UploadPage />
                    <InputBox />
                </Route>
            </Switch>
    </Router>
    
    );
}


export default hot(module)(App);
