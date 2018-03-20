import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const fechaCorrecta = (fecha) => {

  const nuevaFecha = fecha.substring(0, 10)
  const dia = nuevaFecha.substring(8, 10)
  let mes = nuevaFecha.substring(5, 7)
  const anio = nuevaFecha.substring(0, 4)

  switch (mes) {
    case '01':
      mes = 'ENERO';
      break;
    case '02':
      mes = 'FEBRERO';
      break;
    case '03':
      mes = 'MARZO';
      break;
    case '04':
      mes = 'ABRIL';
      break;
    case '05':
      mes = 'MAYO';
      break;
    case '06':
      mes = 'JUNIO';
      break;
    case '07':
      mes = 'JULIO';
      break;
    case '08':
      mes = 'AGOSTO';
      break;
    case '09':
      mes = 'SEPTIEMBRE';
      break;
    case '10':
      mes = 'OCTUBRE';
      break;
    case '11':
      mes = 'NOVIEMBRE';
      break;
    case '12':
      mes = 'DICIEMBRE';
      break;
    default:
  }

  return dia + ' ' + mes + ' ' + anio;

}

const pintarCategoria = (categoria) => {
  let clase = 'dvIdeaCategoria d-flex justify-content-center align-items-center ';
  switch (categoria) {
    case 2: //Plataforma
      clase = clase + 'bg-naranja'
      break;
    case 3: //Normativa ===== Innovacion
      clase = clase + 'bg-azul'
      break;
    case 1: //CM ====== Fomento Pymes
      clase = clase + 'bg-rosa'
      break;

    default:
      break;
  }

  return clase;

}

const getIdea = (e, props) => {
  if (props.getPost !== undefined && e !== undefined) {
    let idPost = e.target.pathname;
    let arrayIdPost = idPost.split('/');
    idPost = arrayIdPost[arrayIdPost.length - 1];
    idPost = parseInt(idPost)
    props.getPost(idPost)
  }
}
//const Idea = ({ idea }) => {
class Idea extends Component {

  render() {

    const ideaTitle = this.props.idea.name.substring(0, 90)

    let fecha = '06-06-2018'
    if (this.props.idea.created !== '') {
      fecha = fechaCorrecta(this.props.idea.created)

    }

    return (
      <div className="col-md-6 mb-4">
        <div className="dvIdea d-flex">
          <div className={pintarCategoria(this.props.idea.category.pk)}>
            <p className="m-0 text-uppercase"></p>
          </div>
          <div className="dvIdeaBody w-100 py-3 d-flex flex-column px-4 justify-content-between">
            <p className="mb-0 text-small text-uppercase text-right f-w-700 l-s-1 c-gris mb-2">{fecha}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="w-90 mb-1">
                <p className='fnt-14 f-w-700 text-uppercase'>{this.props.idea.category.name}</p>
                <p className='fnt-17'>{ideaTitle} </p>
              </div>
              <div className="d-flex c-gris align-items-center">
                <i className="far fa-thumbs-up mr-1"></i>
                <h5 className="f-w-900 mb-0">{this.props.idea.votes}</h5>
              </div>
            </div>
            <Link className="link-tri" to={`/ideas/${this.props.idea.pk}`} key={this.props.idea.pk} onClick={(e) => getIdea(e, this.props)}>
              Leer Más<i className="ml-2 fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea)
