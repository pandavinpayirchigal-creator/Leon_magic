import React from 'react';
import { playSound } from '../utils/audio';

interface TheStruggleBadgeProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const TheStruggleBadge: React.FC<TheStruggleBadgeProps> = ({ className = '', size = 'md' }) => {
  const handleClick = () => {
    playSound('blip');
  };

  const dimensions = size === 'sm' ? 'w-20' : 'w-24 sm:w-28';

  return (
    <div 
      onClick={handleClick}
      className={`bg-slate-950 border-2 border-slate-700/80 rounded-xl p-1.5 shadow-xl shadow-cyan-950/30 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer select-none group ${dimensions} ${className}`}
      title="The Solo Dev Struggle: 3 AM debugging, physics bugs, but pure passion!"
    >
      {/* Anime Developer Illustration */}
      <div className="relative aspect-square bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-1 border border-slate-800">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hair */}
          <path d="M25 45 C20 20, 45 10, 75 25 C85 30, 85 50, 80 55 C75 45, 65 35, 50 35 C35 35, 25 42, 25 45 Z" fill="#ffffff" />
          {/* Head & Face */}
          <circle cx="50" cy="52" r="22" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
          {/* Anime Eyes looking tired/determined */}
          <line x1="40" y1="50" x2="46" y2="52" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <line x1="54" y1="52" x2="60" y2="50" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Sweat drop */}
          <path d="M66 42 Q68 38 70 42 Q72 46 66 46 Q64 44 66 42" fill="#38bdf8" />
          {/* Hands holding head / hair in frustration/focus */}
          <path d="M30 65 C25 50, 32 38, 38 42" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          <path d="M70 65 C75 50, 68 38, 62 42" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          {/* Body/Shirt */}
          <path d="M30 85 C30 72, 70 72, 70 85" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      </div>

      <div className="mt-1 text-center">
        <span className="text-[10px] font-mono-code font-bold text-slate-200 tracking-wider block">
          The Struggle
        </span>
      </div>
    </div>
  );
};
