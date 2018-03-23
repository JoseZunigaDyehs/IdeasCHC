//REDUCERS
export const spinner = (state = true, action) => {
  var nuevoEstado = Object.assign({}, state);
  switch (action.type) {
    case 'ON_SPINNER':
      nuevoEstado = true;
      return nuevoEstado;  
    case 'OFF_SPINNER':
      nuevoEstado = false;
      return nuevoEstado;  
    default:
      return state;
  }

}