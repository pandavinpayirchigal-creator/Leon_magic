import React, { useState } from 'react';
import { playSound } from '../utils/audio';

interface InteractiveGamepadProps {
  className?: string;
}

export const InteractiveGamepad: React.FC<InteractiveGamepadProps> = ({ className = '' }) => {
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const handlePress = (btnName: string, sound: 'blip' | 'laser' | 'coin' | 'jump' | 'powerup' | 'click' = 'blip') => {
    setActiveBtn(btnName);
    playSound(sound);
    setTimeout(() => setActiveBtn(null), 150);
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Hand Silhouette / Stylized Arm Contour */}
      <div className="relative group">
        {/* Glow halo */}
        <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Controller Body */}
        <div className="relative w-56 sm:w-64 h-36 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-[2.5rem] shadow-2xl shadow-cyan-950/60 border-2 border-slate-100/80 p-3 flex flex-col justify-between transform -rotate-6 hover:rotate-0 transition-transform duration-300">
          {/* Top Triggers & Status LED */}
          <div className="flex items-center justify-between px-4 pt-1">
            <button 
              onClick={() => handlePress('L1', 'blip')}
              className="px-2 py-0.5 rounded bg-slate-400/80 hover:bg-slate-500 text-[9px] font-bold text-slate-800 shadow-inner"
            >
              L1
            </button>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[9px] font-mono-code font-bold tracking-widest text-slate-700">LEON GP-01</span>
            </div>
            <button 
              onClick={() => handlePress('R1', 'laser')}
              className="px-2 py-0.5 rounded bg-slate-400/80 hover:bg-slate-500 text-[9px] font-bold text-slate-800 shadow-inner"
            >
              R1
            </button>
          </div>

          {/* Main Controls Area */}
          <div className="flex items-center justify-between px-2 pb-2">
            {/* D-PAD */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Vertical Cross */}
              <div className="absolute w-5 h-14 bg-slate-800 rounded-sm shadow-md" />
              {/* Horizontal Cross */}
              <div className="absolute w-14 h-5 bg-slate-800 rounded-sm shadow-md" />
              
              {/* Up */}
              <button 
                onClick={() => handlePress('UP', 'blip')}
                className={`absolute top-0 w-4 h-4 hover:bg-cyan-500/40 rounded-t-sm transition-colors ${activeBtn === 'UP' ? 'bg-cyan-400' : ''}`}
                title="Up"
              />
              {/* Down */}
              <button 
                onClick={() => handlePress('DOWN', 'blip')}
                className={`absolute bottom-0 w-4 h-4 hover:bg-cyan-500/40 rounded-b-sm transition-colors ${activeBtn === 'DOWN' ? 'bg-cyan-400' : ''}`}
                title="Down"
              />
              {/* Left */}
              <button 
                onClick={() => handlePress('LEFT', 'blip')}
                className={`absolute left-0 w-4 h-4 hover:bg-cyan-500/40 rounded-l-sm transition-colors ${activeBtn === 'LEFT' ? 'bg-cyan-400' : ''}`}
                title="Left"
              />
              {/* Right */}
              <button 
                onClick={() => handlePress('RIGHT', 'blip')}
                className={`absolute right-0 w-4 h-4 hover:bg-cyan-500/40 rounded-r-sm transition-colors ${activeBtn === 'RIGHT' ? 'bg-cyan-400' : ''}`}
                title="Right"
              />
              {/* Center */}
              <div className="relative w-3 h-3 bg-slate-900 rounded-full" />
            </div>

            {/* Middle Logo / Home Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => handlePress('HOME', 'powerup')}
                className={`w-7 h-7 rounded-full bg-slate-800 hover:bg-cyan-600 text-white font-bold text-[9px] flex items-center justify-center shadow-lg transition-all ${
                  activeBtn === 'HOME' ? 'scale-90 bg-cyan-400' : ''
                }`}
              >
                LM
              </button>
              <div className="flex gap-2">
                <span className="w-2.5 h-1 bg-slate-600 rounded-full" />
                <span className="w-2.5 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>

            {/* Action Buttons (X, Y, A, B) */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Y - Amber */}
              <button
                onClick={() => handlePress('Y', 'laser')}
                className={`absolute top-0 w-5 h-5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow transition-all ${
                  activeBtn === 'Y' ? 'scale-90 ring-2 ring-amber-300' : ''
                }`}
              >
                Y
              </button>
              {/* X - Blue */}
              <button
                onClick={() => handlePress('X', 'blip')}
                className={`absolute left-0 w-5 h-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center shadow transition-all ${
                  activeBtn === 'X' ? 'scale-90 ring-2 ring-blue-300' : ''
                }`}
              >
                X
              </button>
              {/* B - Red */}
              <button
                onClick={() => handlePress('B', 'coin')}
                className={`absolute right-0 w-5 h-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow transition-all ${
                  activeBtn === 'B' ? 'scale-90 ring-2 ring-rose-300' : ''
                }`}
              >
                B
              </button>
              {/* A - Green */}
              <button
                onClick={() => handlePress('A', 'jump')}
                className={`absolute bottom-0 w-5 h-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shadow transition-all ${
                  activeBtn === 'A' ? 'scale-90 ring-2 ring-emerald-300' : ''
                }`}
              >
                A
              </button>
            </div>
          </div>

          {/* Analog Sticks Base */}
          <div className="flex items-center justify-around px-8 -mt-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
              <div className="w-5 h-5 rounded-full bg-slate-700 shadow" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
              <div className="w-5 h-5 rounded-full bg-slate-700 shadow" />
            </div>
          </div>
        </div>

        {/* Hand Illustration / Gripping Effect */}
        <div className="absolute -bottom-4 -right-6 pointer-events-none opacity-85">
          <svg width="90" height="70" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M10 50 C25 35, 45 40, 60 25 C75 10, 85 20, 95 35 C100 45, 90 70, 70 75 C50 80, 20 70, 10 50 Z" 
              fill="#2c2f38" 
              stroke="#475569" 
              strokeWidth="2"
            />
            {/* Fingers gripping */}
            <path d="M45 35 C55 30, 65 38, 60 48" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            <path d="M55 42 C65 38, 75 45, 70 55" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
