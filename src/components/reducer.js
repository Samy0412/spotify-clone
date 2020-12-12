export const initialState = {
  user:null,
  playlists:null,
  playing:false,
  currentTrack:null,
  selected_playlist: null,
  repeat:false,
  spotify:null,
  playing_playlist:null,
  locale:"en",
}

const reducer = (state, action) => {

switch(action.type) {
  case 'SET_LOCALE':
    return {
      ...state,
      locale:action.locale
    }
  case 'SET_USER':
    return {
      ...state,
      user: action.user
    }
  case "SET_PLAYING":
    return {
      ...state,
      playing: action.playing,
    };
  case "SET_ITEM":
    return {
      ...state,
      item: action.item,
    };
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
  case "SET_SPOTIFY":
    return {
      ...state,
      spotify: action.spotify,
    };
  case 'SET_SELECTED_PLAYLIST':
    return {
      ...state,
      selected_playlist: action.selected_playlist
    } 

  case 'SET_PLAYING_PLAYLIST':
    return {
      ...state,
      playing_playlist: action.playing_playlist
    }
    case 'SET_REPEAT':
    return {
      ...state,
      repeat: action.repeat
    }  
   default: 
   return state; 
}

}

export default reducer;