'use client';
import MusicGrid from "./MusicGrid";
import { useMusic } from "./ContextProvider";

export default function MusicGridClient() {
  const {
    musics,
    browseMusics,
    handleMusicClick,
    playSong,
    showForm,
    handleDeleteMusic,
    showSearch,
  } = useMusic();

  return (
    <MusicGrid
      musics={browseMusics || musics}
      onMusicClick={handleMusicClick}
      onPlaySong={playSong}
      onEdit={showForm}
      onDelete={handleDeleteMusic}
      onAddMusic={showSearch}
    />
  );
}
