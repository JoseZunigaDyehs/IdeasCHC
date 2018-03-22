import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SocialButton from './SocialButton'

class ApoyarIdea extends Component {

  postApoyo = (e, post) => {
    if (e !== undefined) {
      const token = this.props.login.token;
      this.props.apoyar(post, token, this.props.getPost, this.props.getVotoIdea,this.props.login.email);
    }
  }

  logear = (user) => {

    this.props.logeo(user, this.props.post.pk, this.props.getVotoIdea);
  }

  //LOGIN
  handleSocialLogin = (user) => {
    let config = {
      headers:
        {
          'Authorization': 'Token e5cec21fd7fdf6e5970bfb41b9e6a0cc6ca96693',
          'Content-Type': 'application/json'
        }
    }
    //ENVIAR USUARIO A DJANGO
    axios.post('https://ideas.chilecompra.cl:8000/users/', 
    {
      user: {
        username: user._profile.email,
        first_name: user._profile.firstName,
        last_name: user._profile.lastName,
        email: user._profile.email,
        password: user._profile.id
      },
      thumbnail: user._profile.profilePicURL
    },
      config
    )
      .then(res => {
        this.props.logeo(user, this.props.post.pk, this.props.getVotoIdea)
      })
      .catch(err => {
        if (err.response.data.user.username["0"] === 'Ya existe un usuario con este nombre.') {
          this.props.obtenerToken(user._profile,this.props.post.pk, this.props.getVotoIdea);
        } else {
          console.log(err);
        }
      });

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
                autoLogin={true}
                className='f-w-500 d-flex align-items-center py-3 px-5 btn btn-secondary'
              >
                INGRESAR
            </SocialButton>
            </div>
          </div>
        </aside>
      )
    } else {
      if (this.props.apoyo === 0 || this.props.apoyo === -1) {
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
      } else {
        return (
          <aside className="col-md-5" >
            <div className="d-flex back-gris-claro flex-column align-items-center justify-content-center py-6 px-4">
              <h4 className="f-w-300 text-center mb-4 c-pink">Ya has apoyado esta idea</h4><i className="c-pink ml-2 far fa-thumbs-up fnt-24"></i>
            </div>
          </aside>
        )
      }
    }
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login,
    post: state.showPost,
    apoyo: state.apoyo
  }
}

//ACCIONAR LOS DISPATCH, PASA UNA ACCION AL STORE
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: (idPost) => {
      if (idPost === undefined) {
        idPost = parseInt(ownProps.match.params.id, 10);
      }
      axios.get(`https://ideas.chilecompra.cl:8000/ideas/${idPost}`)
        .then(res => {
          dispatch({ type: "GET_POST", data: res.data })
          dispatch({ type: 'CLEAR_ERROR_GET_POST' })
          dispatch({type:'DATA_CLEAR'})
        })
        .catch(err => {
          console.log(err)
          dispatch({ type: 'ERROR_GET_POST' })
        })
    },
    apoyar: (post, token, getPost, getVoto, user) => {
      let config = { 'Authorization': 'Token ' + token }
      axios.post('https://ideas.chilecompra.cl:8000/votes/post/',
        {
          idea: post.pk
        }
        , {
          headers: config
        }
      )
        .then(res => {
          if (res.statusText === "Created") {
            post.votes = post.votes + 1
            dispatch({ type: "GET_POST", data: post })
            
            getVoto(post.pk, user)
            getPost(post.pk)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    logeo: (datos, idPost, getVoto) => {
      let config = {
        headers:
          {
            'Authorization': 'Token e5cec21fd7fdf6e5970bfb41b9e6a0cc6ca96693',
            'Content-Type': 'application/json'
          }
      }
      axios.post('https://ideas.chilecompra.cl:8000/obtain-auth-token/',
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
          console.log(err);
        })
    },
    obtenerToken: (datos) => {
      let config = {
        headers:
          {
            'Authorization': 'Token e5cec21fd7fdf6e5970bfb41b9e6a0cc6ca96693',
            'Content-Type': 'application/json'
          }
      }
      axios.post('https://ideas.chilecompra.cl:8000/obtain-auth-token/',
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
          console.log(err);
        })
    },
    errorLogin: (err) => {
      dispatch({ type: 'LOGIN_ERROR', data: err })
    },
    getVotoIdea: (_ideaId, _userId) => {
      
      let ideaId = parseInt(_ideaId)
      axios.post('https://ideas.chilecompra.cl:8000/votes/ideapost/',
        { idea: ideaId, user: _userId }
      )
        .then(res => {
          dispatch({ type: 'GET_APOYO', data: res.data })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApoyarIdea);
