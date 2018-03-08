import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { allPost, showPost, errorShowPost, creado } from './ideasReducer'
import { session, userCreated } from './session'
import { spinner } from './spinner'
import { countIdeas, countUsers } from './estadisticas'

export default combineReducers({
  allPost: allPost,
  form: formReducer,
  login: session,
  statusUser: userCreated,
  showPost: showPost,
  errorShowPost: errorShowPost,
  creado: creado,
  spinnerStatus: spinner,
  countIdeas,
  countUsers
})