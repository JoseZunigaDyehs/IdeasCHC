import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../style.css'
import {connect} from 'react-redux'

import HomeContainer from './HomeContainer'
import Idea from './Idea'
import SubirIdea from './SubirIdea'
import Login from '../Initial/Login'

const Header = () => {
  return (
    <nav className='w-100 text-center'>
      {/* <div className="top"/> */}
      <div className='d-flex w-100 justify-content-between px-5 py-2 text-uppercase'>
        <Link to='/' className='c-white f-w-500 fnt-14 link-sec'>Home</Link>
        <Link to='/idea/:id' className='c-white f-w-500 fnt-14 link-sec'>Idea</Link>
        <Link to='/subir-idea' className='c-white f-w-500 fnt-14 link-sec'>Subir Idea</Link>
        <Link to='/login' className='c-white f-w-500 fnt-14 link-sec'>LOGIN</Link>
      </div>
    </nav>
  )
};

const App = (props) => {
  console.log(props.login);
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={HomeContainer} />
        <Route path='/idea/:id' component={Idea} />
        <Route path='/subir-idea' component={SubirIdea}/>
        <Route path='/login' component={Login} />
      </div>
    </Router>
  )
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
