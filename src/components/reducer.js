export const initialState = {
  user:null,
  playlists:null,
  playing:false,
  item:null,
  token:'BQBF5o_UtYapNtja9kzcAhXaPiYypu8cL1JxIXu8sa4KhGSkr6JQgSsDgmLeWpmIkG9PELtux3uHVSsNbvK9TKMfDaxGNgkxgbWd7AFYCCBwwiaf-1MQR3hvH6ARKP0txXMrO3PorAWPzSDaNeX7sgSR0pUgmUDEZHpK'
  // token:null,
}

const reducer = (state, action) => {
console.log(action);

switch(action.type) {
  case 'SET_USER':
    return {
      ...state,
      user: action.user
    }
  case 'SET_TOKEN':
    return {
      ...state,
      token: action.token
    }  
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists
      }  
   default: 
   return state; 
}

}

export default reducer;