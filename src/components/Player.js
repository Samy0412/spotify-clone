import React, {useEffect, useState} from 'react'
import { useDataLayerValue } from './DataLayer'

//Style sheet
import "../styles/Player.scss"

//Core components
import Body from './Body'
import Footer from './Footer'
import SideBar from './SideBar'

//reactStrap
import { Alert } from 'reactstrap';

//material-ui icons
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

function Player({spotify}) {
  const [{ locale,active_device, device_id,playing }, dispatch] = useDataLayerValue();
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  useEffect(() => {
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
  }, [spotify]);

  useEffect(()=> {

    spotify.getMyDevices().then((response)=> {
      console.log("devices:",response)
      const devices = response.devices;
      let isActive = false;
      let _device_id = null;
      if(devices.length > 0){
        devices.forEach((device)=>{
          if(device.is_active){
            isActive = true;
          }
          _device_id=device.id;
        })
      }
       dispatch ({
         type:'SET_ACTIVE_DEVICE',
         active_device: isActive,
       })
       dispatch ({
        type:'SET_DEVICE_ID',
        device_id: _device_id,
      })
      
    })
    
  },[active_device,playing])


  return (
    <div className="player">
      <div className="player__body">
      <SideBar spotify={spotify}/>
      <Body spotify={spotify}/>
      </div>

      <Footer spotify={spotify}/>
      {!active_device && locale === "fr" &&
      <div className="alert-container">
      <Alert color="light" isOpen={visible} id="alert">
        <div id="alert-text">
          <div id="alert-title">
          <ReportProblemOutlinedIcon className="warning-icon"/>
          <h4>Aucun de vos appareils n'est actif. Veuillez :</h4>
          </div>
          <div>
          <ol>
             <li><strong>1.</strong>  Ouvrir soit l'application originale web de Spotify dans un autre onglet, soit l'application bureau ou mobile.</li>
             <li><strong>2.</strong>  Lire dans cette même aplication une chanson pour quelque secondes et l'arrêter.</li> 
             <li><strong>3.</strong>  Rafraichissez ensuite la page de Spotify-Clone.</li> 
          </ol> 
          
          </div>
          <button onClick={onDismiss} >J'AI COMPRIS</button>
        </div>
      </Alert>
      </div>}
      {!active_device && locale !== "fr" &&
      <div className="alert-container">
      <Alert color="light" isOpen={visible} id="alert">
      <div id="alert-text">
        <div id="alert-title">
          <ReportProblemOutlinedIcon className="warning-icon"/>
          <h4>You have no active device. Please follow these steps :</h4>
        </div>
        <div>
        <ol>
           <li><strong>1.</strong>  Open the real Spotify app, either the web player, the desktop or the mobile app. </li>
           <li><strong>2.</strong>  Play in the real Spotify app a song for a couple of seconds, and then pause it.</li> 
           <li><strong>3.</strong>  You can now close this window and refresh the Spotify-Clone page.</li> 
         </ol> 
         </div>
         <button onClick={onDismiss} >I UNDERSTAND</button>
      </div>
       </Alert>
       </div>
      }  
    </div>
  )
}

export default Player