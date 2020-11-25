import React from 'react';
import "../styles/Login.scss";
import { loginUrl } from "./spotify"

function Login() {
  return (
    <div className="login">
      <img src="/Spotify_Logo_RGB_White.png" alt="spotify-logo"/>
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login
