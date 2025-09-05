import { useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/SideBar";
import MusicGrid from "./Components/MusicGrid";
import Player from "./Components/Player";
import MusicForm from "./Components/MusicForm";
import MusicView from "./Components/MusicView";
import MusicBrowser from "./Components/MusicBrowser";
import YouTubeSearch from "./Components/YouTubeSearch";
import {
  getMusics,
  updateMusic,
  deleteMusic,
  createMusic,
  addCommentMusic,
  rateMusic,
  deleteComment,
  getComments,
  searchMusic,
} from "./lib/main";

export default function App() {
  const [musics, setMusics] = useState(getMusics());
  const [browseMusics, setBrowseMusics] = useState(undefined);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [editingMusic, setEditingMusic] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBrowseVisible, setIsBrowseVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSideBarVisible] = useState(false);
  const [song, setSong] = useState({
    url: null,
    title: "No song selected",
    artist: "---",
  });
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleSidebar() {
    setIsSideBarVisible(!isSidebarVisible);
  }

  function playSong(newSong) {
    setSong(newSong);
    setIsPlaying(true);
  }

  function togglePlay() {
    if (song.url) {
      setIsPlaying(!isPlaying);
    }
  }

  function handleMusicClick(music) {
    setCurrentMusic(music);
    if (window.innerWidth < 768) {
      setIsSideBarVisible(false);
    }
  }

  function handleBack() {
    setCurrentMusic(null);
    setBrowseMusics(undefined);
  }

  function showForm(music) {
    setIsFormVisible(true);
    setEditingMusic(music);
  }

  function hideForms() {
    setIsFormVisible(false);
    setEditingMusic(null);
    setIsBrowseVisible(false);
    setIsSearchVisible(false);
  }

  function showSearch() {
    setIsSearchVisible(true);
  }

  function handleMusicAdd(musicToAdd) {
    const { title, artist, url, cover } = musicToAdd;
    createMusic(title, artist, url, cover);
    setMusics(getMusics());
    hideForms();
  }

  function handleSaveMusic(musicToSave) {
    if (musicToSave.id) {
      // Update
      const { id, title, artist, url, cover, StarRating, comments } =
        musicToSave;
      updateMusic(id, title, artist, url, cover, StarRating, comments);
      setMusics(getMusics());
    }
    hideForms();
  }

  function handleDeleteMusic(musicId) {
    if (window.confirm("Are you sure?")) {
      deleteMusic(musicId);
      setMusics(getMusics());
    }
  }

  function handleAddComment(musicId, comment) {
    addCommentMusic(musicId, comment);
    setMusics(getMusics());
  }

  function handleDeleteComment(musicId, commentID) {
    deleteComment(musicId, commentID);
    setMusics(getMusics());
  }

  function handleRateMusic(musicId, rating) {
    rateMusic(musicId, rating);
    setMusics(getMusics());
  }

  function showBrowser() {
    setIsBrowseVisible(true);
  }

  function handleSearch(input) {
    setBrowseMusics(searchMusic(input) || []);
    hideForms();
  }

  return (
    <div className="fixed inset-0 bg-primary text-white flex flex-col">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          musics={musics}
          onMusicClick={handleMusicClick}
          onAddMusic={showSearch}
          onHomeClick={handleBack}
          onBrowseClick={showBrowser}
          isSidebarVisible={isSidebarVisible}
        />
        <div className="flex-1 min-w-0 flex flex-col min-h-0 p-6">
          {isFormVisible && (
            <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 pt-20">
              <MusicForm
                music={editingMusic}
                onSave={handleSaveMusic}
                onCancel={hideForms}
              ></MusicForm>
            </div>
          )}

          {isSearchVisible && (
            <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 pt-20">
              <YouTubeSearch onCancel={hideForms} onMusicAdd={handleMusicAdd} />
            </div>
          )}

          {isBrowseVisible && (
            <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center">
              <MusicBrowser onSearch={handleSearch} onCancel={hideForms} />
            </div>
          )}

          {currentMusic ? (
            <MusicView
              music={currentMusic}
              onBack={handleBack}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onRateMusic={handleRateMusic}
              onGetComments={getComments}
            />
          ) : (
            <MusicGrid
              musics={browseMusics || musics}
              onMusicClick={handleMusicClick}
              onPlaySong={playSong}
              onEdit={showForm}
              onDelete={handleDeleteMusic}
              onAddMusic={showSearch}
            />
          )}
        </div>
      </div>
      <Player song={song} isPlaying={isPlaying} onTogglePlay={togglePlay} />
    </div>
  );
}
