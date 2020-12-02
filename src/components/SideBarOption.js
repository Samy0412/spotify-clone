import React, {useEffect, useState} from 'react'
import { useDataLayerValue }  from './DataLayer'

//style sheet
import "../styles/SideBarOption.scss"

//Material UI Icons
import VolumeUpIcon from '@material-ui/icons/VolumeUp';



function SideBarOption({title, Icon, id, spotify}) {

  const [{selected_playlist, playing}, dispatch]= useDataLayerValue()
  const [currentPlaylist, setCurrentPlaylist]=useState(null)

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
 

  return (
    <div className="sidebaroption"> 
     {Icon && <Icon className="sidebaroption__icon"/>}
     {Icon ? (<h4>{title}</h4>) : (<div className="playlist-name"><p className={id === selected_playlist?.id ? "white": ""} onClick={()=>setPlaylist(id)}>{title}</p><VolumeUpIcon className={currentPlaylist === id && playing ? "visible": "invisible"}/></div>)}  
    </div>
  )
}

export default SideBarOption