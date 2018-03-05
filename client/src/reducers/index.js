import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import {allPost} from './ideasReducer'

export default combineReducers({
  allPost: allPost,
  form: formReducer
});