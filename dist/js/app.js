import React from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Main from './main';

let routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={Main} />
        </Switch>
    </Router>
);

ReactDOM.render(routes, document.getElementsByTagName("main")[0]);