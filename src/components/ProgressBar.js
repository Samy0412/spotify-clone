// import React, {useEffect, useState} from 'react';
// import { useDataLayerValue }  from './DataLayer'
// import "../styles/ProgressBar.scss"

// function ProgressBar({spotify}) {

//   const [{item, playing}, dispatch]= useDataLayerValue()
//   const [progress,setProgress]=useState();
//   const [id,setId] = useState(null)
//   // console.log("songId:",id)
//   // console.log("currentTrack:",currentTrack)
  
//   let remainingDefault = currentTrack?.item?.duration_ms-progress;
  

//   useEffect(()=> {
//     spotify.getMyCurrentPlaybackState().then((r) => {
//     setProgress(r.progress_ms)
//     setId(r.item.id);  
//   });
    
//   },[])

//   useEffect(() => {
//     if (playing){
//       const interval = setInterval(() => {
//           calculateRemainingTime();  
//       }, 1000);
      
//       return () => clearInterval(interval);
//     }
// }, [playing]); 

//   // console.log("progress:",progress)
//   // console.log("total duration:",currentTrack?.item?.duration_ms)
  

//   useEffect(() => {
//     spotify.getMyCurrentPlaybackState().then((r) => {
//       setProgress(r.progress_ms)});

//     if(item?.id != id) {
//       setId(item.id);
//         setProgress(0);
//     }
//   }, [item]);

    
//   let remaining = remainingDefault;
//   const calculateRemainingTime = ()=> {
//       remaining -=1000;
//       setProgress(currentTrack?.item?.duration_ms - remaining)
//       remainingDefault = currentTrack?.item?.duration_ms-progress; 
//     }   

//   return (
//     <div className="progressbar">
//       <p>{(Math.floor((progress/1000)/60))}:{(Math.floor((progress/1000)%60))>=10 ? (Math.floor((progress/1000)%60)): `0${(Math.floor((progress/1000)%60))}`}</p>
//       <div className="track">
//         <div className="thumb"></div>
//       </div>
//       <p>{(Math.floor((currentTrack?.item?.duration_ms/1000)/60))}:{(Math.floor((currentTrack?.item?.duration_ms/1000)%60))>=10 ? (Math.floor((currentTrack?.item?.duration_ms/1000)%60)): `0${(Math.floor((currentTrack?.item?.duration_ms/1000)%60))}`}</p>
//     </div>
//   )
// }

// export default ProgressBar
