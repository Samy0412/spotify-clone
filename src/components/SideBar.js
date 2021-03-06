
import React from 'react'
import '../styles/Sidebar.scss'
import SideBarOption from './SideBarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useDataLayerValue } from './DataLayer';


function SideBar({spotify}) {
  const [{playlists, locale}, dispatch]= useDataLayerValue()
 

  return (
    <div className="sidebar">
      <div className="menu">
      <img  className= "sidebar__logo" src="/Spotify_Logo_RGB_White.png" alt="spotify-logo"/>
      {locale === "fr"? 
      <div>
      <SideBarOption title="Accueil" Icon={HomeIcon} spotify={spotify}/>
      <SideBarOption title="Rechercher" Icon={SearchIcon} spotify={spotify}/>
      <SideBarOption title="Bibliothèque" Icon={LibraryMusicIcon} spotify={spotify}/>
      </div>
      :
      <div>
      <SideBarOption title="Home" Icon={HomeIcon} spotify={spotify}/>
      <SideBarOption title="Search" Icon={SearchIcon} spotify={spotify}/>
      <SideBarOption title="Your library" Icon={LibraryMusicIcon} spotify={spotify}/>
      </div>
      }
      
      <br/>
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr/>
      </div>
      <div className="sidebar__playlists">
      {playlists?.items.map((playlist) => (<SideBarOption title={playlist.name} id={playlist.id} spotify={spotify}/>)
      )}
      </div>
    </div>
  )
}

export default SideBar