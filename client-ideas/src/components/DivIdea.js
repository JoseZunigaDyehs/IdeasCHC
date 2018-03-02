import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Idea extends Component {
  render(){
    return(
      <h2>IDEA</h2>
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
    clear: ()=>{
      dispatch({type:"DATA_CLEAR"});
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea);