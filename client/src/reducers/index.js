import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { allPost, showPost, errorShowPost, creado, paginador } from './ideasReducer'
import { session, userCreated } from './session'
import { spinner } from './spinner'
import { countIdeas, countUsers } from './estadisticas'

export default combineReducers({
  allPost,
  form: formReducer,
  login: session,
  statusUser: userCreated,
  showPost,
  errorShowPost,
  creado,
  spinnerStatus: spinner,
  countIdeas,
  countUsers,
  paginador
})