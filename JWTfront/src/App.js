'use strict'

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './screens/Login/Login'
import Posts from './screens/Posts/Posts'

import logo from './logo.svg'
import './css/App.css'
import './css/Posts.css'

const App = props => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/posts' component={Posts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
