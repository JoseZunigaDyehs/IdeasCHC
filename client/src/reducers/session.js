//REDUCERS
export const session = (state = null, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'LOGIN':
      nuevoEstado = action.data;
      return nuevoEstado;  
    case 'LOGOUT':
      nuevoEstado = null;
      return nuevoEstado;  
    default:
      return state;
  }

}

export const userCreated = (state="", action) => {
  var nuevoEstado = Object.assign({}, state);
  switch (action.type) {
    case 'USER_CREATED':
      nuevoEstado = "El usuario se creó con éxito"
      return nuevoEstado;
    case 'USER_ERROR':
      nuevoEstado = "El usuario no se pudo crear"
      return nuevoEstado;
    case 'LOGIN_ERROR':
      nuevoEstado = "Datos incorrectos, no pudo ingresar el usuario"
      return nuevoEstado;      
    default:
      return '';
  }
}
