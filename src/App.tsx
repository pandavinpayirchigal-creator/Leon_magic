import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CreativeAboutSection } from './components/CreativeAboutSection';
import { GameShowcaseSection } from './components/GameShowcaseSection';
import { DeveloperLabSection } from './components/DeveloperLabSection';
import { Footer } from './components/Footer';
import { Smartphone, Monitor } from 'lucide-react';
import { playSound } from './utils/audio';

export default function App() {
  const [deviceMode, setDeviceMode] = useState<'full' | 'phone'>('full');

  const scrollToSection = (sectionId: string) => {
    playSound('click');
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDeviceMode = () => {
    setDeviceMode((prev) => (prev === 'full' ? 'phone' : 'full'));
  };

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {deviceMode === 'full' ? (
        /* Full Desktop & Mobile Responsive Web View */
        <div className="w-full flex flex-col min-h-screen">
          <Navbar 
            deviceMode={deviceMode} 
            onToggleDeviceMode={toggleDeviceMode} 
          />

          <main className="flex-1 w-full">
            <HeroSection
              onExploreGames={() => scrollToSection('games')}
              onOpenLab={() => scrollToSection('lab')}
            />

            <CreativeAboutSection />

            <GameShowcaseSection />

            <DeveloperLabSection />
          </main>

          <Footer />
        </div>
      ) : (
        /* Interactive Mobile Phone Chassis Frame View (Matches the 3 phones on the right side of design mockup) */
        <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          
          {/* Top Control Bar */}
          <div className="w-full max-w-sm flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-mono-code text-cyan-400 font-bold">
              📱 MOBILE FRAME VIEW
            </span>
            <button
              onClick={toggleDeviceMode}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-white font-mono-code transition-colors shadow"
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>Exit to Full Web</span>
            </button>
          </div>

          {/* Phone Shell */}
          <div className="relative w-full max-w-[390px] h-[844px] bg-slate-950 rounded-[48px] p-3 shadow-2xl shadow-cyan-950/80 border-4 border-slate-800 ring-1 ring-cyan-500/30 flex flex-col overflow-hidden">
            {/* Phone Notch / Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
            </div>

            {/* Inner Phone Screen Content */}
            <div className="relative w-full h-full bg-[#06080f] rounded-[40px] overflow-y-auto overflow-x-hidden flex flex-col border border-slate-900">
              <Navbar 
                deviceMode={deviceMode} 
                onToggleDeviceMode={toggleDeviceMode} 
              />

              <main className="flex-1 w-full">
                <HeroSection
                  onExploreGames={() => scrollToSection('games')}
                  onOpenLab={() => scrollToSection('lab')}
                />

                <CreativeAboutSection />

                <GameShowcaseSection />

                <DeveloperLabSection />
              </main>

              <Footer />

              {/* Bottom Home Indicator Bar */}
              <div className="sticky bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full mx-auto my-1 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
