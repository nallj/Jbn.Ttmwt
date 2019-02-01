'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route } from 'react-router';
import { browserHistory, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './styles.css';
import { RouteNavLinks, Routes } from './routes';
import { ApiClient } from './api-client';

const routeNavLinks = RouteNavLinks();
const routes = Routes();

const App = () => (
  <Router history={browserHistory}>
    <div className="bg-light">

      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <h1 className="navbar-brand">Timed Ten Minute Walk Test</h1>
          <ul className="navbar-nav mr-auto">{routeNavLinks}</ul>
        </nav>
      </header>

      <main>{routes}</main>

    </div>
  </Router>  
)
ReactDOM.render(<App />, document.getElementById('root'));