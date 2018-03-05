import React from 'react'
import LoginForm from './LoginForm'
import axios from 'axios'
import {connect} from 'react-redux'

const Login = (props) => {
  console.log(props);
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
    console.log(res.data)
    props.login(res.data)
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

const mapStateToProps = (state) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (datos)=>{
      console.log('datos',datos);
      dispatch({type:'LOGIN', data: datos})
    },
    errorLogin: (err)=>{
      dispatch({type:'LOGOUT', data: err})
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);