import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home/'
import SignUp from './pages/SignUp/'
import SignIn from './pages/SignIn/'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route  path="/" exact component={Home} />
        <Route  path="/login" component={SignIn}/>
        <Route  path="/signup" component={SignUp}/>
      </Switch>
    </Router>
  )
}
