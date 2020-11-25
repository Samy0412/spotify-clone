import React from 'react'
import "../styles/SideBarOption.scss"
import SpotifyWebApi from "spotify-web-api-js"
import { useDataLayerValue }  from './DataLayer'


const spotify = new SpotifyWebApi()

function SideBarOption({title, Icon, id}) {

  const [{selected_playlist}, dispatch]= useDataLayerValue()

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
     {Icon ? <h4>{title}</h4> : <p className={id === selected_playlist?.id ? "white": ""} onClick={()=>setPlaylist(id)}>{title}</p>}  
    </div>
  )
}

export default SideBarOption
