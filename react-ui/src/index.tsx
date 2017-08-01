import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import registerServiceWorker from './registerServiceWorker';
import './index.css';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const BasicExample = () => (
  <Router basename='/agent/'>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><a href="/">Back to the root of the site</a></li>
      </ul>

      <hr />

      <Route exact path="/" component={App} />
      <Route path="/about" component={About} />
    </div>
  </Router>
)

ReactDOM.render(
  <BasicExample />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

console.log('hello')