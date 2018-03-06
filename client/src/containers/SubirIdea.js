import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../components/shared/Footer'
import EnviarIdeaForm from '../components/forms/EnviarIdeaForm'
import axios from 'axios'
import { reset } from 'redux-form'

const Header = () => (
  <header className='pt-5'>
    {/* <div className="btn-back d-flex py-3 justify-content-center mt-3" onClick={window.history.back}>
      <i className="fas fa-arrow-left"></i>
      <p className="mb-0 ml-3 f-w-500">VOLVER</p>
    </div> */}
  </header>
)

const Main = (props) => {
  console.log(props);
  const funcionForma = (datos) => {
    let config = {'Authorization': 'Bearer' + props.props.login.jwt }
    axios.post('https://blog-api-u.herokuapp.com/v1/posts',
      {
        post: {
          title: datos.nombre,
          body:datos.descripcion
        }
      }
      ,{
        headers: config
      }
    )
      .then(res=>{
        console.log(res)
        props.props.creado()
      })
      .catch(err=>{
        console.log(err)
        props.props.error()
      })
  }
  return (
    <main>
      <section className="container">
        <EnviarIdeaForm onSubmit={funcionForma} />
      </section>
    </main>
  )
}

class SubirIdea extends Component {

  render() {
    return (
      <div>
        <Header />
        <h3>{this.props.mensaje}</h3>
        <Main props={this.props}/>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    mensaje : state.creado
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creado: ()=>{
      dispatch({type: 'CREATED_'})
      dispatch(reset('EnviarIdeaForm'))
    },
    error: () => {
      dispatch({type: 'ERROR_CREATED_'})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SubirIdea);