import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './style.css'

import Home from './containers/Home'
import Idea from './containers/Idea'
import SubirIdea from './containers/SubirIdea'

// import NoMatch from './components/shared/NoMatch' 

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/idea/:id' component={Idea} />
        <Route path='/subir-idea' component={SubirIdea} />
      </Switch>
    </Router>
  )
}

export default App