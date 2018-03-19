import React, { Component } from 'react'
import { connect } from 'react-redux'
import EnviarIdeaForm from '../components/forms/EnviarIdeaForm'
import axios from 'axios'
import { reset } from 'redux-form'


const Main = (props) => {
  const funcionForma = (datos) => {
    let config = { 'Authorization': 'Token ' + props.props.login.token }
    axios.post('http://10.0.1.1:8000/ideas/post/',
      {
        name: datos.nombre,
        category: datos.categoria,
        content: datos.descripcion
      }
      , {
        headers: config
      }
    )
      .then(res => {
        props.props.creado()
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      })
      .catch(err => {
        //console.log(err)
        props.props.error()
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      })
  }
  return (
    <main>
      <section className="container pt-3">
        <EnviarIdeaForm onSubmit={funcionForma} categorias={props}/>
      </section>
    </main>
  )
}

class SubirIdea extends Component {

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.props.limpiarMensaje()
  }

  componentDidMount() { 

    const bloquearForm = (inp) => {
      if (inp.length > 1) {
        for (let i = 0; i < inp.length; i++) {
          const element = inp[i];
          element.setAttribute('disabled', 'true');
        }
      } else {
        inp['0'].setAttribute('disabled', 'true');
      }
    }

    if (this.props.login === null) {
      let inputs = document.getElementsByTagName('input');
      bloquearForm(inputs);
      let textarea = document.getElementsByTagName('textarea');
      bloquearForm(textarea);
      let select = document.getElementsByTagName('select');
      bloquearForm(select);
    }
  }

  render() {
    return (
      <main>
        <div className='container'>
          <div className='row justify-content-center'>
            <h3 className='c-pink mt-5 mensaje'>{this.props.mensaje}</h3>
          </div>
        </div>
        <Main props={this.props} />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    mensaje: state.creado,
    categorias: state.getCategorias
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creado: () => {
      dispatch({ type: 'CREATED_' })
      dispatch(reset('EnviarIdeaForm'))
    },
    error: () => {
      dispatch({ type: 'ERROR_CREATED_' })
    },
    getCategorias: () => {
      axios.get('http://10.0.1.1:8000/categories/')
        .then(res => {
          let opciones = res.data.results.map((opt) => {
            return (`<option value=${opt.pk} key=${opt.pk}>${opt.name}</option>`)
          })
          document.getElementsByName('categoria')['0'].innerHTML = opciones
          dispatch({type:'GET_CATEGORIAS',data: res.data.results})
        }
        )
        .catch(err => {
          //console.log(err)
        })
    },
    limpiarMensaje: () => {
      dispatch({type:'CLEAR_MENSAJE'})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SubirIdea);