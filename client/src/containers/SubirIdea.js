import React, { Component } from 'react'
import { connect } from 'react-redux'
import EnviarIdeaForm from '../components/forms/EnviarIdeaForm'
import axios from 'axios'
import { reset } from 'redux-form'


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

  componentWillMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <main>
        <h3>{this.props.mensaje}</h3>
        <Main props={this.props}/>
      </main>
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