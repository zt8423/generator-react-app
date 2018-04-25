import React, {Component} from 'react';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';
import App from "./App";
import {RouterPath} from '../config/config';
import Home from './Home';

export default class AppRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path={RouterPath} component={App}>
          <IndexRoute component={Home}/>
        </Route>
      </Router>
    )
  }
}

