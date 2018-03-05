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

const Main = () => {
  const funcionForma = (datos) => {
    console.log(datos)
    //let config = {'Authorization': props.login.jwt}
    axios.post('https://blog-api-u.herokuapp.com/v1/posts',
      {
        post: {
          title: datos.nombre,
          body:datos.dirigido
        }
      }
      // ,{
      //   headers: config
      // }
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

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubirIdea);