import React, {useState} from 'react'
import {useDataLayerValue} from "./DataLayer"


//Style sheet
import "../styles/Header.scss"

//material UI components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

//material UI icons
import SearchIcon from "@material-ui/icons/Search"
import {Avatar} from "@material-ui/core"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';



function Header() {
  const[{user, locale}, dispatch]= useDataLayerValue();
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (!anchorEl){
      setAnchorEl(event.currentTarget);
    }else {
      setAnchorEl(null);
    }
  };

  return (
    <div className="header">
      <div className="header__left">
      <SearchIcon fontSize="large"/>
      <input placeholder={locale === "fr" ? "Rechercher" : "Search"}
       type="text">
       </input>
      </div>
    <div className="header__right" >
    <Button
        aria-controls="simple-menu" 
        aria-haspopup="true"
        onClick={handleClick}
        disableElevation
        disableRipple
        disableFocusRipple
        variant="text"
      >
        <div className="header__right__button" >
          {user?.images[0]? (<Avatar className ="header__avatar"src={user?.images[0].url} alt={user?.display_name}/>):((<Avatar className ="header__avatar"src="" alt={user?.display_name}/>))}
          <h4>{user?.display_name}</h4>
          {!anchorEl ? (<ArrowDropDownIcon fontSize="large" className="arrow_icon"/>):(<ArrowDropUpIcon fontSize="large" className="arrow_icon"/>)}
        </div>
      </Button> 
    <Menu
      id="simple-menu"
      TransitionComponent={Fade}
      anchorEl={anchorEl}
      keepMounted
      open={anchorEl}
      >
      <MenuItem 
      disableRipple>
      <a href="/">
      <h4> Sign out</h4>
      </a>
      </MenuItem>
      </Menu>
      </div>
       
    </div>
  )
}

export default Header
