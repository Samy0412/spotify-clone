import React, {useEffect, useState} from 'react';
import { useDataLayerValue }  from './DataLayer'
import styled from "styled-components"
import "../styles/ProgressBar.scss"

const ProgressBarContainer = styled.div `
display: flex;
flex-direction: row;
align-items: baseline;`;

const Track = styled.div`
  width: 35vw;
  min-width: 25rem;
  height: 0.4rem;
  margin: 1.2rem 1rem 0 1rem;
  background-color: gray;
  border-radius: 1rem;
  `;

const Thumb = styled.div`
width: ${props =>props.percentage}%;
height: 0.4rem;
background-color: lightgray;
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

  let __percentage = (progress/item?.duration_ms)*100;


  useEffect(()=> {
    spotify.getMyCurrentPlaybackState().then((r) => {
      setCurrentTrack(r);
      console.log(currentTrack)
      setProgress(r.progress_ms)
      setId(r.item?.id);  
  });
    
  },[])

  const calculateRemainingTime = ()=> {
      __progress +=1000;
      setProgress(__progress)
    }   
 const start = ()=> {
   calculateRemainingTime();
   setInterv(setInterval(calculateRemainingTime,1000))
 }
 const stop = ()=> {
    clearInterval(interv);
 }

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

  
  useEffect(() => {
    spotify.getMyCurrentPlayingTrack().then((r) => {
      setCurrentTrack(r);
      setProgress(r.progress_ms);
      __progress = r.progress_ms;
      if(r.item?.id != id){
        setId(r.item?.id);
        if(playing){
          stop();
          start();
        }
    }});  
  }, [item]);

  useEffect(()=> {
    if(progress >= item?.duration_ms){
      if(repeat){
        stop();
        __progress=0;
        start();
      }else {
        stop();
        setProgress(0);
        __progress=0;
        if(item?.type === "track"){
        dispatch({
          type: "SET_PLAYING",
          playing: false,
        })
        }  
      }  
    }
    
  },[progress])


  return (
    <ProgressBarContainer>
      <p>{(Math.floor((progress/1000)/60))}:{(Math.floor((progress/1000)%60))>=10 ? (Math.floor((progress/1000)%60)): `0${(Math.floor((progress/1000)%60))}`}</p>
      <Track>
        <Thumb percentage={__percentage}></Thumb>
      </Track>
      <p>{(Math.floor((item?.duration_ms/1000)/60))}:{(Math.floor((item?.duration_ms/1000)%60))>=10 ? (Math.floor((item?.duration_ms/1000)%60)): `0${(Math.floor((item?.duration_ms/1000)%60))}`}</p>
    </ProgressBarContainer>
  )
}

export default ProgressBar
