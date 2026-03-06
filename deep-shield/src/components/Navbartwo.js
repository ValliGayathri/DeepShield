import React, { useState, useEffect } from "react";

const Navbartwo = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    alert("Logged out successfully");
    // Later you can add:
    // localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-4 border-b transition-all duration-300
      bg-[#ffffff] border-[#b366ff]
      dark:bg-[#060012] dark:border-[#6d28d9]">

      <div className="flex items-center justify-between">

        {/* Brand */}
        <h1 className="text-xl font-bold 
          text-[#1e004d] 
          dark:text-[#b366ff]">
          Encrypted File Vault
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">

          <a href="/instructions"
            className="text-[#140033] dark:text-[#ccc] hover:text-[#a855f7] transition">
            Instructions
          </a>

          <a href="/help"
            className="text-[#140033] dark:text-[#ccc] hover:text-[#a855f7] transition">
            Help
          </a>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-1 rounded border transition
              border-[#a855f7] text-[#a855f7]
              hover:bg-[#a855f7] hover:text-white
              dark:border-[#6366f1] dark:text-[#6366f1]
              dark:hover:bg-[#6366f1]"
          >
            Logout
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl ml-2 transition
              text-[#1e004d] dark:text-[#b366ff]">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl 
            text-[#1e004d] dark:text-[#b366ff]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-medium">

          <a href="/instructions"
            className="text-[#140033] dark:text-[#ccc] hover:text-[#a855f7]">
            Instructions
          </a>

          <a href="/help"
            className="text-[#140033] dark:text-[#ccc] hover:text-[#a855f7]">
            Help
          </a>

          <button
            onClick={handleLogout}
            className="text-[#a855f7] dark:text-[#6366f1] font-semibold text-left">
            Logout
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-left text-[#1e004d] dark:text-[#b366ff]">
            Toggle Theme
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbartwo;