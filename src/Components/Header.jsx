import { LuDiscAlbum } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="bg-secondary text-white p-4 flex items-center justify-between md:justify-start">
      <button onClick={onToggleSidebar} className="md:hidden mr-4">
        <FiMenu size={24} />
      </button>
      <h1 className="text-xl">
        {" "}
        <LuDiscAlbum className="inline size-8" /> Crudify Music
      </h1>
    </header>
  );
}
