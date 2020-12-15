import React, {useEffect, useState} from 'react';
import "../styles/Login.scss";
import { loginUrl } from "./spotify"
import { useDataLayerValue } from './DataLayer'

//reactStrap
import { Alert } from 'reactstrap';

//material-ui icons
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

function getBrowserLocales(options = {}) {

  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

  return browserLocales.map(locale => {
    const trimmedLocale = locale.trim();

    return options.languageCodeOnly
      ? trimmedLocale.split(/-|_/)[0]
      : trimmedLocale;
  });
}

function Login() {

  const [{ locale }, dispatch] = useDataLayerValue();

  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  useEffect(()=>{
    let _locale = getBrowserLocales({languageCodeOnly:true})[0];
    dispatch({
      type: "SET_LOCALE",
      locale: _locale,
    });
   
  },[])
 
  return (
    <div className="login">
      <img src="/Spotify_Logo_RGB_White.png" alt="spotify-logo"/>
      {locale === "fr" ?
      <a href={loginUrl} id="button-anchor">SE CONNECTER AVEC SPOTIFY</a>
      :
      <a href={loginUrl} id="button-anchor">LOGIN WITH SPOTIFY</a>
      }
      <div className="alert-container">
      <Alert color="light" isOpen={visible} className="alert">
       {locale === "fr" ? 
       <div className="alert-text">
         <header><h2>Bienvenue sur Spotify-clone !</h2></header>
         <section className="section-one"><p>Spotify-clone est une copie d'une partie de l'interface utilisateur de l'application web de Spotify avec ses animations.<br></br> Les fonctionnalités disponibles sont :</p> 
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
           <h4>Pour que Spotify-clone fonctionne, vous devez :</h4>
           </div>
           <ol>
             <li><strong>1.</strong> Avoir un compte Spotify ainsi que quelques playlists.</li>
             <li><strong>2.</strong> Ouvrir soit le lecteur web de Spotify dans un autre onglet (<a href="https://www.spotify.com/" target="_blank">Accéder au lecteur web ICI</a>), soit l'application bureau ou mobile.</li>
             <li><strong>3.</strong> Jouer une chanson pour quelques secondes et arrêter.</li> 
             <li><strong>4.</strong> Vous pouvez maintenant utiliser Spotify-Clone</li> 
          </ol> 
           </section>
           <button onClick={onDismiss} >J'AI COMPRIS</button>
         </div>
      : 
      <div className="alert-text">
         <header><h2>Welcome to Spotify-clone !</h2></header>
         <section className="section-one"><p>Spotify-clone is a copy of a part of the Spotify web app user interface with its animations.<br></br> The available functionalities are :</p> 
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
           <h4>For Spotify-clone to work, you must:</h4>
           </div>
           <ol>
             <li><strong>1.</strong> Have a Spotify account and some playlists.</li>
             <li><strong>2.</strong> Open the real Spotify app, either the web player(<a href="https://www.spotify.com/" target="_blank">Go to web player HERE</a>), the desktop app or mobile app.  </li>
             <li><strong>3.</strong> Play a song for a few seconds and stop it.</li>
             <li><strong>4.</strong> You can now use Spotify-Clone.</li>
          </ol> 
           </section>
           <button onClick={onDismiss} >I UNDERSTAND</button>
       </div>}
     </Alert>
     </div>
    </div>
   
  )
}

export default Login
