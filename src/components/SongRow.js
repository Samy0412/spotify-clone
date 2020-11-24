import React from 'react'
import '../styles/SongRow.scss'
import { useDataLayerValue } from './DataLayer'
import moment from "moment";
import AccessTimeIcon from '@material-ui/icons/AccessTime';


function SongRow({playSong}) {
  moment.locale()
  const [{ discover_weekly }, dispatch]=useDataLayerValue()
  console.log("discover_weekly:",discover_weekly)
  return (
    <div>
     <table>
     <tr className="table__header">
       <th>#</th>
       <th>TITLE</th>
       <th>ALBUM</th>
       <th>ADDED AT</th>
       <th><AccessTimeIcon className="clock__icon"/></th>
     </tr>
     <tr className="empty__row"></tr>
    {discover_weekly?.tracks.items.map((item,index)=> (
      // <button className="songRow" onClick={()=> playSong(item.track.id)}>
      <tr className="songRow" onClick={()=> playSong(item.track.id)}>
      <td className="numero"><h3>{index+1}</h3></td>
      <td className="songRow__container">
        <img className="songRow__picture" src={item.track.album.images[0].url} alt={item.track.album.name}/>
        <div className="songRow__info">
        <h1>{item.track.name}</h1>
        <p>
          {item.track.artists.map(artist=> artist.name).join(",")} 
        </p>
        </div>
      </td> 
      <td className="songRow__album">
        <p>{item.track.album.name}</p>
      </td>
      <td className="songRow__added_at">
      <p>{moment(item.added_at).fromNow()}</p>
      </td>
      <td className="songRow__duration">
      <p>{(Math.floor((item.track.duration_ms/1000)/60))}:{(Math.floor((item.track.duration_ms/1000)%60))>=10 ? (Math.floor((item.track.duration_ms/1000)%60)): `0${(Math.floor((item.track.duration_ms/1000)%60))}`}</p>
      </td>
      </tr>
    // </button>
  
    ))}
     
    </table> 
    </div>
  )
  
}

export default SongRow
