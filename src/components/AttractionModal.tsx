import React from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Clock, 
  IndianRupee, 
  Sparkles, 
  Shirt, 
  Info, 
  Utensils, 
  Bookmark, 
  Check,
  Compass
} from 'lucide-react';
import { Attraction } from '../types';

interface AttractionModalProps {
  attraction: Attraction | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleBookmark: (id: string) => void;
  onAddToPlanner?: () => void;
}

export const AttractionModal: React.FC<AttractionModalProps> = ({
  attraction,
  onClose,
  isSaved,
  onToggleBookmark,
  onAddToPlanner,
}) => {
  if (!attraction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 rounded-t-3xl">
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded">
                {attraction.region}
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded">
                {attraction.category}
              </span>
              {attraction.isUnescoSite && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> UNESCO World Heritage
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {attraction.name}
            </h2>
            {attraction.gujaratiName && (
              <div className="text-sm text-amber-300 font-sans">
                {attraction.gujaratiName}
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Timings</span>
              <span className="font-semibold text-slate-900 truncate block">{attraction.timings || 'Open Daily'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Entry Fee</span>
              <span className="font-semibold text-slate-900 truncate block">{attraction.entryFee ? attraction.entryFee.split(';')[0] : 'Free Entry'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Duration</span>
              <span className="font-semibold text-slate-900 truncate block">{attraction.recommendedDuration || '1 - 2 Hours'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Rating</span>
              <span className="font-bold text-amber-600 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500" />
                {attraction.rating || 4.8} ({attraction.reviewsCount || 1500})
              </span>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              About This Destination:
            </h3>
            <p className="leading-relaxed text-slate-600 text-xs sm:text-sm">
              {attraction.detailedDescription || attraction.shortDescription}
            </p>
          </div>

          {/* Historical Significance */}
          {attraction.historicalSignificance && (
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1">
              <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 uppercase">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Historical & Cultural Significance:</span>
              </h4>
              <p className="text-amber-900 text-xs leading-relaxed">
                {attraction.historicalSignificance}
              </p>
            </div>
          )}

          {/* Highlights */}
          {attraction.highlights && attraction.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Must-Experience Highlights:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {attraction.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span className="text-slate-800 text-xs">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insider Tips & Dress Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-950 text-xs uppercase">
                <Info className="w-4 h-4 text-blue-700" />
                <span>Insider Travel Tips</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-blue-900 text-[11px] leading-relaxed">
                {(attraction.insiderTips || ['Plan your visit during early morning or evening for best experience.']).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-orange-950 text-xs uppercase">
                <Utensils className="w-4 h-4 text-orange-700" />
                <span>Must-Try Local Food Nearby</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-orange-900 text-[11px] leading-relaxed">
                {(attraction.mustTryFoodNearby || ['Kathiyawadi Thali', 'Fafda & Jalebi']).map((food, i) => (
                  <li key={i}>{food}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={() => onToggleBookmark(attraction.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isSaved
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-amber-700' : ''}`} />
              <span>{isSaved ? 'Bookmarked' : 'Save Attraction'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold cursor-pointer transition-all"
            >
              Done Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
