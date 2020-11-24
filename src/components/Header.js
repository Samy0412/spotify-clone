import React from 'react'
import "../styles/Header.scss"
import SearchIcon from "@material-ui/icons/Search"
import {Avatar} from "@material-ui/core"
import {useDataLayerValue} from "./DataLayer"

function Header() {
  const[{user}, dispatch]= useDataLayerValue();

  return (
    <div className="header">
      <div className="header__left">
      <SearchIcon fontSize="large"/>
      <input placeholder="Search"
       type="text">
       </input>
      </div>
      <div className="header__right">
        {user?.images[0]? (<Avatar className ="header__avatar"src={user?.images[0].url} alt={user?.display_name}/>):((<Avatar className ="header__avatar"src="" alt={user?.display_name}/>))}
      
      <h4>{user?.display_name}</h4>
      </div>

      
    </div>
  )
}

export default Header
