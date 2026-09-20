import React from 'react';
import { Gamepad2, Terminal, ChevronDown } from 'lucide-react';
import { LEON_PROFILE_IMAGE, LEON_PROFILE_FALLBACK } from '../data/projects';
import { playSound } from '../utils/audio';

interface HeroSectionProps {
  onExploreGames: () => void;
  onOpenLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreGames, onOpenLab }) => {
  return (
    <section id="hero" className="relative w-full pt-4 pb-12 overflow-hidden flex flex-col justify-center">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-30" />

      {/* Main Showcase Card Frame */}
      <div className="relative max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        
        <div className="relative w-full rounded-[32px] sm:rounded-[40px] bg-slate-950/80 border border-cyan-500/30 p-6 sm:p-12 md:p-16 shadow-[0_0_80px_rgba(6,182,212,0.15)] overflow-hidden backdrop-blur-xl">
          
          {/* Diagonal Laser Beams & Streaks */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[300px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 opacity-25 blur-3xl transform -rotate-45 pointer-events-none" />
          <div className="absolute top-10 right-0 w-full h-[2px] bg-gradient-to-l from-cyan-400 via-indigo-500 to-transparent opacity-40 transform -rotate-12 pointer-events-none" />
          <div className="absolute top-24 right-20 w-[300px] h-[2px] bg-gradient-to-l from-fuchsia-400 to-transparent opacity-50 transform -rotate-12 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

          {/* CENTER HERO: Developer Portrait & Brand Title */}
          <div className="relative flex flex-col items-center text-center z-30 max-w-3xl mx-auto">
            
            {/* Developer Portrait with Cosmic Lighting */}
            <div className="relative mb-6 group cursor-pointer" onClick={() => playSound('powerup')}>
              {/* Outer volumetric glow rings */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-40 blur-2xl group-hover:opacity-80 transition-opacity animate-pulse-glow" />
              
              <div className="relative">
                <img
                  src={LEON_PROFILE_IMAGE}
                  onError={(e) => {
                    e.currentTarget.src = LEON_PROFILE_FALLBACK;
                  }}
                  alt="Leon Magic - Solo Indie Game Developer"
                  referrerPolicy="no-referrer"
                  className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain drop-shadow-[0_0_35px_rgba(6,182,212,0.45)] group-hover:scale-105 transition-transform duration-300"
                />

                {/* Floating Gamepad Icon badge */}
                <div className="absolute bottom-2 right-4 sm:bottom-3 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-lg group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            {/* Title: LEON MAGIC STUDIO */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white uppercase drop-shadow-2xl">
              LEON MAGIC{' '}
              <span className="font-light text-xl sm:text-2xl md:text-3xl text-cyan-400 tracking-widest align-super">
                STUDIO
              </span>
            </h1>

            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs sm:text-sm font-mono-code text-cyan-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SOLO INDIE GAME DEVELOPER</span>
              <span className="text-base">🇮🇳</span>
            </div>

            {/* Inspiring Developer Quote */}
            <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-slate-200 max-w-xl italic drop-shadow">
              &ldquo;Start Where You Are. Use What You Have. Build What You Dream.&rdquo;
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
              <button
                onClick={() => {
                  playSound('powerup');
                  onExploreGames();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-sm sm:text-base tracking-wider shadow-xl shadow-cyan-500/30 active:scale-95 transition-all flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                EXPLORE WORLDS
              </button>

              <button
                onClick={() => {
                  playSound('laser');
                  onOpenLab();
                }}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-display font-bold text-sm sm:text-base tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                DEVELOPER LAB
              </button>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center justify-center mt-8 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer" onClick={onExploreGames}>
          <span className="text-[10px] font-mono-code tracking-widest uppercase mb-1">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
