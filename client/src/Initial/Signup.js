import React from 'react'
import SignupFormFinal from './SignupFormFinal'
import axios from 'axios'
import {connect} from 'react-redux'
import {reset} from 'redux-form'

const Signup = (props) => {
  const funcionForma = (datos) => {
    console.log(datos)
    axios.post('https://blog-api-u.herokuapp.com/users',{
      user: {
        name: datos.username,
        email: datos.email,
        password: datos.password,
        password_confirmation: datos.password_confirmation
      }
    }
  )
    .then((res)=>{
      props.success();
    })
    .catch((err)=>{
      props.error();
    })
  }

  return (
      <div>
        <h2>Sing up</h2>
        <h5>{props.mensaje}</h5>
        <SignupFormFinal onSubmit={funcionForma}/>
      </div>
  )
};

const mapStateToProps = (state)=>{
  return {
    mensaje: state.statusUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    success: () => {
      dispatch({type:'USER_CREATED'})
      dispatch(reset('SignupFormFinal'))
    },
    error: () => {
      dispatch({type:'USER_ERROR'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);