import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SocialButton from './SocialButton'

class ApoyarIdea extends Component {

  postApoyo = (e, post) => {
    if (e !== undefined) {
      const token = this.props.login.token;
      this.props.apoyar(post, token);
    }
  }

  //LOGIN
  handleSocialLogin = (user) => {
    this.props.logeo(user._profile);
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
  }
  //FIN LOGIN

  render() {
    if (this.props.login === null) {
      return (
        <aside className="col-md-5" >
          <div className='py-5 px-4 back-gris-claro d-flex flex-column justify-content-center align-content-center'>
            <h3>Para poder apoyar una idea, debes ingresar tu cuenta de Google</h3>
            <p>Ingrese su usuario en este link</p>
            <div className='mt-4 mb-3 d-flex justify-content-center'>
              <SocialButton
                provider='google'
                appId='178848131764-l6f61h1flr9rkqsilspj2ipc0bp00f1t.apps.googleusercontent.com'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
                className='f-w-500 d-flex align-items-center py-3 px-5 btn btn-secondary'
              >
                INGRESAR
            </SocialButton>
            </div>
          </div>
        </aside>
      )
    } else {
      return (
        <aside className="col-md-5" >
          <div className="d-flex back-gris-claro flex-column align-items-center justify-content-center py-6 px-4">
            <h4 className="f-w-300 text-center mb-4">¿Crees que esta idea es positiva para Mercado Público?</h4>
            <button className="btn btn-primary py-3 px-5 d-flex align-items-center" onClick={(e) => this.postApoyo(e, this.props.post)}>APOYAR IDEA
        <i className=" ml-2 far fa-thumbs-up fnt-24"></i>
            </button>
          </div>
        </aside>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login,
    post: state.showPost
  }
}

//ACCIONAR LOS DISPATCH, PASA UNA ACCION AL STORE
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    apoyar: (post, token) => {
      let config = { 'Authorization': 'Token ' + token }
      axios.post('http://ideas.chilecompra.cl:8000/votes/post/',
        {
          idea: post.pk
        }
        , {
          headers: config
        }
      )
        .then(res => {
          if (res.statusText === "Created") {
            alert('apoyo agregado')
            dispatch({ type: "GET_POST", data: post })
          }
        })
        .catch(err => {
          //console.log(err)
        })
    },
    logeo: (datos) => {
      let config = {
        headers:
          {
            'Authorization': 'Token 38890ba9756ef71480a23109641fe1dc7dec6afb',
            'Content-Type': 'application/json'
          }
      }
      axios.post('http://ideas.chilecompra.cl:8000/obtain-auth-token/',
        {
          username: datos.email,
          password: datos.id
        },
        config
      )
        .then(res => {
          datos.token = res.data.token;
          dispatch({ type: 'LOGIN', data: datos })
        })
        .catch(err => {
          //console.log(err);
        })
    },
    obtenerToken: (datos) => {
      let config = {
        headers:
          {
            'Authorization': 'Token 38890ba9756ef71480a23109641fe1dc7dec6afb',
            'Content-Type': 'application/json'
          }
      }
      axios.post('http://ideas.chilecompra.cl:8000/obtain-auth-token/',
        {
          username: datos.email,
          password: datos.id
        },
        config
      )
        .then(res => {
          datos.token = res.data.token;
          dispatch({ type: 'LOGIN', data: datos })
        })
        .catch(err => {
          //console.log(err);
        })
    },
    errorLogin: (err) => {
      dispatch({ type: 'LOGIN_ERROR', data: err })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApoyarIdea);
