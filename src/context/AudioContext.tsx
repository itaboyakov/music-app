import { createContext, useState } from "react";
import trackList from "../assets/trackList";
import { TrackType } from "../types";

const audio = new Audio(trackList[0].src);

export const AudioContext = createContext({
    audio,
    currentTrack: trackList[0],
    isPlaying: false,
    handleToggleAudio: (_: TrackType) => {}
});

const AudioProvider = ({ children }: {children: React.ReactNode}) => {
    const [currentTrack, setCurrentTrack] = useState(trackList[0]);
    const [isPlaying, setPlaying] = useState(false);

    const handleToggleAudio = (track: TrackType) => {
        if (currentTrack.id !== track.id) {
            setCurrentTrack(track);
            setPlaying(true);
            audio.src = track.src;
            audio.currentTime = 0;
            audio.play();
            return;
        }
        if (isPlaying) {
            audio.pause();
            setPlaying(false);
        } else {
            audio.play();
            setPlaying(true);
        }
    }
    const value = { audio, currentTrack, isPlaying, handleToggleAudio}

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider;