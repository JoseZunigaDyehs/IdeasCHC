import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../style.css'
import logo from '../LogoMP2.png'
import { connect } from 'react-redux'

import HomeContainer from './HomeContainer'
import Idea from './Idea'
import SubirIdea from './SubirIdea'
import Login from '../Initial/Login'
import Singup from '../Initial/Signup'
import Footer from '../components/shared/Footer'
import LoginGoogle from '../Initial/LoginGoogle'
import Spinner from '../components/shared/Spinner'

const btnDisable = (event) => {

}

const Header = () => {
  return (
    <header className="container-fluid">
      <nav className='w-100 text-center text-uppercase px-5 py-3 d-flex'>
        <div className='nav d-flex w-100 justify-content-between align-items-center'>
          {/* <Link to='/singup' className='f-w-500 fnt-14 link-pri'>SING UP</Link> */}
          <Link to='#' className='f-w-500 fnt-12 link-pri disabled'>comparte tu Idea</Link>
          <Link to='/' id='home' className='img-nav'><img src={logo} alt="ChileCompra MercadoPúblico" /></Link>
          <Link to='/login' className='btn btn-primary f-w-500 fnt-12 d-flex align-items-center px-3 py-2'>INGRESAR</Link>
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
          <Link to='/cerrar-sesion' className='btn btn-primary f-w-500 fnt-12 d-flex align-items-center px-3 py-2'>SALIR</Link>
        </div>
      </nav>
    </header>
  )
}


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
          <Route path='/login' component={Login} />
          <Route path='/singup' component={Singup} />
          <Footer />
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <div>
          <Spinner />
          <Header />
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/ideas/:id' component={Idea} />
          <Route path='/subir-idea' component={SubirIdea} />
          <Route path='/login' component={Login} />
          <Route path='/singup' component={Singup} />
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
