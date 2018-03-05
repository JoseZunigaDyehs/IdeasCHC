//REDUCERS
export const allPost = (state = [], action) => {
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
