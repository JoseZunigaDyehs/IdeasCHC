import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SocialButton from './SocialButton'

const IdeaPrototipo =
  {
    "url": "",
    "pk": 0,
    "name": "",
    "created": "",
    "category": [{ "name": "" }],
    "votes": 0,
    "content": ""
  }

class ApoyarIdea extends Component {

  postApoyo = (post) => {
    console.log('EN APOYO POST ===> ', post);
  }

  //LOGIN
  handleSocialLogin = (user) => {
    this.props.logeo(user._profile);
    //ENVIAR USUARIO A DJANGO
    axios.post('http://')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
  }
  //FIN LOGIN

  render() {
    // console.log('propsssss => ', this.props);
    // debugger;
    // if(this.props.post.post.length === undefined){
    //   this.props.post.post = {IdeaPrototipo};
    // }
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
            <button className="btn btn-primary py-3 px-5 d-flex align-items-center" >APOYAR IDEA
        <i className=" ml-2 far fa-thumbs-up fnt-24"></i>
            </button>
          </div>
          {/* <div className="d-flex back-gris-claro flex-column justify-content-center py-5 px-4 mt-4">
            <h4 className="f-w-300 mb-2">Compartir idea</h4>
            <i className="far fa-envelope fnt-24 c-pink cursor-pointer"></i>
          </div> */}
        </aside>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

//ACCIONAR LOS DISPATCH, PASA UNA ACCION AL STORE
const mapDispatchToProps = (dispatch) => {
  return {
    apoyar: () => {
      axios.put('', {})
        .then(res => {

        })
        .catch(err => {

        })
    },
    logeo: (datos) => {
      dispatch({ type: 'LOGIN', data: datos })
    },
    errorLogin: (err) => {
      dispatch({ type: 'LOGIN_ERROR', data: err })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApoyarIdea);
