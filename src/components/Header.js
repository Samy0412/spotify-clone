import React, {useState} from 'react'
import {useDataLayerValue} from "./DataLayer"


//Style sheet
import "../styles/Header.scss"

//material Ui icons
import SearchIcon from "@material-ui/icons/Search"
import {Avatar} from "@material-ui/core"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


//ReactStrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";



function Header() {
  const[{user}, dispatch]= useDataLayerValue();
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="header">
      <div className="header__left">
      <SearchIcon fontSize="large"/>
      <input placeholder="Search"
       type="text">
       </input>
      </div>
    <div className="header__right">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        >
        <DropdownToggle>
          <div className="header__right__button">
          {user?.images[0]? (<Avatar className ="header__avatar"src={user?.images[0].url} alt={user?.display_name}/>):((<Avatar className ="header__avatar"src="" alt={user?.display_name}/>))}
          <h4>{user?.display_name}</h4>
          {dropdownOpen ? (<ArrowDropDownIcon fontSize="large" className="arrow_icon"/>):(<ArrowDropUpIcon fontSize="large" className="arrow_icon"/>)}
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          <a href="/">
            <DropdownItem className="button-layout">
              <h4> Sign out</h4>
            </DropdownItem>
          </a>
        </DropdownMenu>
      </Dropdown>
      </div>
       
    

      
    </div>
  )
}

export default Header
