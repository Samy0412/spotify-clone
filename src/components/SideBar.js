import React from 'react'
import '../styles/Sidebar.scss'
import SideBarOption from './SideBarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useDataLayerValue } from './DataLayer';


function SideBar() {
  const [{playlists}, dispatch]= useDataLayerValue()
  
  return (
    <div className="sidebar">
      <img  className= "sidebar__logo" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify-logo"/>
      <SideBarOption title="Home" Icon={HomeIcon}/>
      <SideBarOption title="Search" Icon={SearchIcon}/>
      <SideBarOption title="Your library" Icon={LibraryMusicIcon}/>
      <br/>
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr/>
      <div className="sidebar__playlists">
      {playlists?.items.map((playlist) => (<SideBarOption title={playlist.name}/>)
      )}
      </div>
    </div>
  )
}

export default SideBar
