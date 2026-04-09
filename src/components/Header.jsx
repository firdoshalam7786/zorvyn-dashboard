import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiBell, FiMessageCircle, FiPlus, FiSearch } from "react-icons/fi";

function Header({ setShowModal }) {
  const [input, setInput] = useState("");
  const { role, setRole } = useContext(AppContext);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-3 sm:px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
      
      {/* Left Side */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Logo */}
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>

        {/* Role */}
        <div className="flex items-center gap-2">
          <select
            className="text-xs sm:text-sm bg-gray-100 px-2 py-2 rounded-md outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          {/* Hide on mobile */}
          <span className="hidden sm:block text-sm text-gray-500">
            Current: {role}
          </span>
        </div>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-gray-400 text-sm">{">>"}</span>
          <span className="text-green-600 text-sm font-medium border border-gray-200 rounded bg-gray-100 px-2 py-2">
            Dashboard
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="search hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-md w-full md:w-1/3">
      <FiSearch/>
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none text-sm w-full ml-2"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        
        <button
          onClick={() => setShowModal(true)}
          className="flex bg-green-600 gap-1 hover:bg-green-700 text-white px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm items-center"
        >
          <FiPlus/> Add
        </button>

        {/* Chat */}
        <button className="flex items-center gap-1 border-gray-300 bg-gray-200 px-1 py-1 rounded text-gray-600 hover:text-black text-base sm:text-lg">
          <FiMessageCircle/><span className="hidden sm:inline">Chat</span>
        </button>

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-black text-base sm:text-lg">
          <FiBell/>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/src/assets/images/men.png"
            alt="user"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">@johndoe</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;