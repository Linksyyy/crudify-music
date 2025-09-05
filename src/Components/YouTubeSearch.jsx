import { useState } from "react";
import { Search, X } from "lucide-react";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export default function YouTubeSearch({ onMusicAdd, onCancel }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(
      query
    )}&type=video&key=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setResults(data.items);
          setIsLoading(false);
        } else {
          setError(
            "Error fetching videos. Please check the API key and quota."
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching from YouTube API:", error);
        setError("An unexpected error occurred.");
        setIsLoading(false);
      });
  }

  function handleSelectVideo(video) {
    const newMusic = {
      title: video.snippet.title,
      artist: video.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      cover: video.snippet.thumbnails.high.url,
    };
    onMusicAdd(newMusic);
  }

  return (
    <div className="bg-zinc-800 p-6 rounded-lg space-y-4 w-full max-w-3xl h-full max-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Search on YouTube</h2>
        <button onClick={onCancel} className="text-zinc-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song or artist..."
          className="flex-1 bg-zinc-700 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          disabled={isLoading}
        >
          <Search size={20} />
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {results.map((video) => (
          <div
            key={video.id.videoId}
            onClick={() => handleSelectVideo(video)}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-zinc-700 cursor-pointer"
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex flex-col">
              <p className="font-bold text-white">{video.snippet.title}</p>
              <p className="text-sm text-zinc-400">
                {video.snippet.channelTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
