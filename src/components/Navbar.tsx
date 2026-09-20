import React, { useState } from 'react';
import { Gamepad2, Volume2, VolumeX, Menu, X, Smartphone, Monitor, Sparkles } from 'lucide-react';
import { toggleSound, isSoundEnabled, playSound } from '../utils/audio';

interface NavbarProps {
  deviceMode: 'full' | 'phone';
  onToggleDeviceMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ deviceMode, onToggleDeviceMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playSound('powerup');
  };

  const navLinks = [
    { name: 'HERO', href: '#hero' },
    { name: 'CREATIVE ABOUT', href: '#about' },
    { name: 'GAME SHOWCASE', href: '#games' },
    { name: 'DEVELOPER LAB', href: '#lab' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const handleScroll = (href: string) => {
    playSound('click');
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            handleScroll('#hero');
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
              LEON MAGIC <span className="font-light text-cyan-400 text-xs tracking-widest">STUDIO</span>
            </span>
            <span className="text-[9px] font-mono-code text-slate-400 tracking-wider -mt-0.5">
              SOLO INDIE GAME DEV 🇮🇳
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(link.href);
              }}
              className="font-display text-xs font-bold tracking-widest text-slate-300 hover:text-cyan-300 transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Device Mockup Toggle */}
          <button
            onClick={() => {
              playSound('blip');
              onToggleDeviceMode();
            }}
            title={deviceMode === 'full' ? 'Switch to Phone Frame View' : 'Switch to Full Web View'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 text-xs font-mono-code transition-all"
          >
            {deviceMode === 'full' ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Full Web</span>
              </>
            )}
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute Game SFX' : 'Enable Game SFX'}
            className={`p-2 rounded-xl border transition-all ${
              soundOn 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-cyan-500/20 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(link.href);
              }}
              className="block font-display text-sm font-bold tracking-wider text-slate-300 hover:text-cyan-300 py-2 border-b border-slate-800"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs font-mono-code text-slate-400">
            <span>Leon Magic Studio</span>
            <span className="text-cyan-400">Made in Tamil Nadu 🇮🇳</span>
          </div>
        </div>
      )}
    </header>
  );
};
