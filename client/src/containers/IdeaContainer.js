import React, { Component } from 'react'
import IdeaAportar from '../components/shared/IdeaAportar'
import ApoyarIdea from '../components/ApoyarIdea'
import Idea from '../components/Idea'
import { connect } from 'react-redux'
import axios from 'axios'

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

const Article = (props) => {

  if (props.post.error === '') {
    let fecha = "";
    if (props.post.post.created !== undefined) { fecha = props.post.post.created.substring(0, 10); }

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

const Ideas = (props) => {

  if (props.props.post.pk !== undefined && props.props.ideas['0'] === undefined) {

    props.props.getPostsByCategoria(props.props.post.category.pk);
  }
  if (props.props.ideas['0'] === undefined) {
    props.props.ideas.concat(IdeaPrototipo);
  }
  
  return (
    <section className="container mb-5">
      <div className="text-center pt-3 pb-4">
        <h2>Otras ideas que podrían gustarte</h2>
      </div>
      <div className="row pt-3">
        {props.props.ideas.map(idea =>
          <Idea
            key={idea.pk}
            idea={idea}
            getPost={props.props.getPost}
            contador={props.props.contador}
          />
        )}
      </div>
    </section>
  )
}

// const Comentarios = () => (
//   <div>
//     <hr className="linea-black w-100" />
//     <div className="comentariosIdea mb-5">
//       <div className="d-flex my-3">
//         <h2>Comentarios</h2>
//         <h2 className="c-pink ml-3">(0)</h2>
//       </div>
//       <p>Regístrate o ingresa para ayudar a Clamencia Catalán a mejorar su propuesta.</p>
//       <textarea className="w-100" name="" id="" cols="30" rows="10"></textarea>
//       <div className="w-100 text-right">
//         <button className="btn btn-secondary py-3 px-5 mt-4 text-right">COMENTAR</button>
//       </div>
//     </div>
//   </div>

// )

const Main = (props) => {
  return (
    <section className="container pt-5">
      <div className="row justify-content-center py-3">
        <div className="col-md-7 d-flex flex-column">
          <Article post={props.post} />
        </div>
        <ApoyarIdea />
      </div>
      <hr className="linea-black" />
    </section>
  )
}

class IdeaContainer extends Component {

  componentDidMount = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentWillMount() {
    this.props.clear()
    this.props.clearPosts()
    this.props.getPost()
  }

  componentWillUnmount() {
    this.props.clear()
    this.props.clearPosts()
  }

  render() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (this.props.error === '') {
      return (
        <main>
          <Main post={this.props} />
          <Ideas props={this.props} />
          <IdeaAportar />
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

let contador = 0;

const mapStateToProps = (state) => {
  return {
    post: state.showPost,
    error: state.errorShowPost,
    ideas: state.allPost,
    contador: contador
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: (idPost) => {
      if(idPost===undefined){
        idPost = parseInt(ownProps.match.params.id, 10);
      }
      axios.get(`http://ideas.chilecompra.cl:8000/ideas/${idPost}`)
        .then(res => {
          dispatch({ type: "GET_POST", data: res.data })
          dispatch({ type: 'CLEAR_ERROR_GET_POST' })
        })
        .catch(err => {
          //console.log(err)
          dispatch({ type: 'ERROR_GET_POST' })
        })
    },
    clear: () => {
      dispatch({ type: 'CLEAR_POST' })
    },
    clearPosts: () => {
      dispatch({ type: 'DATA_CLEAR' })
    },
    getPostsByCategoria: (idCategoria) => {
      axios.get(`http://ideas.chilecompra.cl:8000/ideas/?category=${idCategoria}`)
        .then((res) => {
          dispatch({ type: "DATA_LOADER", data: res.data })
        })
        .catch((err) => {
          //console.log(err);
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeaContainer)