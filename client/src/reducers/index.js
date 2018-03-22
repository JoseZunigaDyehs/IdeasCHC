import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { allPost, showPost, errorShowPost, creado, paginador, countPosts } from './ideasReducer'
import { session, userCreated } from './session'
import { spinner } from './spinner'
import { countIdeas, countUsers } from './estadisticas'
import { getCategorias } from './categorias'
import { apoyo } from './apoyo'

export default combineReducers({
  allPost,
  form: formReducer,
  login: session,
  statusUser: userCreated,
  showPost,
  errorShowPost,
  creado,
  spinner: spinner,
  countIdeas,
  countUsers,
  paginador,
  getCategorias,
  apoyo,
  countPosts
})