'use client';
import { useEffect } from "react";
import { useParams } from "next/navigation";
import MusicView from "../../Components/MusicView";
import { useMusic } from "../../Components/ContextProvider";

export default function MainView() {
  const {
    musics,
    currentMusic,
    setCurrentMusic,
    handleBack,
    playSong,
    handleSaveMusic,
    handleAddComment,
    handleDeleteComment,
    handleRateMusic,
    getComments,
  } = useMusic();
  const params = useParams();

  useEffect(() => {
    if (params.view) {
      const music = musics.find((m) => m.id === params.view);
      if (music) {
        setCurrentMusic(music);
      }
    }
  }, [params.view, musics, setCurrentMusic]);

  if (!currentMusic) {
    return <p>Music not found or loading...</p>;
  }

  return (
    <MusicView
      music={currentMusic}
      onPlaySong={playSong}
      onSave={handleSaveMusic}
      onAddComment={handleAddComment}
      onDeleteComment={handleDeleteComment}
      onRate={handleRateMusic}
      onGetComments={getComments}
      onBack={handleBack}
    />
  );
}