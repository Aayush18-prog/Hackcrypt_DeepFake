import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, Image, Sun, Moon, LogOut } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import LogoSvg from '../assests/Deepfake logo.svg';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInitials, setUserInitials] = useState('JD');
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`${
        theme === 'dark'
          ? 'bg-[#0a1628]/80 border-blue-500/10'
          : 'bg-white/85 border-slate-200 shadow-sm'
      } backdrop-blur-lg border-b sticky top-0 z-50 px-8 py-4 transition-colors`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`flex items-center gap-4 no-underline ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          <img src={LogoSvg} alt="VeriFake Logo" className="w-10 h-10" />
          <div className="flex flex-col">
            <div className={`text-xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              VERIFAKE AI
            </div>
            <div className={`text-xs tracking-[2px] font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              DEEPFAKE FORENSIC ENGINE
            </div>
          </div>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110 font-bold text-sm ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            {userInitials}
          </button>

          {isDropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border overflow-hidden ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <button
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b ${
                  theme === 'dark'
                    ? 'hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="w-5 flex items-center justify-center">
                  <User size={14} />
                </div>
                <span className="text-sm font-medium">Profile</span>
              </button>

              <button
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b ${
                  theme === 'dark'
                    ? 'hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="w-5 flex items-center justify-center">
                  <Image size={14} />
                </div>
                <span className="text-sm font-medium">Upload Picture</span>
              </button>

              <button
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-slate-700 text-red-400 hover:text-red-300'
                    : 'hover:bg-slate-100 text-red-600 hover:text-red-700'
                }`}
              >
                <div className="w-5 flex items-center justify-center">
                  <LogOut size={14} />
                </div>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
