import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import {allPost} from './ideasReducer'
import {session} from './session'

export default combineReducers({
  allPost: allPost,
  form: formReducer,
  login: session
})