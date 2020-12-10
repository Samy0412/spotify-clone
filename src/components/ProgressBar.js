import React, {useEffect, useState} from 'react';
import { useDataLayerValue }  from './DataLayer'
import styled from "styled-components"

//Style sheet
import "../styles/Footer.scss"



const ProgressBarContainer = styled.div `
display: flex;
flex-direction: row;
align-items: baseline;`;

const Track = styled.div`
  width: 35vw;
  min-width: 25rem;
  height: 0.4rem;
  margin: 1.2rem 1rem 0 1rem;
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 1rem;
  `;

const Thumb = styled.div`
width: ${props =>props.percentage}%;
height: 0.4rem;
background-color: #acacac;
border-radius: 1rem;
transition: width 1s ease-in-out;
`;  

function ProgressBar({spotify}) {

  const [{playing, item, repeat}, dispatch]= useDataLayerValue();
  const [currentTrack, setCurrentTrack]=useState(null);
  const [progress,setProgress]=useState();
  const [id,setId] = useState(null);
  const [interv, setInterv]=useState();

  let __progress=currentTrack?.progress_ms;
  
  //Calculate the pourcentage of the song already played
  let __percentage = (progress/item?.duration_ms)*100;

 //calculate remaining time
  const calculateRemainingTime = ()=> {
    __progress +=1000;
    setProgress(__progress)
  }   
 //Set interval to calculate remaining time every second 
const start = ()=> {
 calculateRemainingTime();
 setInterv(setInterval(calculateRemainingTime,1000))
}
//Clear the interval
const stop = ()=> {
  clearInterval(interv);
}

 //get the current playback state with current progress, when opening the app
  useEffect(()=> {
    spotify.getMyCurrentPlaybackState().then((r) => {
      setCurrentTrack(r);
      setProgress(r.progress_ms)
      setId(r.item?.id); 
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      }) 
  });  
  },[])

  //handle the progress of the song when pausing or playing
  useEffect(() => {
    spotify.getMyCurrentPlayingTrack().then((r) => {
      setCurrentTrack(r);
      setProgress(r.progress_ms);
      __progress = r.progress_ms;
      if (playing){
        start();
      }else {stop()} 
    });
    
}, [playing]); 

  //handle the pogress of the song when changing song
  useEffect(() => {
    spotify.getMyCurrentPlayingTrack().then((r) => {
      setCurrentTrack(r);
      setProgress(r.progress_ms);
      __progress = r.progress_ms;
      if(r.item?.id != id){
        setId(r.item?.id);
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        })
        if(playing){
          stop();
          start();
        }
    }});  
  }, [item]);

  //Change the elapsed time dynamically
  useEffect(()=> {
    if(progress >= item?.duration_ms){
      if(repeat){
        stop();
        setProgress(0);
        __progress=0;
        setTimeout(()=> {
          spotify.getMyCurrentPlaybackState().then((r)=> {
            setCurrentTrack(r);
            setProgress(r.progress_ms);
            __progress= r.progress_ms;
            start();
          })
        },2000)
        
      }else {
        stop();
        setProgress(0);
        __progress=0;
        setTimeout(() => {
          spotify.getMyCurrentPlaybackState().then((r) => {
           if(!r.context){
            dispatch({
              type: "SET_PLAYING",
              playing: false,
            })
           }else {
            setCurrentTrack(r);
            dispatch({
              type: "SET_ITEM",
              item: r.item,
            })
           }
        });  
        }, 2000);  
      }  
    }
  },[progress])


  return (
    <ProgressBarContainer>
      <p className="time">{(Math.floor((progress/1000)/60))}:{(Math.floor((progress/1000)%60))>=10 ? (Math.floor((progress/1000)%60)): `0${(Math.floor((progress/1000)%60))}`}</p>
      <Track>
        <Thumb percentage={__percentage}></Thumb>
      </Track>
      <p className="time">{(Math.floor((item?.duration_ms/1000)/60))}:{(Math.floor((item?.duration_ms/1000)%60))>=10 ? (Math.floor((item?.duration_ms/1000)%60)): `0${(Math.floor((item?.duration_ms/1000)%60))}`}</p>
    </ProgressBarContainer>
  )
}

export default ProgressBar
