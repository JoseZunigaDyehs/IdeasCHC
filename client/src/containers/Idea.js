import React, { Component } from 'react'
import IdeaAportar from '../components/shared/IdeaAportar'
import ApoyarIdea from '../components/ApoyarIdea'
import { connect } from 'react-redux'
import axios from 'axios'

const Article = (props) => {

  if (props.post.error === '') {
    let fecha = "";
    if(props.post.post.created !== undefined) {fecha = props.post.post.created.substring(0, 10);}

    return (
      <article>
        <p className="m-0 c-gris fnt-14 text-right text-uppercase f-w-500">{fecha}</p>
        <h2 className="my-3">{props.post.post.name}</h2>
        <div className="d-flex align-items-center mb-4">
          <div className="img-red mr-4 ml-2 back-gris rounded-circle"></div>
          <div className="d-flex flex-column">
            <p className="m-0 c-gris fnt-14 text-uppercase f-w-500">POR:</p>
            <p className="m-0 c-gris fnt-14 text-uppercase f-w-500">{props.post.post.owner}</p>
          </div>
        </div>
        <p>{props.post.post.content}</p>
        <div className="back-gris-claro c-pink d-flex align-items-center py-3 px-4 my-5">
          <h3 className="f-w-900 mb-0 mr-3">{props.post.post.votes}</h3>
          <h4 className="f-w-300 mb-0">Personas han apoyado esta idea</h4>
        </div>
      </article>
    )
  } else {
    return (
      <article className='pt-5 mt-5'>
        <h1>{props.post.error}</h1>
      </article>
    )
  }

}

const IdeaDiv = () => (
  <div className="col-md-6 mb-4">
    <div className="dvIdea d-flex">
      <div className="dvIdeaCategoria">
        <p className="m-0 text-uppercase">COMPRADORES</p>
      </div>
      <div className="dvIdeaBody w-100 py-3 d-flex flex-column px-4 justify-content-between">
        <p className="mb-0 text-small text-uppercase text-right">12 Febrero 2018</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="w-90 mb-1">Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un
          sitio mientras que mira su diseño. </p>
          <div className="d-flex c-gris align-items-center">
            <i className="far fa-thumbs-up mr-1"></i>
            <h5 className="f-w-900 mb-0">16</h5>
          </div>
        </div>
        <a href="idea.html" className="link-pri">Leer Más
        <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
)

const Ideas = () => (
  <section className="container mb-5">
    <div className="text-center pt-3 pb-4">
      <h2>Otras ideas que podrían gustarte</h2>
    </div>
    <div className="row pt-3">
      <IdeaDiv />
    </div>
  </section>
)

const Comentarios = () => (
  <div>
    <hr className="linea-black w-100" />
    <div className="comentariosIdea mb-5">
      <div className="d-flex my-3">
        <h2>Comentarios</h2>
        <h2 className="c-pink ml-3">(0)</h2>
      </div>
      <p>Regístrate o ingresa para ayudar a Clamencia Catalán a mejorar su propuesta.</p>
      <textarea className="w-100" name="" id="" cols="30" rows="10"></textarea>
      <div className="w-100 text-right">
        <button className="btn btn-secondary py-3 px-5 mt-4 text-right">COMENTAR</button>
      </div>
    </div>
  </div>

)

const Main = (props) => {
  return (
    <section className="container mt-2">
      <div className="row justify-content-center py-3">
        <div className="col-md-7 d-flex flex-column">
          <Article post={props.post} />
          {/* <Comentarios /> */}
        </div>
        {/* <ApoyarIdea post={props.post}/> */}
      </div>
      <hr className="linea-black" />
    </section>
  )
}

class Idea extends Component {

  componentDidMount() {
    this.props.getPost()
  }

  componentWillMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentWillUnmount() {
    this.props.clear()
  }

  render() {
    console.log('PROPS IDEA: ', this.props);
    if (this.props.error === '') {
      return (
        <main>
          <Main post={this.props} />
          <Ideas />
          <IdeaAportar/>
        </main>
      )
    } else {
      return (
        <main>
          <h1 className='mt-5 pt-5'>{this.props.error}</h1>
        </main>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    post: state.showPost,
    error: state.errorShowPost
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: () => {
      let idPost = parseInt(ownProps.match.params.id, 10);
      axios.get(`http://10.0.1.1:8000/ideas/${idPost}`)
        .then(res => {
          dispatch({ type: "GET_POST", data: res.data })
          dispatch({ type: 'CLEAR_ERROR_GET_POST' })
        })
        .catch(err => {
          console.log(err)
          dispatch({ type: 'ERROR_GET_POST' })
        })
    },
    clear: () => {
      dispatch({ type: 'CLEAR_POST' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea)