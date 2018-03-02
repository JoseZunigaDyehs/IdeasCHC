import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Estadisticas from '../components/Estadisticas'
import Ideas from '../components/Ideas'
import Categorias from '../components/Categorias'
import IdeaAportar from '../components/IdeaAportar'

class Home extends Component {
  
  componentDidMount = () => {
    this.props.getAllPosts();
  };

  componentWillUnmount() {
    this.props.clear();
  }

  //Funciones
  allPosts = () => {
    const Posts = this.props.allPosts.map((post) => {
      return (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )
    });
    console.log('enAllPosts de la funcion del cmp');
    return Posts;
  }

  //RENDER
  render() {
    return (
      <main>
        <Estadisticas />
        <Ideas />
        <Categorias />
        <IdeaAportar />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('en mapState');
  return {
    allPosts: state.allPost
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatch');
  return {
    getAllPosts: () => { 
      axios.get('https://blog-api-u.herokuapp.com/v1/posts')
      .then((res)=>{
        console.log(res.data);
        dispatch({type:"DATA_LOADER",data: res.data});
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    clear: ()=>{
      dispatch({type:"DATA_CLEAR"});
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);