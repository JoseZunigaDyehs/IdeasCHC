import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const IdeaAportar = () => (
  <section className="back-pink py-3">
      <div className="container">
        <div className="row py-5">
          <div className="col-md-12 d-flex align-items-center flex-column">
            <h3 className="text-white f-w-300 mb-4">¿Tienes una idea para aportar?</h3>
            <Link to='/subir-idea' className="btn btn-white py-3 px-4">
              COMPARTIR IDEA
              <i className="ml-2 fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
)

export default IdeaAportar