import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';

//REDUCERS
const allPost = (state = [], action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'DATA_LOADER':
      nuevoEstado = state.concat(action.data);
      return nuevoEstado;
    case 'DATA_CLEAR':
      nuevoEstado = [];
      return nuevoEstado;      
    default:
      return state;
  }

}

const userCreated = (state="", action) => {
  var nuevoEstado = Object.assign({}, state);
  switch (action.type) {
    case 'USER_CREATED':
      nuevoEstado = "El usuario se creó con éxito"
      return nuevoEstado;
    case 'USER_ERROR':
      nuevoEstado = "El usuario no se pudo crear"
      return nuevoEstado;      
    default:
      return state;
  }
}

export default combineReducers({
  allPost: allPost,
  statusUser: userCreated,
  form: formReducer
});
