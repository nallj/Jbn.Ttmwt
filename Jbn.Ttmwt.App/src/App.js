import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './styles.css';
import { RouteNavLinks, Routes } from './routes';
import { ApiClient } from './api-client';

const routeNavLinks = RouteNavLinks();

class App extends Component {

  constructor() {
    super();

    this.apiClient = new ApiClient('http://localhost:55214');
    this.state = {
      errorOccured: false,
      error: 'An error has occured.  Please refresh the application.  If the error does not resolve, please contact the the Application Development department.',
      resources: {}
    };
    //this.apiClient.devices()
    //      .then(x => this.state.resources.devices = x);

    let routesParams = {
      apiClient: this.apiClient,
      events: {
        error: this.setErrorOccured.bind(this)
      }
    };
    this.routes = Routes.bind(this, routesParams); //, resources: this.state.resources });
  }

  setErrorOccured() {
    this.setState({ errorOccured: true });
  }



  render() {
    return (
      <Router history={browserHistory}>
        <div>

          <div id="error-overlay" className={this.state.errorOccured ? ' visible' : ''}>
            <p>{this.state.error}</p>
          </div>
          
          <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <h1 className="navbar-brand">Timed Ten Meter Walk Test</h1>
              <ul className="navbar-nav mr-auto">{routeNavLinks}</ul>
            </nav>
          </header>
          
          <main className={this.state.errorOccured ? 'error' : ''}>{this.routes()}</main>
        </div>
      </Router>
    );
  }
}
export default App;