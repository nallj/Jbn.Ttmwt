import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Link } from "react-router-dom";

import Home from './Home/Home';
import Records from './Records';

const routeInfo = [
  {
    url: '/',
    text: 'Home',
    exact: true,
    //component: Home
    render: (props) => <Home {...props} />
  },
  {
    url: '/reports',
    text: 'Reports',
    //component: Records
    render: () => <Records />
  }
];

export const Routes = (props) => routeInfo.map(r => 
  <Route path={r.url} exact={r.exact} render={r.render.bind(this, props)} />
);

export const RouteNavLinks = () => routeInfo.map(r => (
  <li className="nav-item">
    <Link to={r.url} className="nav-link">{r.text}</Link>
  </li>
));
