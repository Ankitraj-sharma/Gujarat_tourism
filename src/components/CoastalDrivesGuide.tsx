import React, { useState } from 'react';
import { 
  Waves, 
  Compass, 
  MapPin, 
  Navigation, 
  ShieldAlert, 
  Clock, 
  Car, 
  Sun, 
  Sparkles,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';
import { COASTAL_DRIVES } from '../data/gujaratData';
import { CoastalDrive } from '../types';
import { ThreeCoastalMap } from './ThreeCoastalMap';

export const CoastalDrivesGuide: React.FC = () => {
  const [selectedDriveId, setSelectedDriveId] = useState<string>('madhavpur-coastal-highway');

  const selectedDrive = COASTAL_DRIVES.find((d) => d.id === selectedDriveId) || COASTAL_DRIVES[0];

  return (
    <div id="coastal-drives-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold tracking-wider uppercase mb-1">
            <Waves className="w-4 h-4 text-cyan-600" />
            <span>1,600 km Arabian Sea Highway Network</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Coastal Highways & Beach Itineraries
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Experience India’s longest coastline. Drive along smooth oceanfront highways with turquoise 
            breakers on one side and lush coconut palm groves on the other.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-cyan-50 border border-cyan-200 text-cyan-900 px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span>Featuring Blue Flag Shivrajpur & Madhavpur Ghed</span>
        </div>
      </div>

      {/* Interactive 3D Coastal Circuit Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 block">
              Real-time 3D Geography
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              Gujarat 1,600 km Coastal Circuit (3D Orbit)
            </h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Interactive Kathiawar peninsula & Arabian Sea route
          </span>
        </div>

        <ThreeCoastalMap />
      </div>

      {/* Drive Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COASTAL_DRIVES.map((drive) => {
          const isSelected = selectedDriveId === drive.id;
          return (
            <button
              key={drive.id}
              onClick={() => setSelectedDriveId(drive.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider block mb-1">
                  {drive.highwayName}
                </span>
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  {drive.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-3 border-t border-slate-100">
                <span>{drive.totalDistanceKm} km</span>
                <span>~{drive.drivingTimeHours} Hours</span>
                <span className="font-bold text-cyan-700">Explore Route →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Coastal Circuit In-Depth Display */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
        {/* Top Feature Summary */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl overflow-hidden relative shadow-inner bg-slate-100">
            <img
              src={selectedDrive.coverImage}
              alt={selectedDrive.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="bg-cyan-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded">
                Scenic Coastal Corridor
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif mt-1">
                {selectedDrive.title}
              </h3>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                Key Highway Waypoints:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {selectedDrive.routeStops.map((stop, idx) => (
                  <React.Fragment key={stop}>
                    <span className="bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {stop}
                    </span>
                    {idx < selectedDrive.routeStops.length - 1 && (
                      <span className="text-slate-400 font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Scenic Highlights */}
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Scenic Highway Highlights:
              </span>
              <div className="space-y-1.5">
                {selectedDrive.scenicHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Sunset Point</div>
                <div className="font-bold text-slate-800 mt-0.5 truncate">{selectedDrive.bestSunsetSpot}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Road Surface</div>
                <div className="font-bold text-slate-800 mt-0.5 truncate">{selectedDrive.roadCondition}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Vehicle Type</div>
                <div className="font-bold text-slate-800 mt-0.5">{selectedDrive.recommendedVehicle}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Local Snacking Alert */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold text-amber-900 mb-1">
                Beach Tides & Swimming Safety Notice:
              </strong>
              <p className="leading-relaxed">{selectedDrive.beachSafetyNotes}</p>
            </div>
          </div>

          <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
            <UtensilsCrossed className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold text-emerald-900 mb-1">
                Recommended Highway Refreshments:
              </strong>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedDrive.seafoodAndSnacks.map((snack, idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded text-emerald-800 border border-emerald-300 font-medium">
                    {snack}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
