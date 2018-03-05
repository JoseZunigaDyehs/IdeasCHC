import React from 'react'

const Idea = ({ idea }) => (

  <div className="col-md-6 mb-4">
    <div className="dvIdea d-flex">
      <div className="dvIdeaCategoria d-flex justify-content-center align-items-center">
        <p className="m-0 text-uppercase">{idea.id}</p>
      </div>
      <div className="dvIdeaBody w-100 py-3 d-flex flex-column px-4 justify-content-between">
        <p className="mb-0 text-small text-uppercase text-right">{idea.created_at}</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="w-90 mb-1">{idea.body} </p>
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

export default Idea
