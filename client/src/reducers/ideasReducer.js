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

export const create = (state = null, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'CREATED_':
      nuevoEstado = 'Post exitoso'
      return nuevoEstado;
    case 'DATA_CLEAR':
      nuevoEstado = [];
      return nuevoEstado;      
    default:
      return null;
  }

}
