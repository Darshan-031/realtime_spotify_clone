import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const {currentSong, isPlaying, playNext} = usePlayerStore();

  //handle play/pause logic
  useEffect(()=>{
    if(isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  //handle song end
  useEffect(()=>{ 
    const audio = audioRef.current;
    const handleEnded = () => {
        playNext();
    };
    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  //handel song changes
  useEffect(() => {
    if(!audioRef.current || !currentSong)return;

    const audio = audioRef.current;
    //check if this is actullay new song
    const isSongChanged = prevSongRef.current !== currentSong?.audioUrl;
    if(isSongChanged){
      audio.src = currentSong?.audioUrl;
      //reset the playback position
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if(isPlaying)audio.play();
    }
  }, [currentSong, isPlaying]);


  return (
    <audio ref={audioRef} />
  )
}

export default AudioPlayer