import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import '../style.css'

import HomeContainer from './HomeContainer'
import Idea from './Idea'
import SubirIdea from './SubirIdea'
import Login from '../Initial/Login'

// import NoMatch from './components/shared/NoMatch' 

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

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={HomeContainer} />
        <Route path='/idea/:id' component={Idea} />
        <Route path='/subir-idea' component={SubirIdea} />
        <Route path='/login' component={Login} />
      </div>
    </Router>
  )
}

export default App

// import Home from './Initial/Home';
// import Login from './Initial/Login';
// import Signup from './Initial/Signup';

// const Header = () => {
//   return (
//     <nav>
//       <Link to='/'>Home</Link>
//       <Link to='/signup'>Sign Up</Link>
//       <Link to='/login'>Login</Link>
//     </nav>
//   )
// };

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Route exact path='/' component={Home}/>
//         <Route path='/login' component={Login}/>
//         <Route path='/signup' component={Signup}/>
//       </div>
//     </Router>
//   )
// };

// export default App;
