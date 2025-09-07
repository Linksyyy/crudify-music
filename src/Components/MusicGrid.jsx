import { Edit, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function MusicGrid({
  musics,
  onMusicClick,
  onPlaySong,
  onEdit,
  onDelete,
  onAddMusic,
}) {
  return (
    <main className="flex-1 p-4 overflow-y-auto min-h-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Musics</h2>
        <button
          onClick={onAddMusic}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add music
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:[perspective:1000px]">
        {musics.map((music) => (
          <Link href={music.id}>
            <div
              key={music.id}
              className="bg-secondary hover:bg-tertiary p-4 rounded transition-transform duration-200 group md:hover:[transform:scale(1.05)_rotateY(10deg)]"
            >
              <div className="relative">
                <img
                  src={music.cover || "https://via.placeholder.com/150"}
                  alt=""
                  className="w-full h-55 object-cover rounded mb-2 cursor-pointer"
                  onClick={() => onMusicClick(music)}
                />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(music)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(music.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3
                className="text-white font-bold truncate cursor-pointer"
                onClick={() => onMusicClick(music)}
              >
                {music.title}
              </h3>
              <p className="text-gray-400 truncate">{music.artist}</p>
              <button
                onClick={() => onPlaySong(music)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Play
              </button>
              {/*FOR DEBUG, REMEMBER REMOVE THIS BEFORE*/}
              <h6 className="text-xs text-gray-500 mt-2">id: {music.id}</h6>
              {/*--------------------------------------*/}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
