//REDUCERS
export const countUsers = (state = 0, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'COUNT_USERS':
      nuevoEstado = action.data;
      return nuevoEstado;
    case 'CLEAR_COUNT_USERS':
      nuevoEstado = null;
      return nuevoEstado;      
    default:
      return state;
  }

}
export const countIdeas = (state = 0, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'COUNT_IDEAS':
      nuevoEstado = action.data;
      return nuevoEstado;
    case 'CLEAR_COUNT_IDEAS':
      nuevoEstado = null;
      return nuevoEstado;      
    default:
      return state;
  }

}