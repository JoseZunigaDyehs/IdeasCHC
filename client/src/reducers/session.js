//REDUCERS
export const session = (state = null, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'LOGIN':
      nuevoEstado = action.data;
      console.log('nuevoEstado: ',nuevoEstado);
      return nuevoEstado;  
    case 'LOGOUT':
      nuevoEstado = null;
      return nuevoEstado;  
    default:
      return null;
  }

}
