import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../style.css'
import { connect } from 'react-redux'

import HomeContainer from './HomeContainer'
import IdeaContainer from './IdeaContainer'
import SubirIdea from './SubirIdea'
import Footer from '../components/shared/Footer'

const Header = (props) => {

  return (
    <header className="container-fluid">
      <nav className='w-100 text-center text-uppercase px-5 py-3 d-flex'>
        <div className='nav d-flex w-100 justify-content-start align-items-center'>
          <Link to='/' className='f-w-500 fnt-12 mr-4 btn btn-secondary px-3 py-2'>ver Ideas</Link>
          <Link to='/subir-idea' className='f-w-500 fnt-12 btn btn-secondary px-3 py-2'>comparte tu Idea</Link>
        </div>
      </nav>
    </header>
  )
}


const HeaderLogeado = (props) => {

  return (
    <header className="container-fluid">
      <nav className='w-100 text-center text-uppercase px-5 py-3 d-flex'>
        <div className='nav d-flex w-100 justify-content-between align-items-center'>
          <div>
            <Link to='/' className='f-w-500 fnt-12 mr-4 btn btn-secondary px-3 py-2'>ver Ideas</Link>
            <Link to='/subir-idea' className='f-w-500 fnt-12 btn btn-secondary px-3 py-2'>comparte tu Idea</Link>
          </div>
          <div className='d-flex align-items-center'>
            <p className='m-0'>{props.props.login.name}</p>
            <a href='/' className='f-w-500 fnt-12 ml-4 btn btn-secondary px-3 py-2'>SALIR</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

const App = (props) => {
  if (props.login !== null) {
    return (
      <Router>
        <div>
          <HeaderLogeado props={props}/>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/ideas/:id' component={IdeaContainer} />
          <Route path='/subir-idea' component={SubirIdea} />
          <Footer />
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <div>
          <Header props={props} />
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/ideas/:id' component={IdeaContainer} />
          <Route path='/subir-idea' component={SubirIdea} />
          <Footer />
        </div>
      </Router>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logeo: (datos) => {
      dispatch({ type: 'LOGIN', data: datos })
    },
    errorLogin: (err) => {
      dispatch({ type: 'LOGIN_ERROR', data: err })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
