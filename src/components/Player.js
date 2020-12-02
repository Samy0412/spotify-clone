import React, {useEffect} from 'react'
import { useDataLayerValue } from './DataLayer'

//Style sheet
import "../styles/Player.scss"

//Core components
import Body from './Body'
import Footer from './Footer'
import SideBar from './SideBar'

function Player({spotify}) {
  const [{ item, playing }, dispatch] = useDataLayerValue();

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
    </div>
  )
}

export default Player