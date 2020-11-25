import React, { useState } from 'react'
import '../styles/Body.scss'
import { useDataLayerValue } from './DataLayer'
import Header from './Header'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import SongRow from './SongRow'


function Body({spotify}) {

  const [{ selected_playlist, playlists, playing }, dispatch]=useDataLayerValue()
  const [selected,setSelected]= useState(false)

  let totalDuration = 0;

  selected_playlist?.tracks.items.map((item)=> (
    totalDuration +=item.track.duration_ms
  ))

  const durationString =`${(Math.floor((totalDuration/1000)/60/60))} h ${(Math.floor((totalDuration/1000/60)%60))>=10 ? (Math.floor((totalDuration/1000/60)%60)): "0"+(Math.floor((totalDuration/1000/60)%60))} min`

  const toggle = ()=> {
    selected ? setSelected(false) : setSelected(true);
  }

  const playPlaylist = () => {
      spotify
      .play({
        context_uri: `spotify:playlist:${selected_playlist.id}`,
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
        <img src={selected_playlist?.images[0].url} alt=""/>
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>{selected_playlist?.name}</h2>
          <p>{selected_playlist?.description}</p>
          <br></br>
          <p><strong>{selected_playlist?.owner.display_name}</strong> . {selected_playlist?.followers.total} like{(selected_playlist?.followers.total)>1 ? "s" : ""} . {selected_playlist?.tracks.total} songs, {durationString}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
        {!playing ? (
          <PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist}/>
        ): (
          <PauseCircleFilledIcon className="body__shuffle" onClick={pause}/>
        )}
        {!selected ? (<FavoriteBorderIcon onClick={toggle} className="emptyheart"/>): (<FavoriteIcon onClick={toggle} className="fullheart"/>)}
        <MoreHorizIcon className="more"/>
        </div>
        <div className="body__songslist">
        <SongRow playSong={playSong} pause={pause}/>
        </div>
      </div>
    </div>
  )
}

export default Body;
