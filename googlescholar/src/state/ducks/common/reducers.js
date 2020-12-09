const initial = {
  // default:true,
  query: true,
  data:[],
  err:false,
}

const queryReducer = (state = initial, action) => {
  switch (action.type) {
    case "USER": {
      return {
        ...initial,
        query:false,
        // default:false,
      }
    }
    case "DEFAULT": {
      return initial;
    }
    case 'GET_QUERY_SUCCESS': {
      if (action.data && action.data.length < 1) {
        return {
          ...state,
          data: action.data,
          err: true,
          // default:false,
        }
      } 
      else
      return {
        ...state,
        data: action.data,
        err: false,
        // default:false,
      }
    }
    default:
      return {
        ...state
      }
  }
}

export { queryReducer }
