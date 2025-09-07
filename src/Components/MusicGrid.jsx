import { Edit, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function MusicGrid({
  musics,
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
          <Link href={`/${music.id}`} key={music.id}>
            <div className="bg-secondary hover:bg-tertiary p-4 rounded transition-transform duration-200 group md:hover:[transform:scale(1.05)_rotateY(10deg)]">
              <div className="relative">
                <img
                  src={music.cover || "https://via.placeholder.com/150"}
                  alt={music.title}
                  className="w-full h-55 object-cover rounded mb-2"
                />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onEdit(music);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onDelete(music.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-white font-bold truncate">{music.title}</h3>
              <p className="text-gray-400 truncate">{music.artist}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onPlaySong(music);
                }}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Play
              </button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
