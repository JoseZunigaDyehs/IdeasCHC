import React from 'react'
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
    case 1: //Plataforma
      clase = clase + 'bg-naranja'
      break;
    case 2: //Normativa ===== Innovacion
      clase = clase + 'bg-azul'
      break;
    case 3: //CM ====== Fomento Pymes
      clase = clase + 'bg-rosa'
      break;

    default:
      break;
  }

  return clase;

}

const Idea = ({ idea }) => {

  const ideaTitle = idea.name.substring(0, 100)

  let fecha = '06-06-2018'

  if (idea.created !== '') {
    fecha = fechaCorrecta(idea.created)
  }

  return (
    <div className="col-md-6 mb-4">
      <div className="dvIdea d-flex">
        <div className={pintarCategoria(idea.category.pk)}>
          <p className="m-0 text-uppercase"></p>
        </div>
        <div className="dvIdeaBody w-100 py-3 d-flex flex-column px-4 justify-content-between">
          <p className="mb-0 text-small text-uppercase text-right f-w-700 l-s-1 c-gris">{fecha}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-90 mb-1">
              <p className='fnt-14 f-w-700 text-uppercase'>{idea.category.name}</p>
              <p>{ideaTitle} </p>
            </div>
            <div className="d-flex c-gris align-items-center">
              <i className="far fa-thumbs-up mr-1"></i>
              <h5 className="f-w-900 mb-0">{idea.votes}</h5>
            </div>
          </div>
          <Link className="link-tri" to={`/ideas/${idea.pk}`} key={idea.pk}>
            Leer Más<i className="ml-2 fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Idea
