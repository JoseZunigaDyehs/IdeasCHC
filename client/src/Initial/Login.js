import React from 'react';
import LoginForm from './LoginForm';

const Login = () => {
  const funcForm = (datos) =>{
    console.log(datos)
  }
  return (
      <div>
        <h2>Login</h2>
        <LoginForm onSubmit={funcForm}/>
      </div>
  )
};

export default Login;