import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../style.css'
import logo from '../LogoMP2.png'
import { connect } from 'react-redux'

import HomeContainer from './HomeContainer'
import Idea from './Idea'
import SubirIdea from './SubirIdea'
import Footer from '../components/shared/Footer'
import Spinner from '../components/shared/Spinner'
import SocialButton from '../components/SocialButton'

const Header = (props) => {
  
  const handleSocialLogin = (user) => {
    props.props.logeo(user._profile);
  }

  return (
    <header className="container-fluid">
      <nav className='w-100 text-center text-uppercase px-5 py-3 d-flex'>
        <div className='nav d-flex w-100 justify-content-between align-items-center'>
          {/* <Link to='/singup' className='f-w-500 fnt-14 link-pri'>SING UP</Link> */}
          <Link to='#' className='f-w-500 fnt-12 link-pri disabled'>comparte tu Idea</Link>
          <Link to='/' id='home' className='img-nav'><img src={logo} alt="ChileCompra MercadoPúblico" /></Link>
          <SocialButton
            provider='google'
            appId='178848131764-l6f61h1flr9rkqsilspj2ipc0bp00f1t.apps.googleusercontent.com'
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            className='btn btn-primary f-w-500 fnt-12 d-flex align-items-center px-3 py-2'
          >
            INGRESAR
          </SocialButton>
        </div>
      </nav>
    </header>
  )
}


const HeaderLogeado = () => {

  return (
    <header className="container-fluid">
      <nav className='w-100 text-center text-uppercase px-5 py-3 d-flex'>
        <div className='nav d-flex w-100 justify-content-between align-items-center'>
          {/* <Link to='/singup' className='f-w-500 fnt-14 link-pri'>SING UP</Link> */}
          <Link to='/subir-idea' className='f-w-500 fnt-12 link-pri' >comparte tu Idea</Link>
          <Link to='/' id='home' className='img-nav'><img src={logo} alt="ChileCompra MercadoPúblico" /></Link>
          <a href='/' className='btn btn-primary f-w-500 fnt-12 d-flex align-items-center px-3 py-2'>SALIR</a>
        </div>
      </nav>
    </header>
  )
}

//LOGIN

const handleSocialLoginFailure = (err) => {
  console.error(err)
}
// FIN LOGIN

const App = (props) => {
  if (props.login != null) {
    return (
      <Router>
        <div>
          <Spinner />
          <HeaderLogeado />
          <Route exact path='/' component={HomeContainer} />
          <Route path='/ideas/:id' component={Idea} />
          <Route path='/subir-idea' component={SubirIdea} />
          <Footer />
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <div>
          <Spinner />
          <Header props={props}/>
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/ideas/:id' component={Idea} />
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
