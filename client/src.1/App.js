import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Initial/Home';
import Login from './Initial/Login';
import Signup from './Initial/Signup';

const Header = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Login</Link>
    </nav>
  )
};

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
      </div>
    </Router>
  )
};

export default App;
