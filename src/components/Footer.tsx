import React, { useState } from 'react';
import { 
  Instagram, 
  Youtube, 
  Send, 
  ExternalLink, 
  X, 
  Gamepad2, 
  ArrowUp, 
  Sparkles, 
  Heart,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { LEON_PROFILE_IMAGE, LEON_PROFILE_FALLBACK } from '../data/projects';
import { playSound } from '../utils/audio';

export const Footer: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    category: 'Collaboration',
    message: ''
  });

  const instagramUrl = 'https://www.instagram.com/leon_gx_/';
  const youtubeUrl = 'https://www.youtube.com/@leonmagicstudio?si=M2p3tpPDkZw_VQrj';

  const handleOpenContact = () => {
    playSound('powerup');
    setIsContactModalOpen(true);
    setFormSubmitted(false);
  };

  const handleCloseContact = () => {
    playSound('click');
    setIsContactModalOpen(false);
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('powerup');
    setFormSubmitted(true);
  };

  const scrollToTop = () => {
    playSound('jump');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    playSound('click');
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-slate-950 border-t border-cyan-500/20 text-slate-300 overflow-hidden">
      {/* Laser & Cyber Grid Backdrop */}
      <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Section: Brand Info + Social Channels + Contact CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Studio Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={LEON_PROFILE_IMAGE}
                  onError={(e) => {
                    e.currentTarget.src = LEON_PROFILE_FALLBACK;
                  }}
                  alt="Leon Magic"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-contain border-2 border-cyan-400/80 shadow-md shadow-cyan-500/30 bg-slate-900"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" title="Online & Developing" />
              </div>
              <div>
                <div className="font-display font-extrabold tracking-wider text-lg text-white">
                  LEON MAGIC <span className="font-light text-cyan-400 text-sm tracking-widest">STUDIO</span>
                </div>
                <div className="text-[10px] font-mono-code text-cyan-400 tracking-wider">
                  SOLO INDIE GAME DEVELOPER // TAMIL NADU 🇮🇳
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Crafting immersive games, 3D worlds, procedural engines, and cinematic experiences from scratch. Building dreams one line of code and one polygon at a time.
            </p>

            {/* Signature Studio Quote */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 max-w-md">
              <p className="text-xs font-display italic text-cyan-300">
                &ldquo;Start where you are. Use what you have. Build what you dream.&rdquo;
              </p>
            </div>

            {/* Location Tag */}
            <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tamil Nadu, India</span>
            </div>
          </div>

          {/* Col 2: Social Links (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono-code font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL CHANNELS</span>
            </div>
            
            <p className="text-xs text-slate-400">
              Follow devlogs, upcoming game releases, behind-the-scenes 3D art, and gameplay trailers:
            </p>

            <div className="space-y-3">
              {/* Instagram Card */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('blip')}
                className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/60 hover:bg-slate-900 transition-all duration-300 shadow-md hover:shadow-pink-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white group-hover:text-pink-300 transition-colors flex items-center gap-1.5">
                      Instagram
                      <span className="text-[10px] font-mono-code font-normal text-slate-400">@leon_gx_</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Devlogs, 3D Art & Game Reels
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* YouTube Card */}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('blip')}
                className="group flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-red-500/60 hover:bg-slate-900 transition-all duration-300 shadow-md hover:shadow-red-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white group-hover:text-red-300 transition-colors flex items-center gap-1.5">
                      YouTube
                      <span className="text-[10px] font-mono-code font-normal text-slate-400">@leonmagicstudio</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Game Trailers & Indie Dev Tutorials
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Col 3: Contact & Direct Actions (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono-code font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>GET IN TOUCH</span>
            </div>

            <p className="text-xs text-slate-400">
              Have an idea, publisher inquiry, or want to collaborate on a game project?
            </p>

            {/* Simple Contact Button */}
            <button
              onClick={handleOpenContact}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-display font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Developer</span>
            </button>

            {/* Direct Connect Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-pink-400 text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span className="font-mono-code text-[11px]">@leon_gx_</span>
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-red-400 text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                <span className="font-mono-code text-[11px]">YouTube</span>
              </a>
            </div>

            {/* Quick Navigation Anchor Links */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono-code text-slate-400">
              <button onClick={() => scrollToSection('hero')} className="hover:text-cyan-300 transition-colors">Hero</button>
              <span>•</span>
              <button onClick={() => scrollToSection('about')} className="hover:text-cyan-300 transition-colors">About</button>
              <span>•</span>
              <button onClick={() => scrollToSection('games')} className="hover:text-cyan-300 transition-colors">Games</button>
              <span>•</span>
              <button onClick={() => scrollToSection('lab')} className="hover:text-cyan-300 transition-colors">Lab</button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Professional Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-500">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} <strong className="text-slate-400 font-display">LEON MAGIC STUDIO</strong>. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-[11px] text-slate-500">
              Handcrafted with Godot 4, Unity, Blender & TypeScript.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-cyan-500/80">
              Tamil Nadu &rarr; Worldwide 🚀
            </span>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              title="Scroll back to top"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all text-[11px] active:scale-95"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Interactive Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 overflow-hidden text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleCloseContact}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header with Leon's Portrait */}
            <div className="flex items-center gap-3.5 mb-6">
              <img
                src={LEON_PROFILE_IMAGE}
                onError={(e) => {
                  e.currentTarget.src = LEON_PROFILE_FALLBACK;
                }}
                alt="Leon Magic"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-contain border-2 border-cyan-400 shadow-md shadow-cyan-500/30 bg-slate-950"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-wide">
                  CONNECT WITH LEON
                </h3>
                <p className="text-xs font-mono-code text-cyan-400">
                  LEON MAGIC STUDIO // DIRECT INQUIRIES
                </p>
              </div>
            </div>

            {formSubmitted ? (
              /* Success confirmation */
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/20">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-base sm:text-lg font-display font-bold text-white">
                  Message Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out to Leon Magic Studio. Leon will review your message shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleCloseContact}
                    className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono-code text-xs font-bold transition-all shadow"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmitMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                      YOUR CONTACT / SOCIAL HANDLE
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@handle or phone/ID"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    INQUIRY TYPE
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white transition-colors"
                  >
                    <option value="Collaboration">Game Collaboration / Co-dev</option>
                    <option value="Publishing">Publishing / Investment Inquiry</option>
                    <option value="Feedback">Game Tester / Player Feedback</option>
                    <option value="General">General / Saying Hi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, ideas, or feedback..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors resize-none"
                  />
                </div>

                {/* Direct Social alternative */}
                <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 pt-1">
                  <span>Direct message:</span>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    Instagram @leon_gx_ <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseContact}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono-code text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-display font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
