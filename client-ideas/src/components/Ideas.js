import React from 'react'

const IdeaDiv = () => (
  <div className="col-md-6 mb-4">
    <div className="dvIdea d-flex">
      <div className="dvIdeaCategoria">
        <p className="m-0 text-uppercase">COMPRADORES</p>
      </div>
      <div className="dvIdeaBody w-100 py-3 d-flex flex-column px-4 justify-content-between">
        <p className="mb-0 text-small text-uppercase text-right">12 Febrero 2018</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="w-90 mb-1">Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un
                  sitio mientras que mira su diseño. </p>
          <div className="d-flex c-gris align-items-center">
            <i className="far fa-thumbs-up mr-1"></i>
            <h5 className="f-w-900 mb-0">16</h5>
          </div>
        </div>
        <a href="idea" className="link-pri">Leer Más
                <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
)

const Ideas = () => (
  <section>
    <div className="container mb-5">
      <div className="text-center pt-3 pb-4">
        <a href="subir-idea" className="btn btn-primary px-5 py-3">SUBIR UNA IDEA</a>
      </div>
      <div className="row pt-3">
        <IdeaDiv />
      </div>
      <div className="col-md-12 text-center">
        <button className="btn btn-secondary mt-3 py-3 px-4"> + CARGAR MÁS IDEAS</button>
      </div>
    </div>
    <hr className="linea-black" />
  </section>
)

export default Ideas