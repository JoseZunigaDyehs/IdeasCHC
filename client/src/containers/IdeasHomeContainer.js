import { connect } from 'react-redux'
import React, { Component } from 'react'
import axios from 'axios';
import IdeasList from '../components/IdeasList'

class IdeasHomeContainer extends Component {

  componentDidMount = () => {
      this.props.getAllPosts();
  };
  componentWillUnmount() {
    this.props.clear();
  }

  //Funciones
  allPosts = () => {
    return <IdeasList ideas={this.props.allPosts} />;
  }
  
  render() {
    return (
      <div className='py-4'>
        {this.allPosts()}
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    allPosts: state.allPost,
    login: state.login,
    spinnerStatus: state.spinnerStatus
  }
}

//ACCIONAR LOS DISPATCH, PASA UNA ACCION AL STORE
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPostsUser: (user_id, token) => {
      dispatch({type: 'ON_SPINNER'})
      let config = {'Authorization': 'Bearer' + token }
      axios.get(`https://blog-api-u.herokuapp.com/users/${user_id}/posts`, {headers: config})
        .then((res) => {
          dispatch({ type: "DATA_LOADER", data: res.data.posts });
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getAllPosts: () => {
      axios.get(`https://ideas.chilecompra.cl:8000/ideas/`)
        .then((res) => {
          dispatch({ type: "DATA_LOADER", data: res.data });
          document.getElementsByClassName('todas')['0'].classList.add('active')
        })
        .catch((err) => {
         // console.log(err);
        })
    },
    clear: () => {
      dispatch({ type: "DATA_CLEAR" });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasHomeContainer);