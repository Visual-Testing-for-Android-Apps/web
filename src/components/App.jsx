import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Service from './Service';

function App(){
    return(
        <Router>
            <div className="App">
                <h1>Hello World</h1></div>
            <Switch>
                <Route path= "/service">
                    <Service />
                </Route>
            </Switch>
    </Router>
    );
}


export default hot(module)(App);
