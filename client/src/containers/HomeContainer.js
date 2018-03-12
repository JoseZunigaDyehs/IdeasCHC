import React, { Component } from 'react'
import IdeasHomeContainer from './IdeasHomeContainer'
import IdeaAportar from '../components/shared/IdeaAportar'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'

const TextoMain = () => (
  <div className='container'>
    <div className='row justify-content-center'>
      <div className="d-flex flex-column col-md-7 text-center pt-5">
        <h1>¿Tienes una idea para mejorar Mercado Público?</h1>
        <p>Te proponemos un espacio de conversación sobre mejoras e ideas para que juntos, podamos mejorar la forma de comprar y vender en el Estado.</p>
      </div>
    </div>
  </div>
)

const Estadisticas = (props) => {
  return (
    <section>
      <hr className="linea-black" />
      <div className="container">
        <div className="row justify-content-center py-3">
          <div className="col-md-3 col-6">
            <p className="mb-0">TOTAL PARTICIPANTES</p>
            <p className="f-w-900 mb-0">{props.props.countUsers}</p>
          </div>
          <div className="col-md-2 col-6">
            <p className="mb-0">IDEAS ACTIVAS</p>
            <p className="f-w-900 mb-0">{props.props.countIdeas}</p>
          </div>
        </div>
        <BotonPublicar login={props.login} />
      </div>
      <hr className="linea-black" />
    </section>
  )
}

const BotonPublicar = (props) => {
  if (props.login != null) {
    return (
      <div className="text-center pb-3">
        <Link to='subir-idea' className="btn btn-secondary px-5 py-3">
          PUBLICAR UNA IDEA
       <i className="ml-2 fas fa-arrow-right"></i>
        </Link>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const Categorias = () => (
  <section className="container my-5">
    <h2 className="text-center mb-4">Revisar ideas por categoría</h2>
    <div className="row">
      <div className="col-md-6 mt-2 col-sm-6 col-lg-3">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">compradores</h5>
        </div>
      </div>
      <div className="col-md-6 mt-2 col-sm-6 col-lg-3">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">pagos</h5>
        </div>
      </div>
      <div className="col-md-6 mt-2 col-sm-6 col-lg-3">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">proveedores</h5>
        </div>
      </div>
      <div className="col-md-6 mt-2 col-sm-6 col-lg-3">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">convenio marco</h5>
        </div>
      </div>
    </div>
  </section>
)

class HomeContainer extends Component {

  componentWillMount() {
    this.props.getCountIdeas()
    this.props.getCountUsers()
  }

  render() {
    return (
      <main>
        <TextoMain />
        <Estadisticas props={this.props} />
        <IdeasHomeContainer />
        <IdeaAportar />
      </main >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    countIdeas: state.countIdeas,
    countUsers: state.countUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountIdeas: () => {
      axios.get('http://10.0.1.1:8000/ideas/count/')
        .then(res => {
          dispatch({ type: 'COUNT_IDEAS', data: res.data.ideas_count })
        })
        .catch(err => {
          console.log(err);
        })
    },
    clear: () => {
      dispatch('CLEAR_COUNT_IDEAS')
      dispatch('CLEAR_COUNT_USERS')
    },
    getCountUsers: () => {
      axios.get('http://10.0.1.1:8000/users/count/')
        .then(res => {
          dispatch({ type: 'COUNT_USERS', data: res.data.users_count })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)