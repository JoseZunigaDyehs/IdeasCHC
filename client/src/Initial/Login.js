import React from 'react'
import LoginForm from './LoginForm'
import axios from 'axios'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

const Login = (props) => {
  const funcionForm = (datos) => {
    //console.log('object');

    axios.post('https://blog-api-u.herokuapp.com/v1/login', {
      login: {
        email: datos.email,
        password: datos.password
      }
    }
    )
      .then((res) => {
        //console.log(res.data)
        props.login(res.data)
        let linkHome = document.getElementById('home')
        let evObj = document.createEvent('Events');
        evObj.initEvent('click', true, false);
        linkHome.dispatchEvent(evObj);
      })
      .catch(err => {
        //console.log(err)
        props.errorLogin(err)
      })
  }
  return (
    <div>
      <h2>Login</h2>
      {props.mensaje}
      <LoginForm onSubmit={funcionForm} />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    mensaje: state.statusUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (datos) => {
      dispatch({ type: 'LOGIN', data: datos })
      dispatch(reset('LoginForm'))
    },
    errorLogin: (err) => {
      dispatch({ type: 'LOGIN_ERROR', data: err })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);