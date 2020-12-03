import React, {useEffect, useState} from 'react'
import { useDataLayerValue }  from './DataLayer'

//style sheet
import "../styles/SideBarOption.scss"

//Material UI Icons
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';



function SideBarOption({title, Icon, id, spotify}) {

  const [{selected_playlist, playing}, dispatch]= useDataLayerValue()
  const [currentPlaylist, setCurrentPlaylist]=useState(null)
  const [mouseOver, setMouseOver]=useState(false)

  //get the current playing playlist id
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      setCurrentPlaylist(r.context?.uri.slice(17));
    });
  }, [selected_playlist,playing]);
  
  //find the playlist
  const setPlaylist = (id) => {
   
    spotify.getPlaylist(id).then ((response)=> {
      dispatch ({
        type:'SET_SELECTED_PLAYLIST',
        selected_playlist: response
      })
    })
  }
 
  const onMouseOver = ()=> {
   setMouseOver(true);
  }

  const onMouseLeave =()=> {
    setMouseOver(false);
  }

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

  return (
    <div className="sidebaroption"> 
     {Icon && <Icon className="sidebaroption__icon"/>}
     {Icon ? (<h4>{title}</h4>) : (<div className="playlist-name"><p className={id === selected_playlist?.id ? "white": ""} onClick={()=>setPlaylist(id)}>{title}</p>{!mouseOver ? (<VolumeUpIcon onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={currentPlaylist === id && playing ? "visible": "invisible"}/>):(<PauseCircleOutlineIcon className="sidebar__icon__pause icon" onClick={handlePlayPause} onMouseLeave={onMouseLeave}/>)}</div>)}  
    </div>
  )
}

export default SideBarOption

