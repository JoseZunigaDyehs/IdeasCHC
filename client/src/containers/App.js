import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../style.css'
import HomeContainer from './HomeContainer'
import IdeaContainer from './IdeaContainer'
import SubirIdea from './SubirIdea'
import Footer from '../components/shared/Footer'

const Header = (props) => {

  let claseHome = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  let claseComparte = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  if(document.location.pathname==='/'){
    claseHome = 'f-w-500 fnt-12 mr-4 btn btn-primary'
  }else{
    claseComparte = 'f-w-500 fnt-12 mr-4 btn btn-primary'
  }

  return (
    <header className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light text-uppercase">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <Link to='/' className={claseHome}>ver Ideas</Link>
          <Link to='/subir-idea' className={claseComparte}>comparte tu Idea</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}


const HeaderLogeado = (props) => {

  let claseHome = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  let claseComparte = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  if(document.location.pathname==='/'){
    claseHome = 'f-w-500 fnt-12 mr-4 btn btn-primary'
  }else{
    claseComparte = 'f-w-500 fnt-12 mr-4 btn btn-primary'
  }

  return (
    <header className="container-fluid">
      <nav className='w-100 text-center text-uppercase py-3 d-flex'>
        <div className='nav d-flex w-100 justify-content-between align-items-center'>
          <div className='col-md-6 d-flex pl-0'>
            <Link to='/' className={claseHome}>ver Ideas</Link>
            <Link to='/subir-idea' className={claseComparte}>comparte tu Idea</Link>
          </div>
          <div className='d-flex align-items-center col-md-6 justify-content-end pr-0'>
            <p className='m-0 hide-cel'>{props.props.login.name}</p>
            <a href='/' className='f-w-500 fnt-12 ml-4 btn btn-secondary'>SALIR</a>
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
          <HeaderLogeado props={props} />
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
