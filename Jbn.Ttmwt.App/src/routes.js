import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Link } from "react-router-dom";

import Home from './Home';
import Records from './Records';

const dummyFn = () => false;
const routeInfo = [
  {
    url: '/',
    text: 'Home',
    exact: true,
    render: (props) => <Home {...props} />
  },
  { url: '/reports', text: 'Reports', component: Records }
];

export const Routes = (props) => routeInfo.map(r => 
  <Route path={r.url} exact={r.exact} component={r.component} render={(r.render || dummyFn).bind(this, props)} />
);

export const RouteNavLinks = () => routeInfo.map(r => (
  <li className="nav-item">
    <Link to={r.url} className="nav-link">{r.text}</Link>
  </li>
));
