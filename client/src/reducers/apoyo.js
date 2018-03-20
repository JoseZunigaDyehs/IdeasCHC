export const apoyo = (state = 0, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'GET_APOYO':
      nuevoEstado = action.data;
      return nuevoEstado;  
    case 'CLEAR_APOYO':
      nuevoEstado = 0;
      return nuevoEstado;  
    default:
      return state;
  }

}