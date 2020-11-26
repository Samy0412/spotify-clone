import React, { useEffect } from "react";
import { getTokenFromUrl } from "./spotify";
import '../styles/App.scss';
import Login from './Login';
import SpotifyWebApi from "spotify-web-api-js"
import Player from "./Player";
import { useDataLayerValue }  from './DataLayer'



const spotify = new SpotifyWebApi()

function App() {

  const [{ token, tracks, playlists }, dispatch] = useDataLayerValue();

  //Run code based on a given condition
  useEffect(()=> {
    const hash = getTokenFromUrl();
    window.location.hash ="";
    console.log('I HAVE A TOKEN>>>>',hash)

    const _token = hash.access_token;

    if(_token){
 
      dispatch({
        type:'SET_TOKEN',
        token:_token,
      })

      spotify.setAccessToken(_token)       
      
      spotify.getMe().then(user => {
        dispatch({
          type:'SET_USER',
          user: user,
        })
        console.log("user:",user)
       
      })
    }
     
    spotify.getUserPlaylists().then((playlists)=> {
      dispatch({
        type:'SET_PLAYLISTS',
        playlists: playlists,
      })

      spotify.getPlaylist(playlists.items[0].id).then ((response)=> {
        dispatch ({
          type:'SET_SELECTED_PLAYLIST',
          selected_playlist: response
        })
      })
    })

 spotify.getMyDevices().then((response)=> console.log("devices:",response))
  },[])
  

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify}/>
        ): (
          <Login/>
        )
      }
     
    </div>
  );
}

export default App;
