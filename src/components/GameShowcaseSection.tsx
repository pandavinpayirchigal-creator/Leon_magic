import React, { useState } from 'react';
import { GameProject } from '../types';
import { GAME_PROJECTS } from '../data/projects';
import { GameDetailModal } from './GameDetailModal';
import { Play, Sparkles, ExternalLink, Download, ArrowRight, Gamepad2, Compass } from 'lucide-react';
import { playSound } from '../utils/audio';

export const GameShowcaseSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameProject | null>(null);
  const [filter, setFilter] = useState<'all' | 'playable' | 'dev'>('all');

  const handleSelect = (game: GameProject) => {
    playSound('powerup');
    setSelectedGame(game);
  };

  const filteredGames = GAME_PROJECTS.filter((game) => {
    if (filter === 'playable') return game.status === 'Playable' || Boolean(game.playUrl || game.downloadUrl);
    if (filter === 'dev') return game.status !== 'Playable' && !game.playUrl && !game.downloadUrl;
    return true;
  });

  return (
    <section id="games" className="relative w-full py-20 bg-slate-950 border-t border-cyan-500/10 overflow-hidden">
      {/* Laser & Grid Ambience */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono-code text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLAYABLE EXPERIENCES // INDIE TITLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            GAME SHOWCASE
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3" />
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl">
            Each world conceived, coded, modeled, and refined from scratch. Launch playable titles directly in your browser or inspect tech specs.
          </p>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 shadow-lg">
            <button
              onClick={() => {
                playSound('click');
                setFilter('all');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-code uppercase font-bold transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>All Titles ({GAME_PROJECTS.length})</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                setFilter('playable');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-code uppercase font-bold transition-all ${
                filter === 'playable'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/30'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Playable Now ({GAME_PROJECTS.filter(g => g.status === 'Playable' || g.playUrl || g.downloadUrl).length})</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                setFilter('dev');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-code uppercase font-bold transition-all ${
                filter === 'dev'
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>In Dev ({GAME_PROJECTS.filter(g => g.status !== 'Playable' && !g.playUrl && !g.downloadUrl).length})</span>
            </button>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleSelect(game)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 p-2.5 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={game.image}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Status Pill on Top Right */}
                <div className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full backdrop-blur-md text-[10px] font-mono-code font-bold ${
                  game.status === 'Playable'
                    ? 'bg-emerald-950/90 border border-emerald-400 text-emerald-300 shadow-sm'
                    : 'bg-slate-950/80 border border-cyan-500/30 text-cyan-300'
                }`}>
                  {game.status}
                </div>

                {/* Engine Tag on Top Left */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono-code text-slate-300">
                  {game.engine}
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-400/50 transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-slate-950" />
                  </div>
                </div>

                {/* Bottom Category overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-slate-300">
                    {game.category}
                  </span>
                  <span className="text-[10px] font-mono-code text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    DETAILS <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Card Label & Action Bar */}
              <div className="pt-3 pb-1 px-2 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-extrabold text-white tracking-wider group-hover:text-cyan-300 transition-colors uppercase">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {game.subtitle}
                    </p>
                  </div>
                </div>

                {/* Direct Action Button if game is playable or downloadable */}
                {(game.playUrl || game.downloadUrl) && (
                  <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    {game.playUrl ? (
                      <a
                        href={game.playUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound('powerup');
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 text-xs font-mono-code font-bold transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-emerald-300" />
                        <span>PLAY ONLINE (FREE)</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    ) : (
                      <a
                        href={game.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound('powerup');
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono-code font-bold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>DOWNLOAD APK (DRIVE)</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </section>
  );
};
