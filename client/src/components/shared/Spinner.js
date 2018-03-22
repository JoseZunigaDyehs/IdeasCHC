import React, { Component } from 'react'
import { connect } from 'react-redux'

class Spinner extends Component {
  render() {
    
    if (this.props.spinner) {
      return (
        <div className='spinner d-flex justify-content-center align-items-center'>
          <i className="fas fa-spinner c-pink"></i>
        </div>
      )
    } else {
      return (
        <div className=''>
        </div>
      )
    }

  }

}

const mapStateToProps = (state) => {
  return {
    spinner: state.spinner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSpinner: () => {
      dispatch({ type: 'ON_SPINNER' })
    },
    offSpinner: (err) => {
      dispatch({ type: 'OFF_SPINNER' })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner)