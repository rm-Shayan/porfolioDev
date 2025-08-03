import { toggleTheme } from "../../../Features";
import { useAppDispatch, useAppSelector } from "../../../App/Hooks";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react"; // Importing icons for better UI

// The custom CSS is included directly in the component for a self-contained solution.
// This handles the animated gradient text, glow effect, and the fancy underline.
const customStyles = `
  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient-reverse {
    animation: gradient-animation 6s ease infinite;
    background-size: 200% 200%;
  }

  .glow-text {
    text-shadow: 0 0 8px rgba(100, 149, 237, 0.6);
  }

  .gradient-underline {
    position: relative;
    padding-bottom: 4px;
  }

  .gradient-underline::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: width 0.3s ease-in-out;
  }

  .dark-theme-link::after {
    background-color: #a78bfa; /* A subtle purple solid color */
  }

  .light-theme-link::after {
    background-color: #1f2937; /* A solid dark color for the underline */
  }

  .gradient-underline:hover::after,
  .gradient-underline.active::after {
    width: 100%;
  }

  // Adding a subtle animated background pattern for the dark theme header
  .dark-theme-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#ffffff20 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.1;
    z-index: -1;
  }
`;

export const Header = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const [toggle, setToggle] = useState(false);

  const navLinks = ["home", "about", "contact"];

  return (
    <>
      <style>{customStyles}</style>
      <header
        className={`w-full sticky top-0 z-50 transition-colors duration-500
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#121221] via-[#2a1a47] to-[#0a0a10] bg-opacity-90 backdrop-blur-lg border-b border-purple-900 shadow-xl relative dark-theme-bg"
              : "bg-gradient-to-r from-[#fdfbfb] via-[#ebedee] to-[#dfe9f3] text-gray-800 shadow-md"
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Signature */}
          <div className="font-bold animate-gradient-reverse bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <NavLink to="/">𝓡𝓪𝓸 𝓜𝓾𝓱�𝓶𝓶𝓪𝓭 𝓢𝓱𝓪𝔂𝓪𝓷</NavLink>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6 font-semibold text-sm sm:text-base">
            {navLinks.map((page) => (
              <li key={page}>
                <NavLink
                  to={`/${page === "home" ? "" : page}`}
                  className={({ isActive }) =>
                    `relative transition duration-300 ease-in-out font-medium
                    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent
                    ${isActive ? "glow-text active" : "gradient-underline"}
                    ${theme === "dark" ? "dark-theme-link" : "light-theme-link"}`
                  }
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setToggle(!toggle)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {toggle ? (
                <X className={`w-6 h-6 transform transition duration-300 ${theme === "dark" ? "text-white" : "text-gray-800"}`} />
              ) : (
                <Menu className={`w-6 h-6 transform transition duration-300 ${theme === "dark" ? "text-white" : "text-gray-800"}`} />
              )}
            </button>

            {/* Theme Toggle Button (refined UI) */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`group px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-500 backdrop-blur-md
                ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-800/60 to-indigo-800/60 text-white border border-purple-600 hover:from-purple-900/80 hover:to-indigo-900/80 shadow-lg"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200 shadow"
                }
              `}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </nav>

        {/* Mobile Nav */}
        {toggle && (
          <ul className="md:hidden px-4 pb-4 space-y-2 font-semibold text-sm sm:text-base">
            {navLinks.map((page) => (
              <li key={page}>
                <NavLink
                  to={`/${page === "home" ? "" : page}`}
                  onClick={() => setToggle(false)}
                  className={({ isActive }) =>
                    `relative transition duration-300 ease-in-out font-medium
                    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent
                    ${isActive ? "glow-text active" : "gradient-underline"}
                    ${theme === "dark" ? "dark-theme-link" : "light-theme-link"}`
                  }
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </header>
    </>
  );
};
