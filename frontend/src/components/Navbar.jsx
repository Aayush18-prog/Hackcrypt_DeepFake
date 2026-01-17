import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import LogoSvg from '../assests/Deepfake logo.svg';

function Navbar() {
  const [theme, setTheme] = useState('dark');

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
      </div>
    </header>
  );
}

export default Navbar;
