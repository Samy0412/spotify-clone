import React, { useEffect } from 'react'
import "../styles/Footer.scss"
import { useDataLayerValue } from './DataLayer'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay"
import VolumeDownIcon from "@material-ui/icons/VolumeDown"
import { Slider} from "@material-ui/core"


function Footer({spotify}) {

  const [{ token, item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

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

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
     <div className="footer__left">
       <img src={item?.album.images[0].url} alt={item?.name} className="footer__album__logo"/>
       
       {item ? (
         <div className="footer__songInfo">
         <h4>{item.name}</h4>
         <p>{item.artists.map((artist)=> artist.name).join(",")}</p>
         </div>) : ( 
           <div className="footer__songInfo">
           <h4>No song is playing</h4>
           <p>...</p>
         </div>
         )}
     </div>
     <div className="footer__center">
      <ShuffleIcon className="footer__green icon"/>
      <SkipPreviousIcon className="footer__icon icon" onClick={skipNext}/>
      {playing? (
        <PauseCircleOutlineIcon className="footer__icon __play icon" onClick={handlePlayPause}/>
      ): (
        <PlayCircleOutlineIcon className="footer__icon __play icon" onClick={handlePlayPause}/>
      )}
    
      <SkipNextIcon className="footer__icon icon" onClick={skipPrevious}/>
      <RepeatIcon className="footer__green icon"/>
     </div>
     <div className="footer__right">
         <PlaylistPlayIcon className="footer__right__icon icon"/>
         <VolumeDownIcon className="footer__right__icon icon"/>
         <Slider className="footer__right__icon"/>
     </div>
    </div>
  )
}

export default Footer
