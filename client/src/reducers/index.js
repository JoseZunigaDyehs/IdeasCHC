import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { allPost, showPost, errorShowPost, creado } from './ideasReducer'
import { session, userCreated } from './session'

export default combineReducers({
  allPost: allPost,
  form: formReducer,
  login: session,
  statusUser: userCreated,
  showPost: showPost,
  errorShowPost: errorShowPost,
  creado: creado
})