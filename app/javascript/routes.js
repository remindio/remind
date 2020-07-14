import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Main from './pages/Main/'
import Profile from './pages/Profile'


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  )
}
