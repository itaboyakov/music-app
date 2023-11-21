import {useContext} from 'react';
import { AudioContext } from '../../context/AudioContext';
import styles from "./Track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import cn from "classnames";
import { TrackType } from '../../types';

const Track = ({ track } : { track: TrackType}) => {
    const {preview, title, artists, duration} = track;

    const { handleToggleAudio, currentTrack, isPlaying }: {handleToggleAudio: (track: TrackType) => void, currentTrack:TrackType, isPlaying?: boolean} = useContext(AudioContext);

    const isCurrentTrack = currentTrack.id === track.id;
    const formatedDuration = secondsToMMSS(duration);

    return (
        <div className={cn(styles.track, isCurrentTrack && styles.playing)} onClick={() => handleToggleAudio(track)}>
            {/* <IconButton onClick={() => handleToggleAudio(track)} className={styles.playbtn}>
                {(isCurrentTrack && isPlaying) ? <Pause/> : <PlayArrow/>}
            </IconButton> */}
            <img className={styles.preview} src={preview} alt=""/>
            <div className={styles.credits}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <p>{formatedDuration}</p>
        </div>
    );
};

export default Track;