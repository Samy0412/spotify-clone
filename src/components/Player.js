import React, {useEffect} from 'react'
import { useDataLayerValue } from './DataLayer'
import "../styles/Player.scss"
import Body from './Body'
import Footer from './Footer'
import SideBar from './SideBar'

function Player({spotify}) {
  const [{ item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log("currentplaybackstate:",r);

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
      <SideBar/>
      <Body spotify={spotify}/>
      </div>

      <Footer spotify={spotify}/>
    </div>
  )
}

export default Player