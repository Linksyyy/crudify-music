import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

export default function Player({ song, isPlaying, onTogglePlay }) {
  return (
    <footer className="bg-secondary text-white p-4 flex items-center justify-start">
      <div className="flex">
        <div>
          <p className="font-bold truncate">{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>

      <div className="flex items-center justify-center w-4/4">
        <button disabled className="mx-3 text-gray-600 cursor-not-allowed">
          <TbPlayerTrackPrevFilled className="size-6" />
        </button>

        <button
          className="mx-3 transition-transform duration-200 hover:scale-110 disabled:text-gray-600 disabled:cursor-not-allowed"
          onClick={onTogglePlay}
          disabled={!song.url}
        >
          {isPlaying ? (
            <FaPause className="size-5 hover:text-gray-400 cursor-pointer" />
          ) : (
            <FaPlay className="size-5 hover:text-gray-400 cursor-pointer" />
          )}
        </button>

        <button disabled className="mx-3 text-gray-600 cursor-not-allowed">
          <TbPlayerTrackNextFilled className="size-6" />
        </button>
      </div>

      <div className="hidden">
        <ReactPlayer
          src={song.url}
          playing={isPlaying}
          onEnded={onTogglePlay}
        />
      </div>
    </footer>
  );
}
