'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Home } from './Home';
import { Records } from './Records'

const RouteInfo = [
  { url: '/', text: 'Home', component: Home, exact: true },
  { url: '/reports', text: 'Reports', component: Records }
];

export const Routes = () => RouteInfo.map(r =>
  <Route path={r.url} exact={r.exact} component={r.component} />
);

export const RouteNavLinks = () => RouteInfo.map(r =>
  <li className="nav-item">
    <Link to={r.url} className="nav-link">{r.text}</Link>
  </li>
);
