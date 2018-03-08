import React from 'react'
import Idea from './Idea'

const IdeaPrototipo = {
  "count": 0,
  "next": null,
  "previous": null,
  "results": [
    {
      "url": "",
      "pk": 0,
      "name": "",
      "created": "",
      "category": [{"name":""}],
      "votes": 0,
      "content": ""
    }
  ]
}

const IdeasList = ({ ideas }) => {

  if(ideas['0']===undefined){
    ideas['0'] = IdeaPrototipo;
  }else if(ideas['0'].results['0'].pk === 0){
    ideas.shift();
  }

  return (
    <section>
      <div className="container mb-5">
          <div className='col-12 d-flex'>
            <p className='fnt-14'>TODAS</p>
            <p className='fnt-14'>FOMENTO A LAS PYMES</p>
            <p className='fnt-14'>MEJORAS A LA PLATAFORMA</p>
            <p className='fnt-14'>IDEAS INNOVADORAS</p>
          </div>
        <div className="row pt-3">

          {ideas['0'].results.map(idea =>
            <Idea
              key={idea.pk}
              idea={idea}
            />
          )}
        </div>
        <div className="col-md-12 text-center">

          <button className="btn btn-secondary mt-3 py-3 px-4"> + CARGAR MÁS IDEAS</button>
        </div>
      </div>
    </section>
  )
}

export default IdeasList
