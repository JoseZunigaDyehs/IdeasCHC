import React, { Component } from 'react'
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

class ApoyarIdea extends Component {

  postApoyo = (post) => {
    console.log('EN APOYO POST ===> ',post);
  }

  render() {
    console.log('propsssss => ', this.props);
    debugger;
    if(this.props.post.post.length === undefined){
      this.props.post.post = {IdeaPrototipo};
    }

    return (
      <aside className="col-md-5" >
        <div className="d-flex back-gris-claro flex-column align-items-center justify-content-center py-6 px-4">
          <h4 className="f-w-300 text-center mb-4">¿Crees que esta idea es positiva para Mercado Público?</h4>
          <button className="btn btn-primary py-3 px-5 d-flex align-items-center" onClick={this.postApoyo(this.props.post.post).bind(this)}>APOYAR IDEA
      <i className=" ml-2 far fa-thumbs-up fnt-24"></i>
          </button>
        </div>
        <div className="d-flex back-gris-claro flex-column justify-content-center py-5 px-4 mt-4">
          <h4 className="f-w-300 mb-2">Compartir idea</h4>
          <i className="far fa-envelope fnt-24 c-pink cursor-pointer"></i>
        </div>
      </aside>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

//ACCIONAR LOS DISPATCH, PASA UNA ACCION AL STORE
const mapDispatchToProps = (dispatch) => {
  return {
    apoyar: () => {
      axios.put('',{})
      .then( res => {

      })
      .catch( err => {

      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApoyarIdea);
