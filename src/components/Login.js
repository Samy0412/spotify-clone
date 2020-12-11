import React, {useState} from 'react';
import "../styles/Login.scss";
import { loginUrl } from "./spotify"

//reactStrap
import { UncontrolledAlert } from 'reactstrap';

//material-ui icons
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

function getBrowserLocales(options = {}) {
  const defaultOptions = {
    languageCodeOnly: false,
  };

  const opt = {
    ...defaultOptions,
    ...options,
  };

  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

  return browserLocales.map(locale => {
    const trimmedLocale = locale.trim();

    return opt.languageCodeOnly
      ? trimmedLocale.split(/-|_/)[0]
      : trimmedLocale;
  });
}
console.log(getBrowserLocales({languageCodeOnly:true}))

function Login() {
 
  return (
    <div className="login">
      <img src="/Spotify_Logo_RGB_White.png" alt="spotify-logo"/>
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
      <div className="alert-container">
      <UncontrolledAlert color="warning" className="alert">
       {getBrowserLocales({languageCodeOnly:true})[0]=== "fr" ? 
       <div className="alert-text">
         <header><h2>Bienvenue sur Spotify-clone !</h2></header>
         <section className="section-one"><p>Spotify-clone est une copie d'une partie de l'interface utilisateur de Spotify avec ses animations.<br></br> Les fonctionalités disponibles sont :</p> 
         <ul>
           <li>- Lire vos playlists et les chansons qu'elles contiennent</li>
           <li>- Pause/Play</li>
           <li>- Répéter</li>
           <li>- Aléatoire</li>
           <li>- Changer le volume</li>
          </ul>
         </section>
         <section className="section-two">
           <div>
           <ReportProblemOutlinedIcon className="warning-icon"/>
           <h4>Pour que Spotify-clone fonctionne, vous devez obligatoirement suivre ces étapes :</h4>
           </div>
           <ol>
             <li><strong>1.</strong> Avoir un compte Spotify ainsi que quelques playlists.</li>
             <li><strong>2.</strong>  Ouvrir soit l'application originale web de Spotify dans un autre onglet, soit l'application bureau ou mobile.</li>
             <li><strong>3.</strong>  Lire dans cette même aplication une chanson pour quelque secondes et l'arrêter.</li> 
             <li><strong>4.</strong>  Vous pouvez maintenant fermer cette fenêtre et vous connecter à Spotify-clone.</li> 
          </ol> 
          <p><strong>NOTE: </strong>L'application originale de Spotify (web, bureau, mobile) se désactive après quelques minutes d'inactivité. Si Spotify-Clone ne fonctionne pas, veuillez répéter l'étape 3 et rafraichissez la page de Spotify-Clone. </p>
           </section>
       </div>
      : 
      <div className="alert-text">
         <header><h2>Welcome to Spotify-clone !</h2></header>
         <section className="section-one"><p>Spotify-clone is a copy of a part of the Spotify user interface with its animations.<br></br> The available functionalities are :</p> 
         <ul>
           <li>- Play your playlists and the songs they contain</li>
           <li>- Pause/Play</li>
           <li>- Repeat</li>
           <li>- Shuffle</li>
           <li>- Change volume</li>
          </ul>
         </section>
         <section className="section-two">
           <div>
           <ReportProblemOutlinedIcon className="warning-icon"/>
           <h4>For Spotify-clone to work, you must follow these steps:</h4>
           </div>
           <ol>
             <li><strong>1.</strong> Have a Spotify account and some playlists.</li>
             <li><strong>2.</strong> Open the real Spotify app, either the web app, the desktop or the mobile app. </li>
             <li><strong>3.</strong> Play in the real Spotify app a song for a couple of seconds, and then pause it. </li> 
             <li><strong>4.</strong> You can now close this window and login to Spotify-Clone.</li> 
          </ol> 
          <p><strong>NOTE: </strong>The real Spotify application (web, desktop, mobile) will be disabled after a few minutes of inactivity. If Spotify-Clone doesn't work, please repeat step 3 and refresh the Spotify-Clone page. </p>
           </section>
       </div>}
     </UncontrolledAlert>
     </div>
    </div>
   
  )
}

export default Login
