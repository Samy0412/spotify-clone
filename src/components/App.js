import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js"
import { useDataLayerValue }  from './DataLayer'
import 'bootstrap/dist/css/bootstrap.min.css';

//helper function
import { getTokenFromUrl } from "./spotify";

//style sheet
import '../styles/App.scss';
//Core components
import Login from './Login';
import Player from "./Player";


const spotify = new SpotifyWebApi()

function App() {

  const [{ token }, dispatch] = useDataLayerValue();

  //Run code at first render
  useEffect(()=> {

    //Get the access Token and store it
    const hash = getTokenFromUrl();
    window.location.hash ="";
    // console.log('I HAVE A TOKEN>>>>',hash)

    const _token = hash.access_token;

    if(_token){
      dispatch({
        type:'SET_TOKEN',
        token:_token,
      })

      spotify.setAccessToken(_token)       
      
      //get the user information
      spotify.getMe().then(user => {
        dispatch({
          type:'SET_USER',
          user: user,
        })
      })
    }
      //get the user Playlists
    spotify.getUserPlaylists({limit:20}).then((playlists)=> {
      dispatch({
        type:'SET_PLAYLISTS',
        playlists: playlists,
      })
      
      //get the first playlist to display when opening the app
      spotify.getPlaylist(playlists.items[0].id).then ((response)=> {
        dispatch ({
          type:'SET_SELECTED_PLAYLIST',
          selected_playlist: response
        })
      })
    })

     //get the current status of playback
     spotify.getMyCurrentPlaybackState().then((r) => {

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });

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
