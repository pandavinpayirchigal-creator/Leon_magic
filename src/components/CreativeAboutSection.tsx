import React from 'react';
import { ThreeIsometricIsland } from './ThreeIsometricIsland';
import { TheStruggleBadge } from './TheStruggleBadge';
import { PixelDino } from './PixelDino';
import { LEON_PROFILE_IMAGE } from '../data/projects';

export const CreativeAboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-16 sm:py-20 bg-slate-950/90 border-t border-cyan-500/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono-code text-cyan-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SOLO DEV JOURNEY // ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            CREATIVE ABOUT
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3" />
        </div>

        {/* Centerpiece: 3D Floating Isometric Island World */}
        <div className="relative max-w-4xl mx-auto">
          {/* Floating Stickers & Badges surrounding the 3D World */}
          <div className="absolute -top-6 -left-2 sm:left-4 z-20">
            <TheStruggleBadge size="md" />
          </div>

          <div className="absolute top-4 right-2 sm:right-6 z-20 flex flex-col items-center">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-lg">
              <PixelDino />
            </div>
            <span className="text-[9px] font-mono-code text-slate-400 mt-1">LEVEL_01</span>
          </div>

          {/* Elephant Silhouette Badge */}
          <div className="absolute -bottom-4 left-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono-code text-slate-400 backdrop-blur-md">
            <span className="text-lg">🐘</span>
            <span>Roots in Tamil Nadu</span>
          </div>

          {/* Real 3D Isometric Island WebGL Canvas */}
          <div className="relative bg-gradient-to-b from-slate-900/80 to-slate-950 rounded-3xl border border-cyan-500/30 p-3 sm:p-6 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl">
            <ThreeIsometricIsland 
              portraitUrl={LEON_PROFILE_IMAGE} 
            />
          </div>
        </div>

      </div>
    </section>
  );
};
