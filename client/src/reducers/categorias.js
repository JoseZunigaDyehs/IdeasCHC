export const getCategorias = (state = [], action) => {
    var nuevoEstado = Object.assign({}, state);
  
    switch (action.type) {
      case 'GET_CATEGORIAS':
        nuevoEstado = action.data;
        return nuevoEstado;
      case 'CLEAR_CATEGORIAS':
        nuevoEstado = [];
        return nuevoEstado;      
      default:
        return state;
    }
  
  }