import React, { useState } from 'react';
import { playSound } from '../utils/audio';

interface PixelDinoProps {
  className?: string;
  interactive?: boolean;
}

export const PixelDino: React.FC<PixelDinoProps> = ({ className = '', interactive = true }) => {
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = () => {
    if (!interactive || isJumping) return;
    playSound('jump');
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  return (
    <div 
      onClick={handleJump}
      className={`inline-block select-none cursor-pointer transition-transform ${isJumping ? '-translate-y-6 scale-110' : 'hover:scale-105'} ${className}`}
      title="Click to Jump!"
    >
      <svg 
        width="34" 
        height="36" 
        viewBox="0 0 22 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-300 hover:text-cyan-400 transition-colors drop-shadow-md"
      >
        {/* Pixel Art Dino path */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 1h7v7h-2v1h-1v1h-1v1h-3v1h-2v1h-1v1h-1v2h-1v1h-1v2h-1v-2H5v-1H4v-2H3v-2H2V9h1V8h1V7h1V6h1V5h1V4h6V1zm4 2h1v1h-1V3zm-10 9h1v1H7v-1zm-2 2h1v1H5v-1zm5 5h1v3h-1v-3zm3 0h1v3h-1v-3z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
