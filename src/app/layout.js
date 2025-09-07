'use client';
import "./global.css";
import { MusicProvider, useMusic } from "../Components/MusicProvider";
import Header from "../Components/Header";
import Sidebar from "../Components/SideBar";
import MusicForm from "../Components/MusicForm";
import YouTubeSearch from "../Components/YouTubeSearch";
import MusicBrowser from "../Components/MusicBrowser";
import Player from "../Components/Player";

function AppUI({ children }) {
  const {
    musics,
    song,
    isPlaying,
    isSidebarVisible,
    isFormVisible,
    isSearchVisible,
    isBrowseVisible,
    editingMusic,
    handleMusicClick,
    showSearch,
    handleBack,
    showBrowser,
    toggleSidebar,
    togglePlay,
    handleSaveMusic,
    hideForms,
    handleMusicAdd,
    handleSearch,
  } = useMusic();

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
              />
            </div>
          )}

          {isSearchVisible && (
            <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 pt-20">
              <YouTubeSearch
                onCancel={hideForms}
                onMusicAdd={handleMusicAdd}
              />
            </div>
          )}

          {isBrowseVisible && (
            <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center">
              <MusicBrowser onSearch={handleSearch} onCancel={hideForms} />
            </div>
          )}

          {children}
        </div>
      </div>
      <Player song={song} isPlaying={isPlaying} onTogglePlay={togglePlay} />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MusicProvider>
          <AppUI>{children}</AppUI>
        </MusicProvider>
      </body>
    </html>
  );
}