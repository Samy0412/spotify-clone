import React, {useState} from 'react'
import { useDataLayerValue } from './DataLayer'
import moment from "moment";
import gsap from "gsap";

//Style sheet
import '../styles/SongRow.scss'

//Material Ui Icons
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';


function SongRow({playSong, pause, spotify }) {

  const [{ selected_playlist, playing, item }, dispatch]=useDataLayerValue()
  const [icon, setIcon]=useState(null)
  const [index, setIndex]=useState(null);
  const [selected, setSelected]= useState(null);


//Logic for the animation bars when song is playing

const tl = gsap.timeline({repeat: -1});

tl.to(".one", {height:"65%", duration:0.3,ease:"sine.out" });
tl.to(".one", {height:"100%", duration:0.3,ease:"sine.out" });
tl.to(".one", {height:"10%", duration:0.3,ease:"sine.out" });


const tl2 = gsap.timeline({repeat: -1, delay:0.2});

tl2.to(".three", {height:"65%", duration:0.3,ease:"sine.out"});
tl2.to(".three", {height:"100%", duration:0.3,ease:"sine.out"});
tl2.to(".three", {height:"10%", duration:0.3,ease:"sine.out"});

const tl3 = gsap.timeline({repeat: -1, delay:0.4});

tl3.to(".two", {height:"65%", duration:0.3,ease:"sine.out" });
tl3.to(".two", {height:"100%", duration:0.3,ease:"sine.out"});
tl3.to(".two", {height:"10%", duration:0.3,ease:"sine.out"});

const tl4 = gsap.timeline({repeat: -1, delay:0.8});

tl4.to(".four", {height:"65%", duration:0.3,ease:"sine.out"});
tl4.to(".four", {height:"100%", duration:0.3,ease:"sine.out"});
tl4.to(".four", {height:"10%", duration:0.3,ease:"sine.out"});

///////////////////////////////

//set up to see either a pause of play Icon when hovering the track
  const onMouseOver = (index, id) => {
    if (id === item?.id && playing){
      setIcon(<PauseIcon className="playArrow" onClick={()=> pause()}/>)
    }else {
      setIcon(<PlayArrowIcon className="playArrow" onClick={()=> playSong(id)}/>);
    }
      setIndex(index);
  }
 
  //set up to see the number of the track when not hovering on it
  const onMouseLeave= ()=> {
       setIndex(null);
    }
    
    const firstField = (_item,_index)=> {

      let firstField;
      if(item?.id === _item.track.id && playing && _index === index){
        firstField = <td className="numero">{icon} </td>
      }else if (item?.id === _item.track.id && playing){
        firstField = (<td className="numero">
          <div class="animation-container">
            <div class="bar one"></div>
            <div class="bar two"></div>
            <div class="bar three"></div>
            <div class="bar four"></div>
          </div>
          </td>)
      }else {
        firstField = <td className={item?.id === _item.track.id ? "numero green" : "numero"}><h3>{_index === index ? icon : (_index+1)}</h3></td>
      }
      return firstField;
    }
    return (
      <div>
       <table>
       <tr className="table__header">
         <th>#</th>
         <th>TITLE</th>
         <th>ALBUM</th>
         <th>ADDED AT</th>
         <th>DURATION</th>
       </tr>
       <tr className="empty__row"></tr>
      {selected_playlist?.tracks.items.map((_item,_index)=> (
        
        <tr className={selected === _index ? "songRowSelected" : "songRow"}   onMouseOver={()=>onMouseOver(_index,_item.track.id)} onMouseLeave={()=>onMouseLeave()}> 
          
          {firstField(_item,_index)}
          
        <td className="songRow__container" onClick={()=>setSelected(_index)}>
          <img className="songRow__picture" src={_item.track.album.images[0].url} alt={_item.track.album.name}/>
          <div className={item?.id === _item.track.id ? "songRow__info green" : "songRow__info"}>
          <h1>{_item.track.name}</h1>
          <p>
            {_item.track.artists.map(artist=> artist.name).join(",")} 
          </p>
          </div>
        </td> 
        <td className="songRow__album" onClick={()=>setSelected(_index)}>
          <p>{_item.track.album.name}</p>
        </td>
        <td className="songRow__added_at" onClick={()=>setSelected(_index)}>
        <p>{moment(_item.added_at).fromNow()}</p>
        </td>
        <td className="songRow__duration" onClick={()=>setSelected(_index)}>
        <p>{(Math.floor((_item.track.duration_ms/1000)/60))}:{(Math.floor((_item.track.duration_ms/1000)%60))>=10 ? (Math.floor((_item.track.duration_ms/1000)%60)): `0${(Math.floor((_item.track.duration_ms/1000)%60))}`}</p>
        </td>
        </tr>
    
      ))}
       
      </table> 
      </div>
    )

  
}

export default SongRow