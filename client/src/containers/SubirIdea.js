import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../components/shared/Footer'
import EnviarIdeaForm from '../components/forms/EnviarIdeaForm'
import axios from 'axios'

const Header = () => (
  <header className='pt-5'>
    {/* <div className="btn-back d-flex py-3 justify-content-center mt-3" onClick={window.history.back}>
      <i className="fas fa-arrow-left"></i>
      <p className="mb-0 ml-3 f-w-500">VOLVER</p>
    </div> */}
  </header>
)

const Main = (props) => {
  const funcionForma = (datos) => {
    console.log('pooooo',datos)
    console.log(props);
    let config = {'Authorization': 'Bearer' + props.login.jwt }//props.login.jwt}
    axios.post('https://blog-api-u.herokuapp.com/v1/posts',
      {
        post: {
          title: datos.nombre,
          body:datos.dirigido
        }
      }
      ,{
        headers: config
      }
    )
      .then(res=>{
        console.log(res);

      })
      .catch(err=>{
        console.log(err);
      })
  }
  return (
    <main>
      <section className="container">
        <EnviarIdeaForm onSubmit={funcionForma} />
      </section>
    </main>
  )
}

class SubirIdea extends Component {

  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: ()=>{
      dispatch({type: 'CREATED_'})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SubirIdea);