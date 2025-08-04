import { useAppSelector } from "../../../App/Hooks";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <footer
      className={`w-full py-8 px-4 md:px-12 mt-20 ${
        theme === "dark"              ? "bg-gradient-to-br from-[#121221] via-[#2a1a47] to-[#0a0a10] bg-opacity-90 backdrop-blur-lg border-b border-purple-900 shadow-xl relative dark-theme-bg"
              : "bg-gradient-to-r from-[#fdfbfb] via-[#ebedee] to-[#dfe9f3] text-gray-800 shadow-md"
          }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left - Text */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Rao Muhammad Shayan. All rights reserved.
        </p>

        {/* Right - Icons */}
        <div className="flex space-x-6 text-xl">
          <a href="https://github.com/rm-shayan" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-500 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/rao-muhammad-shayan-470a51344/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaLinkedin />
          </a>
          <a href="mailto:raomuhammadhsyan897@gmail.com" className="hover:text-red-500 transition">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};


