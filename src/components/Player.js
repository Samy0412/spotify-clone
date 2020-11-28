import React from 'react'
import "../styles/Player.scss"
import Body from './Body'
import Footer from './Footer'
import SideBar from './SideBar'

function Player({spotify}) {
  return (
    <div className="player">
      <div className="player__body">
      <SideBar/>
      <Body spotify={spotify}/>
      </div>

      <Footer spotify={spotify}/>
    </div>
  )
}

export default Player