import {useContext} from 'react';
import { AudioContext } from '../../context/AudioContext';
import styles from "./Track.module.scss";
import secondsToMMSS from "../../utils/secondsToMMSS";
import cn from "classnames";
import { TrackType } from '../../types';

const Track = ({ track } : { track: TrackType}) => {
    const {preview, title, artists, duration} = track;
    const { handleToggleAudio, currentTrack } : {handleToggleAudio: (track: TrackType) => void, currentTrack:TrackType} = useContext(AudioContext);

    const isCurrentTrack = currentTrack.id === track.id;
    const formatedDuration = secondsToMMSS(duration);

    return (
        <div className={cn(styles.track, isCurrentTrack && styles.playing)} onClick={() => handleToggleAudio(track)}>
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