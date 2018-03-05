import React from 'react'
import Idea from './Idea'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const IdeasList = ({ ideas }) => {
  return (
  <section>
    <div className="container mb-5">
      <div className="text-center pt-3 pb-4">
      <Link to='subir-idea' className="btn btn-primary px-5 py-3">
        SUBIR UNA IDEA
      </Link>
      </div>
      <div className="row pt-3">
        {ideas.map(idea =>
          <Idea
            key={idea.id}
            idea={idea}
          />
        )}
      </div>
      <div className="col-md-12 text-center">
      
        <button className="btn btn-secondary mt-3 py-3 px-4"> + CARGAR MÁS IDEAS</button>
      </div>
    </div>
    <hr className="linea-black" />
  </section>
)}

export default IdeasList
