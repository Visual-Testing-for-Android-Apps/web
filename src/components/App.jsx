import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "./MainPage";
import Service from './Service';
import Navbar from './Navbar'
import "./navbar.css"

function App(){
    return(
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route path= "/service">
                    <Service />
                </Route>
            </Switch>
    </Router>
    );
}


export default hot(module)(App);
