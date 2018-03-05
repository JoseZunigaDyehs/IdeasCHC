import React from 'react'
import IdeasHomeContainer from './IdeasHomeContainer'
import IdeaAportar from '../components/shared/IdeaAportar'
import Footer from '../components/shared/Footer'
// import CartContainer from './CartContainer'

const Header = () => (
  <header className="container pt-5">
    <div className="row align-items-center pt-5 pb-3 flex-column">
      <div className="pb-5">
        <img src="./assets/img//LogoMP2.png" alt="ChilCompra MercadoPúblico" />
      </div>
      <div className="pt-5 d-flex flex-column col-md-7 text-center">
        <h1>Nuevas ideas para Mercado Público</h1>
        <p>Te proponemos un espacio de conversación sobre mejoras e ideas para que juntos, podamos mejorar la forma de comprar
            y vender en el Estado.</p>
      </div>
    </div>
  </header>
)

const Estadisticas = () => (
  <section>
    <hr className="linea-black" />
    <div className="container">
      <div className="row justify-content-center py-3">
        <div className="col-md-3 col-6">
          <p className="mb-0">TOTAL PARTICIPANTES</p>
          <p className="f-w-900 mb-0">23.980</p>
        </div>
        <div className="col-md-2 col-6">
          <p className="mb-0">IDEAS ACTIVAS</p>
          <p className="f-w-900 mb-0">128</p>
        </div>
      </div>
    </div>
    <hr className="linea-black" />
  </section>
)

const Categorias = () => (
  <section className="container my-5">
    <h2 className="text-center mb-4">Revisar ideas por categoría</h2>
    <div className="row">
      <div className="col-md-3 mt-2">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">compradores</h5>
        </div>
      </div>
      <div className="col-md-3 mt-2">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">pagos</h5>
        </div>
      </div>
      <div className="col-md-3 mt-2">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">proveedores</h5>
        </div>
      </div>
      <div className="col-md-3 mt-2">
        <div className="dvIdeasPorCategoria text-center px-3 d-flex align-items-center justify-content-center">
          <h5 className="text-uppercase mb-0">convenio marco</h5>
        </div>
      </div>
    </div>
  </section>
)

const HomeContainer = () => (
  <div>
    <Header />
    <main>
      <Estadisticas />
      <IdeasHomeContainer />
      <Categorias />
      <IdeaAportar />
    </main>
    <Footer />
  </div>
)

export default HomeContainer