import React, { Component } from 'react'
import Footer from '../components/shared/Footer'
import IdeaAportar from '../components/shared/IdeaAportar'
import { connect } from 'react-redux'
import axios from 'axios'

const Header = () => (
  <header className='pt-5'>
    {/* <div className="btn-back d-flex py-3 justify-content-center mt-3" onClick={window.history.back}>
      <i className="fas fa-arrow-left"></i>
      <p className="mb-0 ml-3 f-w-500">VOLVER</p>
    </div> */}
  </header>
)

const Article = (props) => {
  if(props.post.error == ''){
    return (
      <article>
        <p className="m-0 c-gris fnt-14 text-right text-uppercase f-w-500">{props.post.post.created_at}</p>
        <h2 className="my-3">{props.post.post.title}</h2>
        <div className="d-flex align-items-center mb-4">
          <div className="img-red mr-4 ml-2 back-gris rounded-circle"></div>
          <div className="d-flex flex-column">
            <p className="m-0 c-gris fnt-14 text-uppercase f-w-500">POR:</p>
            <p className="m-0 c-gris fnt-14 text-uppercase f-w-500">clemencia catalán comprador</p>
          </div>
        </div>
        <p>{props.post.post.body}</p>
  
        <div className="back-gris-claro c-pink d-flex align-items-center py-3 px-4 my-5">
          <h3 className="f-w-900 mb-0 mr-3">23</h3>
          <h4 className="f-w-300 mb-0">Personas han apoyado esta idea</h4>
        </div>
      </article>
    )
  }else{
    return (
      <article>
        <h1>{props.post.error}</h1>
      </article>
    )
  }

}

const Aside = () => (
  <aside className="col-md-5">
    <div className="d-flex back-gris-claro flex-column align-items-center justify-content-center py-6 px-4">
      <h4 className="f-w-300 text-center mb-4">¿Crees que esta idea es positiva para Mercado Público?</h4>
      <button className="btn btn-primary py-3 px-5 d-flex align-items-center">APOYAR IDEA
      <i className=" ml-2 far fa-thumbs-up fnt-24"></i>
      </button>
    </div>
    <div className="d-flex back-gris-claro flex-column justify-content-center py-5 px-4 mt-4">
      <h4 className="f-w-300 mb-2">Compartir idea</h4>
      <i className="far fa-envelope fnt-24 c-pink cursor-pointer"></i>
    </div>
  </aside>
)

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

const Main = (props) => {
  return (
    <section className="container">
      <div className="row justify-content-center py-3">
        <div className="col-md-7 d-flex flex-column">
          <Article post={props.post} />
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
        <Aside />
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

  componentWillUnmount(){
    this.props.clear()
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <Main post={this.props} />
          <Ideas />
          <IdeaAportar />
        </main>
        <Footer />
      </div>
    )
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
      let idPost = parseInt(ownProps.match.params.id);
      axios.get(`https://blog-api-u.herokuapp.com/v1/posts/${idPost}`)
        .then(res => {
          dispatch({ type: "GET_POST", data: res.data })
          dispatch({type:'CLEAR_ERROR_GET_POST'})
        })
        .catch(err => {
          console.log(err)
          dispatch({type: 'ERROR_GET_POST'})
        })
    },
    clear: () => {
      dispatch({type:'CLEAR_POST'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea)