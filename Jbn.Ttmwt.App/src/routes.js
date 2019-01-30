import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Home } from './Home';
import { Records } from './Records'

const App = () => (
  <Router history={browserHistory}>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/records">Records</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/records" component={Records} />
    </div>
  </Router>
)
ReactDOM.render(<App />, document.getElementById('root'));