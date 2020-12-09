import React from 'react'
import { Provider } from 'react-redux'
import store from './state'
import Home from './components/Home/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Paper from './components/Paper/index'
import Navbar from './components/Navbar'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
        <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/paper'>
            <Paper />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
