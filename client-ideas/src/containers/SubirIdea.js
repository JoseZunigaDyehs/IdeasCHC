import React from 'react'
import Footer from '../components/shared/Footer'
import EnviarIdeaForm from '../components/forms/EnviarIdeaForm'

const Header = () => (
  <header>
    <div className="top"></div>
    <div className="btn-back d-flex py-3 justify-content-center mt-3" onClick={window.history.back}>
      <i className="fas fa-arrow-left"></i>
      <p className="mb-0 ml-3 f-w-500">VOLVER</p>
    </div>
  </header>
)

const Main = () => {
  const funcionForma = (datos) => {
    console.log(datos)
  }
  return(
  <main>
    <section className="container">
      <EnviarIdeaForm onSubmit={funcionForma} />
    </section>
  </main>
)
}

const SubirIdea = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
  </div>
      )
}

export default SubirIdea;