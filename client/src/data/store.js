import { createStore } from 'redux';
import reducer from '../reducers';

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

const store = createStore(reducer);

export default store;