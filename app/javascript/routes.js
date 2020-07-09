import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home/'
import Main from './pages/Main/'
import Profile from './pages/Profile'


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/app" exact component={Main} />
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  )
}
