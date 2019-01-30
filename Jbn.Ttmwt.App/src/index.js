import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route } from 'react-router';
import { browserHistory, BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Home } from './Home';
import { Records } from './Records';
import { ApiClient } from './api-client';


//const Home = () => <h2>Home</h2>;
//const Records = () => <h2>About</h2>;


//const App = () => (
//    <div>
//        <h1>Hello world!!</h1>
//    </div>
//)
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