import React, {useEffect, useState} from 'react';
import { useDataLayerValue }  from './DataLayer'
import "../styles/ProgressBar.scss"

function ProgressBar({spotify}) {

  const [{currentTrack, playing}, dispatch]= useDataLayerValue()
  const [progress,setProgress]=useState(currentTrack?.progress_ms);
  const [id,setId] = useState(null)
  console.log("songId:",id)
  console.log("currentTrack:",currentTrack)
  
  let remainingDefault = currentTrack?.item?.duration_ms-progress;
  

  useEffect(()=> {
    spotify.getMyCurrentPlayingTrack().then((r) => {
    setProgress(currentTrack?.progress_ms)});
    setId(currentTrack?.item?.id);
  },[])

  useEffect(() => {
    if (playing){
      const interval = setInterval(() => {
          calculateRemainingTime();  
      }, 1000);
      
      return () => clearInterval(interval);
    }
}, [playing]); 

  console.log("progress:",progress)
  console.log("total duration:",currentTrack?.item?.duration_ms)
  

  useEffect(() => {
    spotify.getMyCurrentPlayingTrack().then((r) => {
      setProgress(currentTrack?.progress_ms)});

    if(currentTrack?.item?.id != id) {
      setId(currentTrack?.item?.id);
        setProgress(0);
    }
  }, [currentTrack]);

    
  let remaining = remainingDefault;
  const calculateRemainingTime = ()=> {
      remaining -=1000;
      setProgress(currentTrack?.item?.duration_ms - remaining)
      remainingDefault = currentTrack?.item?.duration_ms-progress; 
    }   

  return (
    <div className="progressbar">
      <p>{(Math.floor((progress/1000)/60))}:{(Math.floor((progress/1000)%60))>=10 ? (Math.floor((progress/1000)%60)): `0${(Math.floor((progress/1000)%60))}`}</p>
      <div className="track">
        <div className="thumb"></div>
      </div>
      <p>{(Math.floor((currentTrack?.item?.duration_ms/1000)/60))}:{(Math.floor((currentTrack?.item?.duration_ms/1000)%60))>=10 ? (Math.floor((currentTrack?.item?.duration_ms/1000)%60)): `0${(Math.floor((currentTrack?.item?.duration_ms/1000)%60))}`}</p>
    </div>
  )
}

export default ProgressBar
