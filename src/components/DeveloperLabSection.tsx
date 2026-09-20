import React, { useState } from 'react';
import { Terminal, Monitor, Sparkles, Play, Headphones, Keyboard, Mouse, MapPin, Layers, Code2, Sliders } from 'lucide-react';
import { PixelDino } from './PixelDino';
import { playSound } from '../utils/audio';
import battlestationImg from '../assets/images/developer_lab_battlestation_1789882948715.jpg';

export const DeveloperLabSection: React.FC = () => {
  const [activeMonitor, setActiveMonitor] = useState<'left' | 'center' | 'right'>('center');
  const [showConsole, setShowConsole] = useState(true);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [runLog, setRunLog] = useState<string[]>([
    'System ready. Godot 4.2 / Vulkan Mobile initialized.',
    'Graphics pipeline bound: RTX Ultra Low-Latency Mode.',
    'PlayerController.gd compiled cleanly in 84ms.',
    'Ready for input.'
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    playSound('powerup');
    setIsRunning(true);
    setRunLog((prev) => [
      ...prev,
      `[GAME_LOOP] >> PhysicsProcess tick: delta = 0.0166s`,
      `[PLAYER] >> Velocity.x = 12.40, Velocity.z = 12.40 | Grounded: true`,
      `[PHYSICS] >> Character IK active: 60.0 FPS stable.`
    ]);
    setTimeout(() => setIsRunning(false), 600);
  };

  const handleKeyboardClick = () => {
    playSound('click');
  };

  const handleHeadphonesClick = () => {
    playSound('powerup');
  };

  return (
    <section id="lab" className="relative w-full py-16 sm:py-24 bg-slate-950 border-t border-cyan-500/10 overflow-hidden">
      {/* Ambience & Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Battlestation Frame (matching IMG_20260920_111010.jpg) */}
        <div className="relative max-w-5xl mx-auto rounded-[28px] sm:rounded-[36px] overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-[0_0_90px_rgba(6,182,212,0.18)]">
          
          {/* Top Wall Atmosphere & Title from Reference Image */}
          <div className="pt-8 sm:pt-10 pb-4 px-4 text-center relative z-10 bg-gradient-to-b from-[#0a0f1d] to-[#0d1424]">
            {/* Title as depicted in the reference screenshot */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-wider text-white uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,0.25)]">
              DEVELOPER LAB
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-mono-code text-cyan-300/80 tracking-widest uppercase">
              Triple-Display Indie Engineering Suite
            </p>
          </div>

          {/* Battlestation Setup Showcase Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 group">
            <img
              src={battlestationImg}
              alt="Leon Developer Battlestation - Triple Display Setup with Curved Code IDE and 3D Engine"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Subtle Gradient vignette along the edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30 pointer-events-none" />

            {/* Interactive Seamless Hotspots matching the 3 Monitors */}
            
            {/* 1. Left Monitor: 3D Engine & Character Rigging */}
            <div 
              onClick={() => {
                playSound('blip');
                setActiveMonitor('left');
                setShowConsole(true);
              }}
              onMouseEnter={() => setHoveredZone('left')}
              onMouseLeave={() => setHoveredZone(null)}
              className="absolute top-[28%] left-[3%] w-[28%] h-[48%] cursor-pointer group/monitor transition-all rounded-xl hover:ring-2 hover:ring-cyan-400/80 hover:bg-cyan-500/10 flex items-start justify-center p-2"
              title="Click to inspect 3D Character Rigging & Engine"
            >
              <div className="opacity-0 group-hover/monitor:opacity-100 transition-opacity bg-slate-950/90 border border-cyan-400/60 px-2.5 py-1 rounded-full text-[10px] font-mono-code text-cyan-300 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                <Monitor className="w-3 h-3 text-cyan-400" />
                <span>3D RIGGING // GODOT</span>
              </div>
            </div>

            {/* 2. Center Monitor: Curved Code IDE */}
            <div 
              onClick={() => {
                playSound('blip');
                setActiveMonitor('center');
                setShowConsole(true);
              }}
              onMouseEnter={() => setHoveredZone('center')}
              onMouseLeave={() => setHoveredZone(null)}
              className="absolute top-[22%] left-[32%] w-[36%] h-[54%] cursor-pointer group/monitor transition-all rounded-2xl hover:ring-2 hover:ring-cyan-400/80 hover:bg-cyan-500/10 flex items-start justify-center p-2"
              title="Click to inspect Curved Code IDE"
            >
              <div className="opacity-0 group-hover/monitor:opacity-100 transition-opacity bg-slate-950/90 border border-cyan-400/60 px-3 py-1 rounded-full text-[11px] font-mono-code text-cyan-300 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>CURVED CODE IDE // SCRIPT</span>
              </div>
            </div>

            {/* 3. Right Monitor: 3D Terrain Level Editor */}
            <div 
              onClick={() => {
                playSound('blip');
                setActiveMonitor('right');
                setShowConsole(true);
              }}
              onMouseEnter={() => setHoveredZone('right')}
              onMouseLeave={() => setHoveredZone(null)}
              className="absolute top-[28%] right-[3%] w-[28%] h-[48%] cursor-pointer group/monitor transition-all rounded-xl hover:ring-2 hover:ring-cyan-400/80 hover:bg-cyan-500/10 flex items-start justify-center p-2"
              title="Click to inspect 3D Terrain Level Editor"
            >
              <div className="opacity-0 group-hover/monitor:opacity-100 transition-opacity bg-slate-950/90 border border-cyan-400/60 px-2.5 py-1 rounded-full text-[10px] font-mono-code text-cyan-300 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>TERRAIN ENGINE // BIOME</span>
              </div>
            </div>

            {/* Tactile Interactive Hotspots on Desk */}
            {/* Headphones (Left) */}
            <div 
              onClick={handleHeadphonesClick}
              className="absolute bottom-[10%] left-[16%] w-10 h-10 rounded-full cursor-pointer hover:bg-cyan-400/20 hover:ring-2 hover:ring-cyan-400/50 flex items-center justify-center transition-all group/tool"
              title="Studio Headphones (Click to listen)"
            >
              <Headphones className="w-4 h-4 text-cyan-400 opacity-60 group-hover/tool:opacity-100" />
            </div>

            {/* Mechanical Keyboard (Center) */}
            <div 
              onClick={handleKeyboardClick}
              className="absolute bottom-[8%] left-[36%] w-[28%] h-[12%] rounded-lg cursor-pointer hover:bg-cyan-400/20 hover:ring-2 hover:ring-cyan-400/50 flex items-center justify-center transition-all group/kbd"
              title="RGB Mechanical Keyboard (Click to test key switches)"
            >
              <span className="opacity-0 group-hover/kbd:opacity-100 text-[10px] font-mono-code text-cyan-300 bg-slate-950/90 px-2 py-0.5 rounded border border-cyan-500/30">
                Click: Linear Switch Sound
              </span>
            </div>

            {/* Mouse on Mousepad (Right) */}
            <div 
              onClick={() => playSound('click')}
              className="absolute bottom-[9%] right-[22%] w-10 h-10 rounded-lg cursor-pointer hover:bg-cyan-400/20 hover:ring-2 hover:ring-cyan-400/50 flex items-center justify-center transition-all group/mouse"
              title="Precision Optical Mouse"
            >
              <Mouse className="w-4 h-4 text-cyan-400 opacity-60 group-hover/mouse:opacity-100" />
            </div>

            {/* Floating Quick Switcher Tabs (Non-intrusive bottom pill bar) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl z-20">
              <button
                onClick={() => {
                  playSound('blip');
                  setActiveMonitor('left');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                  activeMonitor === 'left'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Screen 1:</span> 3D Rig
              </button>

              <button
                onClick={() => {
                  playSound('blip');
                  setActiveMonitor('center');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                  activeMonitor === 'center'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Screen 2:</span> Curved IDE
              </button>

              <button
                onClick={() => {
                  playSound('blip');
                  setActiveMonitor('right');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                  activeMonitor === 'right'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Screen 3:</span> Terrain
              </button>
            </div>

          </div>

          {/* Active Display Live Console / Specs Drawer */}
          {showConsole && (
            <div className="p-4 sm:p-6 bg-slate-950 border-t border-cyan-500/20 relative">
              
              {activeMonitor === 'center' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono-code text-xs font-bold text-cyan-300">
                        CURVED CODE MONITOR // PlayerController.gd (Godot 4.2)
                      </span>
                    </div>
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono-code text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      {isRunning ? 'EXECUTING...' : 'RUN LOOP TICK'}
                    </button>
                  </div>

                  {/* Simulated Terminal Output */}
                  <div className="bg-slate-900/95 rounded-xl p-3.5 border border-slate-800 font-mono-code text-xs space-y-1 max-h-32 overflow-y-auto shadow-inner">
                    {runLog.map((line, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-cyan-500 select-none">&gt;</span>
                        <span className={line.includes('[GAME_LOOP]') ? 'text-emerald-400' : 'text-slate-300'}>
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeMonitor === 'left' && (
                <div className="space-y-3 font-mono-code text-xs">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>LEFT MONITOR // 3D CHARACTER RIGGING & SHADERS</span>
                    <span className="text-slate-400">FPS: 60 // Bones: 54 // Rigify IK</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-xs">
                    Game character model loaded inside the Godot viewport with outdoor lighting, cloth simulation, and real-time inverse kinematics.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">POLY COUNT</div>
                      <div className="text-cyan-400 font-bold">24,500 Polys</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">PBR MAPS</div>
                      <div className="text-emerald-400 font-bold">Albedo + Normal + Rough</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">SKELETON</div>
                      <div className="text-indigo-400 font-bold">Full Humanoid IK</div>
                    </div>
                  </div>
                </div>
              )}

              {activeMonitor === 'right' && (
                <div className="space-y-3 font-mono-code text-xs">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>RIGHT MONITOR // PROCEDURAL TERRAIN ENGINE</span>
                    <span className="text-emerald-400">Environment: South Indian Hill Biome</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-xs">
                    Simplex noise elevation generator with hydraulic erosion, dynamic foliage instancing, and real-time volumetric atmospheric fog.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">TERRAIN MESH</div>
                      <div className="text-cyan-400 font-bold">4km² Continuous</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">GRASS INSTANCES</div>
                      <div className="text-emerald-400 font-bold">120,000 MultiMesh</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">CULLING</div>
                      <div className="text-indigo-400 font-bold">Hardware Occlusion</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Bottom Studio Signature & Location (from the reference mobile screen) */}
        <div className="mt-12 flex flex-col items-center text-center space-y-3">
          <p className="text-base sm:text-lg font-display font-bold text-cyan-300 max-w-xl italic">
            &ldquo;One developer &rarr; unlimited imagination + multiple worlds.&rdquo;
          </p>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono-code text-slate-400">
            <span className="text-xl">🐘</span>
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-bold">Made in Tamil Nadu</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400">India 🇮🇳</span>
          </div>
        </div>

      </div>
    </section>
  );
};

