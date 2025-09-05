import { useState } from "react";

export default function MusicBrowser({ onCancel, onSearch }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(search);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 p-6 rounded-lg space-y-4 w-full h-1/5 max-w-md overflow-y-auto flex flex-col justify-center overflow-x-auto"
    >
      <h2 className="text-2xl text-center font-bold">Search</h2>
      <input
        autoFocus
        required
        name="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-700 p-2 rounded mt-1"
      />
      <div className="flex gap-4 justify-end">
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
