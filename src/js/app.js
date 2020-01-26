import React from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

let routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={} />
        </Switch>
    </Router>
);

ReactDOM.render(routes, document.getElementsByTagName("main")[0]);