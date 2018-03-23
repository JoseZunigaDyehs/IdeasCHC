import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../style.css'
import HomeContainer from './HomeContainer'
import IdeaContainer from './IdeaContainer'
import SubirIdea from './SubirIdea'
import Spinner from '../components/shared/Spinner'
import Footer from '../components/shared/Footer'

const Header = (props) => {

  let claseHome = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  let claseComparte = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  if (document.location.pathname === '/') {
    claseHome = 'f-w-500 fnt-12 mr-4 btn btn-primary'
  } else {
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
            <Link to='/' className={claseHome} onClick={reiniciarMenu}>ver Ideas</Link>
            <Link to='/subir-idea' className={claseComparte} onClick={reiniciarMenu}>comparte tu Idea</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

const reiniciarMenu = () => {
  setTimeout(() => {
    if(document.getElementById('navbarNavAltMarkup').classList.contains('show')){
      document.getElementById('navbarNavAltMarkup').classList.remove('show')
      //document.getElementById('navbarNavAltMarkup').classList.remove('collapse')
    }
  }, 50);
}

const HeaderLogeado = (props) => {

  let claseHome = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  let claseComparte = 'f-w-500 fnt-12 mr-4 btn btn-secondary'
  if (document.location.pathname === '/') {
    claseHome = 'f-w-500 fnt-12 mr-4 btn btn-primary'
  } else {
    claseComparte = 'f-w-500 fnt-12 mr-4 btn btn-primary'
  }
  return (
    <header className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light text-uppercase">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav w-100 d-flex justify-content-between">
            <div>
              <Link to='/' className={claseHome} onClick={reiniciarMenu}>ver Ideas</Link>
              <Link to='/subir-idea' className={claseComparte} onClick={reiniciarMenu}>comparte tu Idea</Link>
            </div>
            <div className='d-flex align-items-center justify-content-end pr-0'>
              <p className='m-0 hide-cel mr-4'>{props.props.login.name}</p>
              <a className='link-pri f-w-500 fnt-12 btn btn-secondary' onClick={props.props.logout}>SALIR</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

// const logout = (props) => {
//   debugger
//   props.logout()
// }

const App = (props) => {
  if (props.login !== null) {
    return (
      <Router>
        <div>
        <Spinner props={props}/>
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
        <Spinner props={props}/>
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
    login: state.login,
    spinner: state.spinner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logeo: (datos) => {
      dispatch({ type: 'LOGIN', data: datos })
    },
    errorLogin: (err) => {
      dispatch({ type: 'LOGIN_ERROR', data: err })
    },
    logout: () => {
      dispatch({type:'LOGOUT'})
      dispatch({type: 'AUTOLOG_OFF'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
