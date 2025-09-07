"use client";

import { createContext, useContext, useState, useEffect } from "react";
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
} from "../lib/main";

const Context = createContext();

export function ContextProvider({ children }) {
  const [musics, setMusics] = useState([]);
  const [browseMusics, setBrowseMusics] = useState(undefined);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [editingMusic, setEditingMusic] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBrowseVisible, setIsBrowseVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSideBarVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState({
    url: null,
    title: "No song selected",
    artist: "---",
  });

  useEffect(() => {
    setMusics(getMusics());
  }, []);

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

  const value = {
    musics,
    browseMusics,
    currentMusic,
    editingMusic,
    isFormVisible,
    isBrowseVisible,
    isSearchVisible,
    isSidebarVisible,
    isPlaying,
    song,
    toggleSidebar,
    playSong,
    togglePlay,
    handleMusicClick,
    handleBack,
    showForm,
    hideForms,
    showSearch,
    handleMusicAdd,
    handleSaveMusic,
    handleDeleteMusic,
    handleAddComment,
    handleDeleteComment,
    handleRateMusic,
    showBrowser,
    handleSearch,
    setCurrentMusic,
    getComments,
  };

  return <Context value={value}>{children}</Context>;
}

export function useMusic() {
  return useContext(Context);
}
