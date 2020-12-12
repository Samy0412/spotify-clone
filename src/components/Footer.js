import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from './DataLayer'

//style sheet
import "../styles/Footer.scss"

//material UI Icons and components
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay"
import VolumeOffOutlinedIcon from '@material-ui/icons/VolumeOffOutlined';
import VolumeMuteOutlinedIcon from '@material-ui/icons/VolumeMuteOutlined';
import VolumeDownOutlinedIcon from '@material-ui/icons/VolumeDownOutlined';
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined';
import Popover from '@material-ui/core/Popover';


import { Slider} from "@material-ui/core"

//core components
import ProgressBar from './ProgressBar';


function Footer({spotify}) {

  const [{ token, item, playing, repeat }, dispatch] = useDataLayerValue();
  const [value, setValue] = useState(50);
  const [shuffle, setShuffle]=useState(false);

  useEffect(() => {
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

  //call to Spotify API to pause the song
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
  
  //call to Spotify API to skip to the next song
  const skipNext = () => {
    spotify.skipToNext().then((res)=> {
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
    })
  };

  //call to Spotify API to skip to the previous song
  const skipPrevious = () => {
    spotify.skipToPrevious().then ((res)=> {
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
    })
  };

 //call to Spotify API to skip to repeat the track currently played
  const repeatTrack = ()=> {
    if(repeat){
      spotify.setRepeat("off").then( ()=> {
        dispatch({
          type: "SET_REPEAT",
          repeat: false,
        });
      }
      )
    }else {
      spotify.setRepeat("track").then(()=> {
        dispatch({
          type: "SET_REPEAT",
          repeat: true,
        });
      })
    } 
  }

  //call to spotify APi to shuffle
  const shufflePlaylist = ()=> {
    if(shuffle){
      spotify.setShuffle(false).then(()=>{
        setShuffle(false);
      })
    }else {
      spotify.setShuffle(true).then( ()=> {
        setShuffle(true);
      });
    }  
  }

  //Call to spotify API to change the volume 
  const handleChange = (event, newValue)=> {
    setValue(newValue);
    spotify.setVolume(newValue);
  }

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
       <div className="footer__commands">
      <ShuffleIcon className={shuffle ? "footer__green icon" : "footer__icon icon"} onClick={shufflePlaylist}/>
      <SkipPreviousIcon className="footer__icon icon" onClick={skipPrevious}/>
      {playing? (
        <PauseCircleOutlineIcon className="footer__icon __play icon" onClick={handlePlayPause}/>
      ): (
        <PlayCircleOutlineIcon className="footer__icon __play icon" onClick={handlePlayPause}/>
      )}
    
      <SkipNextIcon className="footer__icon icon" onClick={skipNext}/>
      <RepeatIcon className={repeat ? "footer__green icon" : "footer__icon icon"} onClick={repeatTrack}/>
      </div>
      <ProgressBar spotify={spotify}/>
     </div>
     <div className="footer__right">
         <PlaylistPlayIcon className="footer__right__icon icon"/>
         {value === 0 &&
         <VolumeOffOutlinedIcon className="footer__right__icon icon"/>}
         {value > 0 && value <=20 &&
         <VolumeMuteOutlinedIcon className="footer__right__icon icon"/>}
         {value > 20 && value <=60 &&
         <VolumeDownOutlinedIcon className="footer__right__icon icon"/>}
         {value > 60 &&
         <VolumeUpOutlinedIcon className="footer__right__icon icon"/>}
         <Slider 
         value={value} onChange={handleChange}/>
     </div>
    </div>
  )
}

export default Footer