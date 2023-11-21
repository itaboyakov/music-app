import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioContext";
import styles from "./Playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";

const TimeControls = () => {
    const {audio, currentTrack} = useContext(AudioContext);
    const { duration } = currentTrack;

    const [currentTime, setCurrentTime] = useState(0);
    const formatedCurrentTime = secondsToMMSS(currentTime);
    const sliderCurrentTime = Math.round(currentTime / duration * 100);
    const handlerChangeCurrentTime = (event: Event, value: number | number[]) => {
        if (Array.isArray(value)) value = value[0];
        const time = Math.round(value / 100 * duration);
        setCurrentTime(time);
        audio.currentTime = time;
    }
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 1000)
        return () => {
            clearInterval(timeInterval);
        }
    }, []);
  
    return (
        <>
            <p>{formatedCurrentTime}</p>
            <Slider step={1} min={0} max={100} value={sliderCurrentTime} onChange={handlerChangeCurrentTime}/>
            
        </>
    )
}
const Playbar = () => {
    const { currentTrack, handleToggleAudio, isPlaying } = useContext(AudioContext);
    const { preview, title, artists, duration } = currentTrack;
    const formatedDuration = secondsToMMSS(duration);

    return (
         currentTrack ? 
            (<div className={styles.playbar}>
                <img className={styles.preview} src={preview} alt=""/>
                <IconButton onClick={() => handleToggleAudio(currentTrack)} className={styles.playbtn}>
                    {isPlaying ? <Pause/> : <PlayArrow/>}
                </IconButton>
                <div className={styles.info_block}>
                    <div className={styles.credits}>
                        <b>{title}</b>
                        <p>{artists}</p>
                    </div>
                    <div className={styles.slider}>
                        <TimeControls/>
                        <p>{formatedDuration}</p>
                    </div>
                </div>
            </div>) : (<></>)
    );
};

export default Playbar;