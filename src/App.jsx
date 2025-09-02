import { Component } from 'react';
import Header from './Components/Header';
import Sidebar from './Components/SideBar';
import MusicGrid from './Components/MusicGrid';
import Player from './Components/Player';
import MusicView from './Components/MusicView';
import MusicForm from './Components/MusicForm';
import MusicBrowser from './Components/MusicBrowser';
import YouTubeSearch from './Components/YouTubeSearch';
import {
  getMusics, updateMusic, deleteMusic,
  createMusic, addCommentMusic, rateMusic,
  deleteComment, getComments, searchMusic
} from './lib/main';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: getMusics(),
      browseMusics: undefined,
      currentMusic: null,
      editingMusic: null,
      isBrowseVisible: false,
      isFormVisible: false,
      isSearchVisible: false,

      isSidebarVisible: false,
      song: {
        url: null,
        title: 'No song selected',
        artist: '---',
      },
      isPlaying: false,
    };
    this.playSong = this.playSong.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleMusicClick = this.handleMusicClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSaveMusic = this.handleSaveMusic.bind(this);
    this.handleDeleteMusic = this.handleDeleteMusic.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForms = this.hideForms.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleRateMusic = this.handleRateMusic.bind(this);
    this.showBrowser = this.showBrowser.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.handleMusicAdd = this.handleMusicAdd.bind(this);
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarVisible: !prevState.isSidebarVisible,
    }));
  }

  playSong(newSong) {
    this.setState({
      song: newSong,
      isPlaying: true,
    });
  }

  togglePlay() {
    if (this.state.song.url) {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying,
      }));
    }
  }

  handleMusicClick(music) {
    this.setState({ currentMusic: music });
    if (window.innerWidth < 768) {
      this.setState({ isSidebarVisible: false });
    }
  }

  handleBack() {
    this.setState({ currentMusic: null, browseMusics: undefined });
  }

  showForm(music = null) {
    this.setState({ isFormVisible: true, editingMusic: music });
  }

  hideForms() {
    this.setState({ isFormVisible: false, editingMusic: null, isBrowseVisible: false, isSearchVisible: false });
  }

  showSearch() {
    this.setState({ isSearchVisible: true });
  }

  handleMusicAdd(musicToAdd) {
    createMusic(musicToAdd.title, musicToAdd.artist, musicToAdd.url, musicToAdd.cover);
    this.setState({ musics: getMusics() });
    this.hideForms();
  }

  handleSaveMusic(musicToSave) {
    if (musicToSave.id) { // Update
      updateMusic(musicToSave.id, musicToSave.title, musicToSave.artist, musicToSave.url, musicToSave.cover)
      this.setState({ musics: getMusics() })
    }
    this.hideForms();
  }

  handleDeleteMusic(musicId) {
    if (window.confirm('Are you sure?')) {
      deleteMusic(musicId)
      this.setState({ musics: getMusics() })
    }
  }

  handleAddComment(musicId, comment) {
    addCommentMusic(musicId, comment);
    this.setState({ musics: getMusics() });
  }

  handleDeleteComment(musicId, commentID) {
    deleteComment(musicId, commentID);
    this.setState({ musics: getMusics() });
  }

  handleRateMusic(musicId, rating) {
    rateMusic(musicId, rating);
    this.setState({ musics: getMusics() });
  }

  showBrowser() {
    this.setState({ isBrowseVisible: true })
  }

  handleSearch(input) {
    this.setState({ browseMusics: (searchMusic(input) || []) })
    this.hideForms()
  }

  render() {
    const { song, browseMusics, isPlaying, currentMusic, musics, isFormVisible, isBrowseVisible, editingMusic, isSidebarVisible, isSearchVisible } = this.state;
    return (
      <div className="fixed inset-0 bg-primary text-white flex flex-col">
        <Header onToggleSidebar={this.toggleSidebar} />
        <div className="flex flex-1 min-h-0">
          <Sidebar
            musics={musics}
            onMusicClick={this.handleMusicClick}
            onAddMusic={this.showSearch}
            onHomeClick={this.handleBack}
            onBrowseClick={this.showBrowser}
            isSidebarVisible={isSidebarVisible}
          />
          <div className="flex-1 min-w-0 flex flex-col min-h-0 p-6">
            {isSearchVisible && (

              <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 pt-20">
                <YouTubeSearch
                  onCancel={this.hideForms}
                  onMusicAdd={this.handleMusicAdd}
                />
              </div>
            )}

            {isFormVisible && (
              <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
                <MusicForm
                  music={editingMusic}
                  onSave={this.handleSaveMusic}
                  onCancel={this.hideForms}
                />
              </div>
            )}

            {isBrowseVisible && (
              <div className='fixed inset-0 bg-black/75 z-50 flex items-center justify-center'>
                <MusicBrowser
                  musics={musics}
                  onSearch={this.handleSearch}
                  onCancel={this.hideForms}
                />
              </div>
            )}

            {currentMusic ? (
              <MusicView
                music={currentMusic}
                onBack={this.handleBack}
                onAddComment={this.handleAddComment}
                onDeleteComment={this.handleDeleteComment}
                onRateMusic={this.handleRateMusic}
                onGetComments={getComments}
              />
            ) : (
              <MusicGrid
                musics={(browseMusics || musics)}
                onMusicClick={this.handleMusicClick}
                onPlaySong={this.playSong}
                onEdit={this.showForm}
                onDelete={this.handleDeleteMusic}
                onAddMusic={this.showSearch}
              />
            )}
          </div>
        </div>
        <Player song={song} isPlaying={isPlaying} onTogglePlay={this.togglePlay} />
      </div>
    );
  }
}
