import { useState } from "react";
import tracksList from "../../assets/trackList";
import Track from "../../components/Track/Track";
import style from "./MainPage.module.scss"
import { Input } from "@mui/material";

const runSearch = (query: string) => {
    if(!query) {
        return tracksList
    }
    return tracksList.filter((track) => track.artists.toLocaleLowerCase().includes(query) || track.title.toLocaleLowerCase().includes(query))
}

const MainPage = () => {
    const [tracks, setTracks] = useState(tracksList);
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value: string = event?.target?.value?.toLocaleLowerCase() || '';
        setTracks(runSearch(value));
    }
    return (
        <div className={style.search}>
            <Input className={style.input} placeholder="Поиск треков" onChange={handleInputChange}/>
            <div className={style.list}>
                {tracks.map((track) => 
                    <Track track={track} key={track.id}/>
                )}
            </div>
        </div>
    );
};

export default MainPage;