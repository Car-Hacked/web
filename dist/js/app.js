import React from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import About from "./about";
import Skills from "./skills";
import Projects from "./projects";

let routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={About} />
            <Route path="/About" component={About} />
            <Route path="/Skills" component={Skills} />
            <Route path="/Projects" component={Projects} />
        </Switch>
    </Router>
);

ReactDOM.render(routes, document.getElementsByTagName("main")[0]);