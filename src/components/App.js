import React, {useEffect, useState} from "react";
import { getTokenFromUrl } from "../spotify";
import '../styles/App.scss';
import Login from './Login';

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
    }

  },[]);

  return (
    <div className="app">
      {
        token ? (
          <div>i am logged in</div>
        ): (
          <Login/>
        )
      }
     
    </div>
  );
}

export default App;
