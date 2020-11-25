import React, {useState} from 'react'
import '../styles/SongRow.scss'
import { useDataLayerValue } from './DataLayer'
import moment from "moment";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';


function SongRow({playSong, pause}) {

  const [{ discover_weekly, item, playing }, dispatch]=useDataLayerValue()
  const [play, setPlay]=useState(null)
  const [index, setIndex]=useState(null);
  const [selected, setSelected]= useState(null);
  // console.log("discover_weekly:",discover_weekly)

  const onMouseOver = (index, id) => {
    if (id === item?.id && playing){
      setPlay(<PauseIcon className="playArrow" onClick={()=> pause()}/>)
    }else {
      setPlay(<PlayArrowIcon className="playArrow" onClick={()=> playSong(id)}/>);
    }
      setIndex(index);
  }
  const onMouseLeave= (index)=> {
      setPlay((index+1));
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
      {discover_weekly?.tracks.items.map((_item,_index)=> (
        
          <tr className={selected === _index ? "songRowSelected" : "songRow"}   onMouseOver={()=>onMouseOver(_index,_item.track.id)} onMouseLeave={()=>onMouseLeave(_index)}> 
        <td className={item?.id === _item.track.id ? "numero green" : "numero"}><h3>{_index === index ? play : (_index+1)}</h3></td>
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
