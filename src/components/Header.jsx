import { useState } from "react";

function Header() {
  const [input, setInput] = useState("");
  
  return (
    <header className="w-full bg-white border-b px-4 py-3 flex items-center justify-between gap-4">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        
        {/* Logo */}
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>

        {/* Account */}
        <select className="text-sm bg-gray-100 px-2 py-1 rounded-md outline-none">
          <option>Admin</option>
          <option>Viewer</option>
        </select>

        {/* Breadcrumb */}
        <span className="text-gray-400 text-sm">{">>"}</span>
        <span className="text-green-600 text-sm font-medium">
          Dashboard
        </span>
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-md w-1/3">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
        <span className="text-xs text-gray-400">⌘F</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Chat Icon */}
        <button className="text-gray-600 hover:text-black text-lg">
          💬
        </button>

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-black text-lg">
          🔔
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Firdosh Alam</p>
            <p className="text-xs text-gray-500">@firdoshalam</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;