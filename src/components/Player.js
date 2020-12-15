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
  const [visible, setVisible] = useState(false);

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
  
  const getAvailableDevices = ()=> {
    let _device_id = null;
    let _active_device = false;
    spotify.getMyDevices().then((response)=> {
      const devices = response.devices;
          devices?.forEach(device => {
            if (device.is_active) {
              _active_device = true;
              _device_id = device.id;
            }
          })
        
        if(!_active_device || devices.length === 0){
          setVisible(true)
        }
       dispatch ({
        type:'SET_DEVICE_ID',
        device_id: _device_id,
      })
      dispatch ({
        type:'SET_ACTIVE_DEVICE',
        active_device: _active_device,
      })
    })
  }

  useEffect(()=> {
    getAvailableDevices();
  },[playing])


  return (
   <div>
    <div className="player">
    <div className="player__body">
    <SideBar spotify={spotify}/>
    <Body spotify={spotify} setVisible={setVisible}/>
    </div>
    <Footer spotify={spotify}/>
    </div>
    <div className={!visible ? "invisible" : "shadow"}></div>
  
      {visible && locale === "fr" &&
      <div className="alert-container">
      <Alert color="light" isOpen={visible} id="alert">
        <div id="alert-text">
          <div id="alert-title">
          <ReportProblemOutlinedIcon className="warning-icon"/>
          <h4>Oups! Aucun appareil actif n'est détecté!</h4>
          </div>
          <div>
          <ol>
            <li>Suivez ces étapes:</li>
            <br></br>
             <li><strong>1.</strong> Ouvrez soit le player web de Spotify, soit l'application bureau ou mobile.</li>
             <li><strong>2.</strong> Jouer une chanson pour quelques secondes et arrêter.</li>
             <li><strong>3.</strong> Rafraichissez la page de Spotify-Clone.</li> 
          </ol> 
          
          </div>
          <button onClick={onDismiss} >J'AI COMPRIS</button>
        </div>
      </Alert>
      </div>}
      {visible && locale !== "fr" &&
      <div className="alert-container">
      <Alert color="light" isOpen={visible} id="alert">
      <div id="alert-text">
        <div id="alert-title">
          <ReportProblemOutlinedIcon className="warning-icon"/>
          <h4>Oops! there are no active device detected!</h4>
        </div>
        <div>
        <ol>
          <li>Please follow these steps:</li>
          <br></br>
           <li><strong>1.</strong> Open the real Spotify app, either the web player, the desktop or the mobile app. </li>
           <li><strong>2.</strong> Play a song for a few seconds and stop it.</li>
           <li><strong>2.</strong> Refresh the Spotify-Clone page.</li> 
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