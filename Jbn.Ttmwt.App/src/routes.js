import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Link } from "react-router-dom";

import Home from './Home/Home';
import Records from './Records/Records';

const routeInfo = [
  {
    url: '/',
    text: 'Home',
    exact: true,
    //component: Home
    render: (props) => <Home {...props} />
  },
  {
    url: '/records',
    text: 'Records',
    //component: Records
    render: (props) => <Records {...props} />
  }
];

export const Routes = (props) => routeInfo.map(r => 
  <Route key={r.url} path={r.url} exact={r.exact} render={r.render.bind(this, props)} />
);

export const RouteNavLinks = () => routeInfo.map(r => (
  <li className="nav-item" key={r.url}>
    <Link to={r.url} className="nav-link">{r.text}</Link>
  </li>
));
