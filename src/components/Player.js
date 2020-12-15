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
    spotify.getMyDevices().then((response)=> {
      console.log("devices:",response)
      const devices = response.devices;
      if(devices.length > 0){
          _device_id=devices[0].id;
        }else {
          setVisible(true)
        }
       dispatch ({
        type:'SET_DEVICE_ID',
        device_id: _device_id,
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
          <h4>Oups! Aucun appareil n'est détecté!</h4>
          </div>
          <div>
          <ol>
             <li><strong>1.</strong>  Ouvrez soit l'application originale web de Spotify dans un autre onglet, soit l'application bureau ou mobile.</li>
             <br></br>
             <li><strong>2.</strong>  Rafraichissez ensuite la page de Spotify-Clone.</li> 
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
          <h4>Oops! No device is detected!</h4>
        </div>
        <div>
        <ol>
           <li><strong>1.</strong> Open the real Spotify app, either the web player, the desktop or the mobile app. </li>
           <br></br>
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