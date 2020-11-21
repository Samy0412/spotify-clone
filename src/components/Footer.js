import React from 'react'
import "../styles/Footer.scss"
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay"
import VolumeDownIcon from "@material-ui/icons/VolumeDown"
import {Grid, Slider} from "@material-ui/core"


function Footer() {
  return (
    <div className="footer">
     <div className="footer__left">
       <img src="" alt="" className="footer__album__logo"/>
       <div className="footer__songInfo">
       <h4>Yeah!</h4>
       <p>Usher</p>
       </div>
     </div>
     <div className="footer__center">
      <ShuffleIcon className="footer__green icon"/>
      <SkipPreviousIcon className="footer__icon icon"/>
      <PlayCircleOutlineIcon className="footer__icon __play icon"/>
      <SkipNextIcon className="footer__icon icon"/>
      <RepeatIcon className="footer__green icon"/>
     </div>
     <div className="footer__right">
       {/* <Grid  container spacing={2}>
         <Grid item> */}
         <PlaylistPlayIcon className="footer__right__icon icon"/>
         {/* </Grid>
         <Grid item> */}
         <VolumeDownIcon className="footer__right__icon icon"/>
         {/* </Grid>
         <Grid item xs> */}
         <Slider className="footer__right__icon"/>
         {/* </Grid>
       </Grid> */}
     </div>
    </div>
  )
}

export default Footer
