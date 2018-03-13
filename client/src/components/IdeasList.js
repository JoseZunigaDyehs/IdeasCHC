import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Idea from './Idea'

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


class IdeasList extends Component {

  filtrarIdeas = (event) => {
    let idCategoria = event.target.dataset.cat
    idCategoria = parseInt(idCategoria, 10)
    if (idCategoria === 0) {
      this.props.getAllPosts()
    } else {
      this.props.getPostsByCategoria(idCategoria)
    }
  }

  cargarMas = (event) => {
    this.props.cargarMas(this.props.paginador);
  }

  componentWillUnmount() {
    this.props.limpiarPaginador();
  }

  render() {
    if (this.props.ideas['0'] === undefined) {
      this.props.ideas.concat(IdeaPrototipo);
    }

    return (
      <section className='py-4'>
        <div className="container mb-4">
          <div className='col-md-12 justify-content-center d-flex'>
            <h2 id='tituloIdeas' className='mb-4'>Te invitamos a apoyar ideas en las siguientes áreas</h2>
          </div>
          <div className='col-12 d-flex'>
            <div className='d-flex align-items-center mr-2 filtros py-2 px-3 my-3 todas' data-cat='0' onClick={this.filtrarIdeas.bind(this)}>
              <p className='fnt-14' data-cat='0' onClick={this.filtrarIdeas.bind(this)}>TODAS</p>
            </div>
            <div className='d-flex align-items-center mr-2 filtros py-2 px-3 my-3 fomento' data-cat='1' onClick={this.filtrarIdeas.bind(this)}>
              <p className='fnt-14' data-cat='1' onClick={this.filtrarIdeas.bind(this)}>FOMENTO A LAS PYMES</p>
            </div>
            <div className='d-flex align-items-center mr-2 filtros py-2 px-3 my-3 mejoras' data-cat='3' onClick={this.filtrarIdeas.bind(this)}>
              <p className='fnt-14' data-cat='3' onClick={this.filtrarIdeas.bind(this)}>MEJORAS A MERCADO PÚBLICO</p>
            </div>
            <div className='d-flex align-items-center mr-2 filtros py-2 px-3 my-3 ideas' data-cat='2' onClick={this.filtrarIdeas.bind(this)}>
              <p className='fnt-14' data-cat='2' onClick={this.filtrarIdeas.bind(this)}>IDEAS INNOVADORAS</p>
            </div>
          </div>
          <div className="row pt-3">

            {this.props.ideas.map(idea =>
              <Idea
                key={idea.pk}
                idea={idea}
              />
            )}
          </div>
          <div className="col-md-12 text-center">

            <button className="btn btn-secondary mt-3 py-3 px-4" onClick={this.cargarMas.bind(this)}> + CARGAR MÁS IDEAS</button>
          </div>
        </div>
      </section>
    )
  }
}


const limpiarActivos = (idCategoria) => {
  let activos = document.getElementsByClassName('active');
  for (let i = 0; i < activos.length; i++) {
    const active = activos[i];
    active.classList.remove('active');
  }
  document.querySelectorAll(`[data-cat="${idCategoria}"]`)['0'].classList.add('active')
}

//LOGICA PARA CARGAR POR CATEGORIA
const urlPaginadorCategoria = (cantidad) => {
  let activos = document.getElementsByClassName('active')
  let categoria = activos['0'].dataset.cat
  categoria = parseInt(categoria)
  let url = `http://10.0.1.1:8000/ideas/?limit=4&offset=${cantidad}`
  if (categoria !== 0) {
    url = `http://10.0.1.1:8000/ideas/?category=${categoria}&limit=4&offset=${cantidad}`
  }
  return url
}

const mapStateToProps = (state) => {
  return {
    paginador: state.paginador
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsByCategoria: (idCategoria) => {
      axios.get(`http://10.0.1.1:8000/ideas/?category=${idCategoria}`)
        .then((res) => {
          dispatch({ type: "DATA_CLEAR" })
          dispatch({ type: "DATA_LOADER", data: res.data })
          limpiarActivos(idCategoria)
          dispatch({ type: 'CLEAR_PAGINADOR' })
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getAllPosts: () => {
      axios.get(`http://10.0.1.1:8000/ideas/`)
        .then((res) => {
          dispatch({ type: "DATA_CLEAR" });
          dispatch({ type: "DATA_LOADER", data: res.data });
          limpiarActivos(0);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    cargarMas: (cantidad) => {
      cantidad = cantidad + 4 //SE AUMENTA EL PAGINADOR EN 4
      dispatch({ type: 'PAGINADOR', data: cantidad })
      const url = urlPaginadorCategoria(cantidad)
      axios.get(url)
        .then(res => {
          dispatch({ type: "DATA_LOADER", data: res.data })
        })
        .catch(err => {
          console.log(err);
        })
    },
    limpiarPaginador: () => {
      dispatch({ type: 'CLEAR_PAGINADOR' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasList)
