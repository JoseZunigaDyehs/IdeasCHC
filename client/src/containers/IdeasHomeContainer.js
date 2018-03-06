import { connect } from 'react-redux'
import React, { Component } from 'react'
import axios from 'axios';
import IdeasList from '../components/IdeasList'

class IdeasHomeContainer extends Component {

  componentDidMount = () => {
    document.getElementById('allPost').innerHTML = '<i class="fas fa-spinner"></i>';
    if(this.props.login == null){
      this.props.getAllPosts();
    }else{
      this.props.getAllPostsUser(this.props.login.id, this.props.login.jwt);
    }
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
      <div>
        <div id="allPost" className="text-center"></div>
        {this.allPosts()}
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    allPosts: state.allPost,
    login: state.login
  }
}

//ACCIONAR LOS DISPATCH, PASA UNA ACCION AL STORE
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPostsUser: (user_id, token) => {
      let config = {'Authorization': 'Bearer' + token }
      axios.get(`https://blog-api-u.herokuapp.com/users/${user_id}/posts`, {headers: config})
        .then((res) => {
          dispatch({ type: "DATA_LOADER", data: res.data.posts });
          document.getElementById('allPost').innerHTML = '';
        })
        .catch((err) => {
          console.log(err);
        })
    },
    getAllPosts: () => {
      axios.get(`https://blog-api-u.herokuapp.com/v1/posts`)
        .then((res) => {
          dispatch({ type: "DATA_LOADER", data: res.data });
          document.getElementById('allPost').innerHTML = '';
        })
        .catch((err) => {
          console.log(err);
        })
    },
    clear: () => {
      dispatch({ type: "DATA_CLEAR" });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasHomeContainer);