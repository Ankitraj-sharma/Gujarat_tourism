import React from 'react';
import { 
  Compass, 
  MapPin, 
  Sun, 
  Sparkles, 
  ShieldCheck, 
  Navigation,
  ArrowRight
} from 'lucide-react';
import { heroBannerImg, STARTING_HUBS } from '../data/gujaratData';
import { StartingHub } from '../types';

interface HeroProps {
  onSelectHub: (hub: StartingHub) => void;
  onExplorePlanner: () => void;
  onExploreTemples: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectHub,
  onExplorePlanner,
  onExploreTemples,
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Dark Vignette & Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt="Gujarat Tourism Heritage Panorama"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wide mb-4 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>KHUSHBOO GUJARAT KI • SMART TRIO TRAVEL GUIDE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif max-w-4xl leading-tight sm:leading-none">
          Discover the Land of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">Legends, Lions & Light</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          From the sacred oceanfront Jyotirlinga at <strong className="text-white font-semibold">Somnath</strong> and 
          white crystal salt flats of <strong className="text-white font-semibold">Kutch</strong>, to the wild roar of 
          <strong className="text-white font-semibold"> Asiatic Lions in Gir</strong> and the 182-meter 
          <strong className="text-white font-semibold"> Statue of Unity</strong>. 
          Build your custom trip with our smart 3-hub circuit planner.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            id="hero-launch-planner-btn"
            onClick={onExplorePlanner}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Launch Smart Trio Planner</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-temple-darshan-btn"
            onClick={onExploreTemples}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
          >
            <Sun className="w-4 h-4 text-amber-300" />
            <span>Live Temple Aarti Schedules</span>
          </button>
        </div>

        {/* Starting Hubs Quick Launch Bar */}
        <div className="mt-10 pt-6 border-t border-white/15">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5" />
              <span>Choose Your Gateway Starting Hub:</span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">Airport & Rail Connected</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {STARTING_HUBS.map((hub) => (
              <button
                key={hub.name}
                id={`hero-hub-${hub.name.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => {
                  onSelectHub(hub.name);
                  onExplorePlanner();
                }}
                className="group p-2.5 rounded-lg bg-white/8 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/50 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-100 group-hover:text-amber-300 truncate">
                    {(hub.name || '').split(' ')[0] || hub.name || 'City'}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300/80 bg-black/30 px-1 rounded">
                    {hub.airportCode}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5 group-hover:text-slate-300">
                  {hub.description.slice(0, 32)}...
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Iconic Pillars Ticker */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-lg border border-white/5">
            <span className="text-xl font-black text-amber-400">1,600 km</span>
            <span className="leading-tight text-slate-300">Pristine Arabian Sea Coastline</span>
          </div>
          <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-lg border border-white/5">
            <span className="text-xl font-black text-amber-400">4 UNESCO</span>
            <span className="leading-tight text-slate-300">World Heritage Cultural Wonders</span>
          </div>
          <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-lg border border-white/5">
            <span className="text-xl font-black text-amber-400">674+</span>
            <span className="leading-tight text-slate-300">Wild Asiatic Lions in Sasan Gir</span>
          </div>
          <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-lg border border-white/5">
            <span className="text-xl font-black text-amber-400">182 m</span>
            <span className="leading-tight text-slate-300">Statue of Unity (World’s Tallest)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
