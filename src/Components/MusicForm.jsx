import { useState } from "react";

export default function MusicForm({ music, onCancel, onSave }) {
  const [title, setTitle] = useState(music ? music.title : "");
  const [artist, setArtist] = useState(music ? music.artist : "");
  const [cover, setCover] = useState(music ? music.cover : "");
  const [url, setUrl] = useState(music ? music.url : "");

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...music, ...{ title, artist, cover, url } });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 p-6 rounded-lg space-y-4 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold">
        {music ? "Edit Album" : "Add Album"}
      </h2>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-zinc-300"
        >
          Title
        </label>
        <input
          autoFocus
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-700 p-2 rounded mt-1"
          required
        />
      </div>
      <div>
        <label
          htmlFor="artist"
          className="block text-sm font-medium text-zinc-300"
        >
          Artist
        </label>
        <input
          id="artist"
          name="artist"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full bg-zinc-700 p-2 rounded mt-1"
          required
        />
      </div>
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-zinc-300"
        >
          URL of video
        </label>
        <input
          id="url"
          name="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-zinc-700 p-2 rounded mt-1"
          required
        />
      </div>
      <div>
        <label
          htmlFor="cover"
          className="block text-sm font-medium text-zinc-300"
        >
          URL of cover
        </label>
        <input
          id="cover"
          name="cover"
          type="text"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          className="w-full bg-zinc-700 p-2 rounded mt-1"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
