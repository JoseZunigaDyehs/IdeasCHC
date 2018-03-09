//REDUCERS
export const allPost = (state = [], action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'DATA_LOADER':
      debugger;
      nuevoEstado = state.concat(action.data.results);
      return nuevoEstado;
    case 'DATA_CLEAR':
      nuevoEstado = [];
      return nuevoEstado;      
    default:
      return state;
  }

}

export const creado = (state = null, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'CREATED_':
      nuevoEstado = 'Idea creada'
      return nuevoEstado; 
    case 'ERROR_CREATED_':
      nuevoEstado = 'No se ha podido crear la idea';
      return nuevoEstado;      
    default:
      return state;
  }

}

export const showPost = (state = {}, action) => {
  var nuevoEstado = Object.assign({}, state);

  switch (action.type) {
    case 'GET_POST':
      nuevoEstado = action.data
      return nuevoEstado;
    case 'CLEAR_POST':
      nuevoEstado = {}
      return nuevoEstado;
    default:
      return state;
  }

}

export const errorShowPost = (state = '', action) => {
  var nuevoEstado = Object.assign({}, state)

  switch (action.type) {
    case 'ERROR_GET_POST':
      nuevoEstado = 'Error al cargar la idea'
      return nuevoEstado
    case 'CLEAR_ERROR_GET_POST':
      nuevoEstado = ''
      return nuevoEstado
    default:
      return state
  }

}

export const paginador = (state = 0, action) => {
  var nuevoEstado = Object.assign({}, state)

  switch (action.type) {
    case 'PAGINADOR':
      nuevoEstado = action.data
      return nuevoEstado
    case 'CLEAR_PAGINADOR':
      nuevoEstado = 0
      return nuevoEstado
    default:
      return state
  }

}