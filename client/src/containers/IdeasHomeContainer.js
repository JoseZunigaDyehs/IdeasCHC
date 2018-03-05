import { connect } from 'react-redux'
import React, {Component} from 'react'
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
    return <IdeasList ideas={this.props.allPosts}/>;
  }

  render() {
    return (
      <div>
      {this.allPosts()}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    allPosts: state.allPost
  }
}

//ACCIONAR LOS DISPATCH, PASA UNA ACCION AL STORE
const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: () => {
      axios.get('https://blog-api-u.herokuapp.com/v1/posts')
        .then((res) => {
          dispatch({ type: "DATA_LOADER", data: res.data });
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