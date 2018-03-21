export const apoyo = (state = -1, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'GET_APOYO':
      nuevoEstado = action.data.has_voted;
      return nuevoEstado;  
    case 'CLEAR_APOYO':
      nuevoEstado = -1;
      return nuevoEstado;  
    default:
      return state;
  }

}