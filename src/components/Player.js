import React, {useEffect} from 'react'
import { useDataLayerValue } from './DataLayer'

//Style sheet
import "../styles/Player.scss"

//Core components
import Body from './Body'
import Footer from './Footer'
import SideBar from './SideBar'

//reactStrap
import { UncontrolledAlert } from 'reactstrap';

//material-ui icons
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

function Player({spotify}) {
  const [{ item, playing, locale }, dispatch] = useDataLayerValue();

  useEffect(() => {
    //get the current status of playback
    spotify.getMyCurrentPlaybackState().then((r) => {
      // console.log("currentplaybackstate:",r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  return (
    <div className="player">
      <div className="player__body">
      <SideBar spotify={spotify}/>
      <Body spotify={spotify}/>
      </div>

      <Footer spotify={spotify}/>
      {!item && locale === "fr" && 
      <div className="alert-container">
      <UncontrolledAlert color="warning" id="alert">
      <div id="alert-text">
          <ReportProblemOutlinedIcon className="warning-icon"/>
          <div>
          <h4>Aucun de vos appareils n'est actif. Veuillez :</h4>
          <ol>
             <li><strong>1.</strong>  Ouvrir soit l'application originale web de Spotify dans un autre onglet, soit l'application bureau ou mobile.</li>
             <li><strong>2.</strong>  Lire dans cette même aplication une chanson pour quelque secondes et l'arrêter.</li> 
             <li><strong>3.</strong>  Rafraichissez ensuite la page de Spotify-Clone.</li> 
          </ol> 
          </div>
      </div>
      </UncontrolledAlert>
      </div>
      }
      {!item && locale !== "fr" && 
      <div className="alert-container">
      <UncontrolledAlert color="warning" id="alert">
      <div id="alert-text">
        <ReportProblemOutlinedIcon className="warning-icon"/>
        <div>
        <h4>None of your devices is active. Please :</h4>
        <ol>
           <li><strong>1.</strong>  Open the real Spotify app, either the web player, the desktop or the mobile app. </li>
           <li><strong>2.</strong>  Play in the real Spotify app a song for a couple of seconds, and then pause it.</li> 
           <li><strong>3.</strong>  You can now close this window and login to Spotify-Clone.</li> 
         </ol> 
         </div>
      </div>
       </UncontrolledAlert>
       </div>
      }
    </div>
  )
}

export default Player