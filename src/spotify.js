// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/


export const authEndpoint = "https://accounts.spotify.com/authorize"

const redirectUri = "http://localhost:3001/";

const clientId = "ca189fea68e447d89c64f2d16f464333";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl =()=> {
  return window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial,item)=> {

    let parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);

    return initial
  }, {});
}

export const loginUrl = `${authEndpoint}?response_type=token&client_id=${clientId}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}&show_dialog=true`;