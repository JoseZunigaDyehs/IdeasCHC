import React, { Component } from 'react'
import { connect } from 'react-redux'
import Idea from '../components/Idea'
import axios from 'axios'

const IdeaPrototipo =
  {
    "url": "",
    "pk": 0,
    "name": "",
    "created": "",
    "category": [{ "name": "" }],
    "votes": 0,
    "content": ""
  }

class IdeasRelacionadas extends Component {

    componentWillMount() {
        this.props.clear()
      }

    render() {
        if (this.props.post.pk !== undefined && this.props.ideas['0'] === undefined) {
            this.props.getPostsByCategoria(this.props.post.category.pk);
        }
        if (this.props.ideas['0'] === undefined) {
            this.props.ideas.concat(IdeaPrototipo);
        }

        return (
            <section className="container mb-5">
                <div className="text-center pt-3 pb-4">
                    <h2>Otras ideas que podrían gustarte</h2>
                </div>
                <div className="row pt-3">
                    {this.props.ideas.map(idea =>
                        <Idea
                            key={idea.pk}
                            idea={idea}
                        />
                    )}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ideas: state.allPost,
        post: state.showPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostsByCategoria: (idCategoria) => {
            axios.get(`http://10.0.1.1:8000/ideas/?category=${idCategoria}`)
              .then((res) => {
                dispatch({ type: "DATA_LOADER", data: res.data })
              })
              .catch((err) => {
                console.log(err);
              })
          }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasRelacionadas)