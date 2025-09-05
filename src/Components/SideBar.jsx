import { FaHome } from "react-icons/fa";
import { TbZoom } from "react-icons/tb";
import { CgAlbum } from "react-icons/cg";
import { PlusCircle } from "lucide-react";

export default function Sidebar({
  musics,
  onMusicClick,
  onAddMusic,
  onHomeClick,
  onBrowseClick,
  isSidebarVisible,
}) {
  const sidebarClasses = `w-64 bg-primary text-white p-4 border-r-3 border-secondary flex flex-col gap-2 absolute z-40 h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
    isSidebarVisible ? "translate-x-0" : "-translate-x-full"
  }`;

  return (
    <aside className={sidebarClasses}>
      <nav className="space-y-2">
        <button
          onClick={onHomeClick}
          className="hover:underline cursor-pointer bg-secondary p-2 my-2 hover:bg-tertiary rounded-full px-18 flex items-center w-full gap-2 transition-transform duration-200 hover:scale-105"
        >
          <FaHome /> Home
        </button>
        <button
          onClick={onBrowseClick}
          className="hover:underline cursor-pointer bg-secondary p-2 my-2 hover:bg-tertiary rounded-full px-18 flex items-center w-full gap-2 transition-transform duration-200 hover:scale-105"
        >
          <TbZoom /> Browse
        </button>
      </nav>

      <div className="mt-4 pt-4 border-t border-gray-800 flex-grow flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CgAlbum /> Your Library{" "}
          </h2>
          <button
            onClick={onAddMusic}
            className="text-zinc-400 hover:text-white cursor-pointer"
          >
            <PlusCircle size={20} />
          </button>
        </div>

        <div className="space-y-1 overflow-y-auto flex-grow [perspective:800px]">
          {musics.map((music) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                onMusicClick(music);
              }}
              className="block p-2 rounded bg-primary z-30 hover:bg-secondary truncate cursor-pointer transition-transform duration-200 [transform-style:preserve-3d] hover:[transform:scale(1)_rotateY(10deg)]"
            >
              {music.title}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
