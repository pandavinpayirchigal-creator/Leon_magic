import React, { useState } from 'react';
import { Cpu, Terminal, Sparkles, Activity, Layers, Code, Zap } from 'lucide-react';
import { playSound } from '../utils/audio';

interface DevHudPanelProps {
  className?: string;
}

export const DevHudPanel: React.FC<DevHudPanelProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'stats'>('matrix');

  const skills = [
    { name: 'GODOT 4', active: true, x: 20, y: 30 },
    { name: 'C# / UNITY', active: true, x: 75, y: 25 },
    { name: '3D BLENDER', active: true, x: 45, y: 55 },
    { name: 'PHYSICS', active: true, x: 18, y: 75 },
    { name: 'GLSL SHADERS', active: true, x: 78, y: 78 }
  ];

  const stats = [
    { label: 'ENGINE LOGIC', value: 96, color: 'from-cyan-500 to-blue-500' },
    { label: 'WORLD ARCHITECTURE', value: 98, color: 'from-indigo-500 to-purple-500' },
    { label: 'GAME FEEL & COMBAT', value: 94, color: 'from-amber-500 to-rose-500' },
    { label: 'OPTIMIZATION (60FPS)', value: 91, color: 'from-emerald-500 to-teal-500' }
  ];

  return (
    <div className={`relative bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-3.5 shadow-2xl shadow-cyan-950/50 ${className}`}>
      {/* Top Bar with scanlines */}
      <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono-code font-bold tracking-widest text-[11px] text-cyan-300">
            TECH STACK
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/90 rounded-lg p-0.5 border border-cyan-500/20">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('matrix');
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono-code transition-all ${
              activeTab === 'matrix' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SKILLS
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('stats');
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono-code transition-all ${
              activeTab === 'stats' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            STATS
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="pt-3">
        {activeTab === 'matrix' ? (
          <div className="relative w-full h-36 bg-slate-900/50 rounded-xl p-2 border border-slate-800/80 overflow-hidden">
            {/* SVG Connecting Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/30 stroke-1">
              <line x1="20%" y1="30%" x2="45%" y2="55%" />
              <line x1="75%" y1="25%" x2="45%" y2="55%" />
              <line x1="18%" y1="75%" x2="45%" y2="55%" />
              <line x1="78%" y1="78%" x2="45%" y2="55%" />
              <line x1="20%" y1="30%" x2="18%" y2="75%" strokeDasharray="3 3" />
              <line x1="75%" y1="25%" x2="78%" y2="78%" strokeDasharray="3 3" />
            </svg>

            {/* Nodes */}
            {skills.map((s, idx) => (
              <div
                key={idx}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onClick={() => playSound('blip')}
              >
                <div className="relative p-1.5 rounded-lg bg-slate-950 border border-cyan-400/60 shadow-lg shadow-cyan-500/20 group-hover:border-cyan-300 group-hover:scale-110 transition-all flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[9px] font-mono-code font-bold text-cyan-200 tracking-wider">
                    {s.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2.5 py-1">
            {stats.map((st, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono-code">
                  <span className="text-slate-300">{st.label}</span>
                  <span className="text-cyan-400 font-bold">{st.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full bg-gradient-to-r ${st.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${st.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Status LEDs */}
      <div className="mt-3 pt-2 border-t border-cyan-500/10 flex items-center justify-between text-[9px] font-mono-code text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYS_READY</span>
        </div>
        <span className="text-cyan-400/80">SOLO_DEV // TAMIL NADU 🇮🇳</span>
      </div>
    </div>
  );
};
