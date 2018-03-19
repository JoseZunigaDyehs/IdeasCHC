import React, { Component } from 'react'
import IdeasHomeContainer from './IdeasHomeContainer'
import IdeaAportar from '../components/shared/IdeaAportar'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'

const TextoMain = () => (
  <div className='container pt-5'>
    <div className='row justify-content-center'>
      <div className="d-flex flex-column col-md-8 text-center pt-5">
        <h1 className='mb-4'>¿Tienes una idea para mejorar Mercado Público?</h1>
        <p className='mb-4'>Te proponemos un espacio de conversación sobre mejoras e ideas para que juntos, podamos mejorar la forma de comprar y vender en el Estado.</p>
      </div>
    </div>
  </div>
)

const MostrarEstadisticas = (numero, num, id) => {
  if (document.getElementById(id) !== null) {
    setTimeout(() => {
      if (num === numero) {
        document.getElementById(id).textContent = num;
      } else {
        num = num + 1;
        if (document.getElementById(id) === null) {
          return false;
        } else {
          document.getElementById(id).textContent = num;
          MostrarEstadisticas(numero, num, id);
        }
      }
    }, 100);
  }
}


const Estadisticas = (props) => {
  return (
    <div className="container pb-5">
      <div className="row justify-content-center py-3">
        <div className="col-md-4 col-6 c-pink text-center">
          <h5 className="mb-0">TOTAL PARTICIPANTES</h5>
          <h3 className="f-w-900 mb-0" id='totalParticipantes'>0</h3>

        </div>
        <div className="col-md-4 col-6 c-pink text-center">
          <h5 className="mb-0">IDEAS COMPARTIDAS</h5>
          <h3 className="f-w-900 mb-0" id='totalIdeas'>0</h3>

        </div>
      </div>
      <div className='row justify-content-center my-3 mb-5'>
        <Link to='/subir-idea' className="btn btn-primary py-3 px-4">
          COMPARTIR IDEA
                <i className="ml-2 fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  )
}

const Mensaje = () => (
  <section className='container-fluid gradient-gris c-white'>
    <div className='row justify-content-center py-3'>
      <div className='col-12 d-flex justify-content-center '>
        <h2 className='m-0 py-5'>Cuando todos aportamos, el resultado es mejor</h2>
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
        <hr class='linea-black'/>
        {/* <Mensaje /> */}
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
      axios.get('http://ideas.chilecompra.cl:8000/ideas/count/')
        .then(res => {
          dispatch({ type: 'COUNT_IDEAS', data: res.data.ideas_count })
          MostrarEstadisticas(res.data.ideas_count, 0, 'totalIdeas')
        })
        .catch(err => {
          //console.log(err);
        })
    },
    clear: () => {
      dispatch({ type: 'CLEAR_COUNT_IDEAS' })
      dispatch({ type: 'CLEAR_COUNT_USERS' })
    },
    getCountUsers: () => {
      axios.get('http://ideas.chilecompra.cl:8000/users/count/')
        .then(res => {
          dispatch({ type: 'COUNT_USERS', data: res.data.users_count })
          MostrarEstadisticas(res.data.users_count, 0, 'totalParticipantes')
        })
        .catch(err => {
//console.log(err);
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)