import React, { useState } from 'react';
import { GameProject } from '../types';
import { X, Play, Gamepad2, Layers, Cpu, Monitor, CheckCircle, Flame, ExternalLink, Download } from 'lucide-react';
import { playSound } from '../utils/audio';

interface GameDetailModalProps {
  game: GameProject | null;
  onClose: () => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'arcade' | 'specs'>('overview');
  const [miniScore, setMiniScore] = useState(0);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-3xl bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/80 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Badge */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono-code font-bold ${
                  game.status === 'Playable'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {game.status}
                </span>
                <span className="bg-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded-full text-xs font-mono-code">
                  {game.engine}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-wide">
                {game.title}
              </h2>
              <p className="text-sm sm:text-base text-cyan-300 font-medium">
                {game.subtitle}
              </p>
            </div>

            {/* Direct Play/Download Action Button in Header */}
            {game.playUrl && (
              <a
                href={game.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('powerup')}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-display font-extrabold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>PLAY ONLINE NOW</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {game.downloadUrl && (
              <a
                href={game.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('powerup')}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-extrabold text-sm shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD APK</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/50">
          {[
            { id: 'overview', label: 'Overview & Lore' },
            { id: 'arcade', label: 'Mini Playable Test' },
            { id: 'specs', label: 'Tech Specifications' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound('click');
                setActiveTab(tab.id as any);
              }}
              className={`pb-3 px-3 text-xs sm:text-sm font-display tracking-wider border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Highlight Box if Playable */}
              {(game.playUrl || game.downloadUrl) && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-emerald-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono-code uppercase tracking-widest text-emerald-400 font-bold">
                      🚀 INSTANT ACCESS AVAILABLE
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {game.playUrl ? 'This game can be played directly in your web browser with keyboard or touch controls.' : 'Direct APK and installer packages available via Google Drive.'}
                    </p>
                  </div>
                  {game.playUrl && (
                    <a
                      href={game.playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound('powerup')}
                      className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-display font-bold shadow-md transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      Launch Game Link
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {game.downloadUrl && (
                    <a
                      href={game.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound('powerup')}
                      className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-display font-bold shadow-md transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Open Drive Folder
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono-code text-cyan-400 mb-2">
                  // GAMEPLAY & STORYLINE
                </h4>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {game.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono-code text-cyan-400 mb-3">
                  // CORE MECHANICS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {game.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800"
                    >
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {game.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono-code text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </>
          )}

          {activeTab === 'arcade' && (
            <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-cyan-500/20 text-center">
              <Gamepad2 className="w-12 h-12 text-cyan-400 mb-3 animate-bounce" />
              <h3 className="text-lg font-display font-bold text-white mb-1">
                Mini Game Simulator: {game.title}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mb-6">
                Tap the action trigger to simulate physics impulse loop and hit combos!
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-display font-black text-cyan-400">{miniScore}</div>
                  <div className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">Score / Hits</div>
                </div>
                <button
                  onClick={() => {
                    playSound('powerup');
                    setMiniScore((s) => s + 10);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-sm shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  TRIGGER ACTION COMBO
                </button>
              </div>

              <span className="text-[11px] font-mono-code text-slate-500">
                Physics engine status: ACTIVE // Delta: 0.016s // 60 FPS
              </span>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">Genre</span>
                <p className="text-sm font-medium text-slate-200">{game.specs.genre}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">Target Performance</span>
                <p className="text-sm font-medium text-cyan-400">{game.specs.targetFps}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">Target Resolution</span>
                <p className="text-sm font-medium text-slate-200">{game.specs.resolution}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">Physics System</span>
                <p className="text-sm font-medium text-slate-200">{game.specs.physics}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs font-mono-code text-slate-400">
            Leon Magic Studio // Indie Games 🇮🇳
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-display text-white transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
