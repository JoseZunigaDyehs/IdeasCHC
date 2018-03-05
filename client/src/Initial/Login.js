import React from 'react';
import LoginForm from './LoginForm';
import axios from 'axios'

const Login = () => {
  const funcForm = (datos) =>{
    console.log(datos)
    axios.post('https://blog-api-u.herokuapp.com/v1/login',{
      login: {
        email: datos.email,
        password:datos.password
      }
    }
  )
  .then((res)=>{
    console.log(res.data);
  })
  .catch(err=>{
    console.log(err);
  })
  }
  return (
      <div>
        <h2>Login</h2>
        <LoginForm onSubmit={funcForm}/>
      </div>
  )
};

export default Login;