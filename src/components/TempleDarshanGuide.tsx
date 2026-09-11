import React, { useState } from 'react';
import { 
  Sun, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Camera, 
  Shirt, 
  Lock, 
  Heart, 
  Info,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { TEMPLES } from '../data/gujaratData';
import { Temple } from '../types';

interface TempleDarshanGuideProps {
  onSelectTempleDetails?: (templeId: string) => void;
}

export const TempleDarshanGuide: React.FC<TempleDarshanGuideProps> = () => {
  const [selectedTempleId, setSelectedTempleId] = useState<string>('somnath');

  const selectedTemple = TEMPLES.find((t) => t.id === selectedTempleId) || TEMPLES[0];

  return (
    <div id="temple-darshan-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold tracking-wider uppercase mb-1">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>Sacred Pilgrim & Darshan Portal</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Temple Darshan & Aarti Timings
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Complete liturgical schedule for Gujarat’s supreme sanctums: Jyotirlingas, Char Dham, 
            and Shaktipeeths with precise daily aarti times, locker protocols, and dress codes.
          </p>
        </div>

        <div className="bg-amber-100/70 border border-amber-300 text-amber-900 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>All Aarti schedules verified with official temple devasthan trusts.</span>
        </div>
      </div>

      {/* Quick Temple Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {TEMPLES.map((temple) => {
          const isSelected = selectedTempleId === temple.id;
          return (
            <button
              key={temple.id}
              id={`temple-tab-${temple.id}`}
              onClick={() => setSelectedTempleId(temple.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-amber-700 text-white border-amber-700 shadow-sm ring-2 ring-amber-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{(temple.name || '').split(' ')[1] || (temple.name || '').split(' ')[0] || temple.name || 'Temple'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                isSelected ? 'bg-amber-800 text-amber-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {temple.region}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Temple Spotlight Showcase */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-md overflow-hidden">
        {/* Top Hero Header */}
        <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
          <img
            src={selectedTemple.imageUrl}
            alt={selectedTemple.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-xs">
                {selectedTemple.sacredStatus}
              </span>
              <span className="text-xs text-amber-300 font-medium">
                Deity: <strong>{selectedTemple.deity}</strong>
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">
              {selectedTemple.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {selectedTemple.location}, {selectedTemple.district}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Gates: {selectedTemple.darshanTimings}
              </span>
            </div>
          </div>
        </div>

        {/* Liturgical Aarti Schedule Cards */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Daily Aarti & Divine Ritual Timings:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {selectedTemple.aartis.map((aarti, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 space-y-1 hover:bg-amber-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-amber-950 text-sm">{aarti.name}</span>
                    <span className="bg-amber-700 text-white font-mono font-bold text-xs px-2 py-0.5 rounded">
                      {aarti.time}
                    </span>
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed pt-1">
                    {aarti.significance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Light and Sound show if present */}
          {selectedTemple.lightAndSoundShow && (
            <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 text-xs flex items-start gap-3 text-indigo-950">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-sm mb-0.5">Evening Sound & Light Show:</strong>
                <span>{selectedTemple.lightAndSoundShow}</span>
              </div>
            </div>
          )}

          {/* Guidelines & Etiquette Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Dress Code */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                <Shirt className="w-4 h-4 text-amber-600" />
                <span>Sanctum Dress Code</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedTemple.dressCode}
              </p>
            </div>

            {/* Photography & Electronics */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                <Camera className="w-4 h-4 text-red-600" />
                <span>Photography & Electronics</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedTemple.photographyRules}
              </p>
            </div>

            {/* Lockers & Cloakroom */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Cloakroom & Footwear</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedTemple.cloakroomLockerFacility}
              </p>
            </div>
          </div>

          {/* Historical Legend & Special Info */}
          <div className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 p-4 sm:p-5 rounded-xl border border-amber-200 space-y-2 text-xs">
            <h5 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Sacred Puranic Legend & Ritual Importance</span>
            </h5>
            <p className="text-amber-900 leading-relaxed">
              {selectedTemple.historicalLegend}
            </p>
            <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-2 text-slate-600">
              <div>
                <strong>Major Celebrations:</strong> {selectedTemple.importantFestivals.join(', ')}
              </div>
              <div className="text-amber-800 font-semibold">
                Transit: {selectedTemple.nearestAirportOrStation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
