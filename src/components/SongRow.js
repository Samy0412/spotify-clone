import React from 'react'
import '../styles/SongRow.scss'
import { useDataLayerValue } from './DataLayer'

function SongRow({playSong}) {

  const [{ discover_weekly }, dispatch]=useDataLayerValue()

  return (
    <div>
    {discover_weekly?.tracks.items.map((item,index)=> (
      <div className="songRow" onClick={()=> playSong(item.track.id)}>
        <h3>{index+1}</h3>
      <img className="songRow__album" src={item.track.album.images[0].url} alt={item.track.album.name}/>
      <div className="songRow__info">
        <h1>{item.track.name}</h1>
        <p>
          {item.track.artists.map(artist=> artist.name).join(",")}
          {item.track.album.name}
        </p>
      </div>
      
    </div>
    ))}
    </div>
  )
  
}

export default SongRow
