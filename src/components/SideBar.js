
import React from 'react'
import '../styles/Sidebar.scss'
import SideBarOption from './SideBarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useDataLayerValue } from './DataLayer';


function SideBar() {
  const [{playlists}, dispatch]= useDataLayerValue()
  console.log("playlists:",playlists)

  return (
    <div className="sidebar">
      <div className="menu">
      <img  className= "sidebar__logo" src="/Spotify_Logo_RGB_White.png" alt="spotify-logo"/>
      <SideBarOption title="Home" Icon={HomeIcon}/>
      <SideBarOption title="Search" Icon={SearchIcon}/>
      <SideBarOption title="Your library" Icon={LibraryMusicIcon}/>
      <br/>
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr/>
      </div>
      <div className="sidebar__playlists">
      {playlists?.items.map((playlist) => (<SideBarOption title={playlist.name} id={playlist.id}/>)
      )}
      </div>
    </div>
  )
}

export default SideBar