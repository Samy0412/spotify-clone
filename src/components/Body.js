import React from 'react'
import '../styles/Body.scss'
import { useDataLayerValue } from './DataLayer'
import Header from './Header'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteIcon from "@material-ui/icons/Favorite"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import SongRow from './SongRow'


function Body({spotify}) {

  const [{ discover_weekly, playing }, dispatch]=useDataLayerValue()

  const playPlaylist = () => {
      spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcRreqHOjMk0H`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });  
  };
  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const pause = ()=>{
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });}
    }
  
  return (
    <div className="body">
      <Header spotify={spotify}/>

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt=""/>
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
        {!playing ? (
          <PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist}/>
        ): (
          <PauseCircleFilledIcon className="body__shuffle" onClick={pause}/>
        )}
        <FavoriteIcon fontSize="large"/>
        <MoreHorizIcon fontSize="large"/>
        </div>
        <div className="body__songslist">
        <SongRow playSong={playSong} pause={pause}/>
        </div>
      </div>
    </div>
  )
}

export default Body;
