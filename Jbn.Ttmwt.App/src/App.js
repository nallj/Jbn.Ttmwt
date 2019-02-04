import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './styles.css';
import { RouteNavLinks, Routes } from './routes';
import { ApiClient } from './api-client';

const routeNavLinks = RouteNavLinks();
const routes = Routes();

class App extends Component {
  
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <h1 className="navbar-brand">Timed Ten Meter Walk Test</h1>
              <ul className="navbar-nav mr-auto">{routeNavLinks}</ul>
            </nav>
          </header>

          <main>{routes}</main>
        </div>
      </Router>
    );
  }
}
export default App;