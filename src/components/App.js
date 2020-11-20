import React, {useEffect, useState} from "react";
import { getTokenFromUrl } from "./spotify";
import '../styles/App.scss';
import Login from './Login';
import SpotifyWebApi from "spotify-web-api-js"
import Player from "./Player";

const spotify = new SpotifyWebApi()

function App() {
  const [token, setToken]= useState(null);

  //Run code based on a given condition
  useEffect(()=> {
    const hash = getTokenFromUrl();
    window.location.hash ="";
    console.log('I HAVE A TOKEN>>>>',hash)

    const _token = hash.access_token;

    if(_token){
      setToken(_token)

      spotify.setAccessToken(_token)

      spotify.getMe().then(user => {
        console.log(user)
      })
    }

  },[]);

  return (
    <div className="app">
      {
        token ? (
          <Player/>
        ): (
          <Login/>
        )
      }
     
    </div>
  );
}

export default App;
