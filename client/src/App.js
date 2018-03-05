import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './style.css'

import HomeContainer from './containers/HomeContainer'
import Idea from './containers/Idea'
import SubirIdea from './containers/SubirIdea'

// import NoMatch from './components/shared/NoMatch' 

const Header = () => {
  return (
    <nav className='w-100 text-center'>
      {/* <div className="top"/> */}
      <div className='d-flex w-100 justify-content-between px-5 py-2 text-uppercase'>
        <Link to='/' className='c-white f-w-500 fnt-14'>Home</Link>
        <Link to='/idea/:id' className='c-white f-w-500 fnt-14'>Idea</Link>
        <Link to='/subir-idea' className='c-white f-w-500 fnt-14'>Subir Idea</Link>
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
