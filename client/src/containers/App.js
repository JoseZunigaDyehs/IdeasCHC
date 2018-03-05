import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../style.css'
import {connect} from 'react-redux'

import HomeContainer from './HomeContainer'
import Idea from './Idea'
import SubirIdea from './SubirIdea'
import Login from '../Initial/Login'
import Singup from '../Initial/Signup'

const Header = () => {
  return (
    <nav className='w-100 text-center'>
      <div className='d-flex w-100 justify-content-between px-5 py-2 text-uppercase'>
        <Link to='/' className='c-white f-w-500 fnt-14 link-sec'>Home</Link>
        <Link to='/idea/:id' className='c-white f-w-500 fnt-14 link-sec'>Idea</Link>
        <Link to='/singup' className='c-white f-w-500 fnt-14 link-sec'>SING UP</Link>
        <Link to='/login' className='c-white f-w-500 fnt-14 link-sec'>LOGIN</Link>
      </div>
    </nav>
  )
}

const HeaderLogeado = () => {
  return (
    <nav className='w-100 text-center'>
      <div className='d-flex w-100 justify-content-between px-5 py-2 text-uppercase'>
        <Link to='/' className='c-white f-w-500 fnt-14 link-sec'>Home</Link>
        <Link to='/idea/:id' className='c-white f-w-500 fnt-14 link-sec'>Idea</Link>
        <Link to='/subir-idea' className='c-white f-w-500 fnt-14 link-sec'>Subir Idea</Link>
        <Link to='/' className='c-white f-w-500 fnt-14 link-sec'>Cerrar sesion</Link>
      </div>
    </nav>
  )
}

const App = (props) => {

  if(props.login != null){
    return (
      <Router>
        <div>
          <HeaderLogeado />
          <Route exact path='/' component={HomeContainer} />
          <Route path='/idea/:id' component={Idea} />
          <Route path='/subir-idea' component={SubirIdea}/>
          <Route path='/login' component={Login} />
          <Route path='/singup' component={Singup} />
        </div>
      </Router>
    )
  }else{
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={HomeContainer} />
          <Route path='/idea/:id' component={Idea} />
          <Route path='/subir-idea' component={SubirIdea}/>
          <Route path='/login' component={Login} />
          <Route path='/singup' component={Singup} />
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
