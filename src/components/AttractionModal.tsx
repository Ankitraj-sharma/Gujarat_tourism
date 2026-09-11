import React, { useState, useRef } from 'react';
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
  Compass,
  ChevronLeft,
  ChevronRight,
  Camera,
  Eye
} from 'lucide-react';
import { Attraction } from '../types';
import { getRealPhotosForPlace } from '../data/realPhotos';

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

  const photos = (attraction.images && attraction.images.length >= 6)
    ? attraction.images
    : getRealPhotosForPlace(attraction.id, attraction.name, attraction.category, attraction.imageUrl);

  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setActivePhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner with Carousel Controls */}
        <div className="relative h-72 sm:h-96 overflow-hidden bg-slate-950 rounded-t-3xl group">
          <img
            src={photos[activePhotoIdx] || attraction.imageUrl}
            alt={`${attraction.name} view ${activePhotoIdx + 1}`}
            className="w-full h-full object-cover transition-all duration-500 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer opacity-90 hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer opacity-90 hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Top Indicators */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{activePhotoIdx + 1} / {photos.length} Real Photos</span>
            </span>
          </div>

          {/* Bottom Title & Details */}
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

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white leading-tight">
              {attraction.name}
            </h2>
            {attraction.gujaratiName && (
              <div className="text-sm text-amber-300 font-sans font-medium">
                {attraction.gujaratiName}
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Scrollable Thumbnails Strip */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800">
          <div className="flex items-center justify-between text-slate-300 text-xs mb-2">
            <span className="font-semibold flex items-center gap-1.5 text-amber-400">
              <Eye className="w-3.5 h-3.5" /> Scroll to view all {photos.length} real pictures:
            </span>
            <span className="text-[11px] text-slate-400">Click thumbnail to expand</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {photos.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activePhotoIdx === idx 
                    ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md' 
                    : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white/60'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                  #{idx + 1}
                </span>
              </button>
            ))}
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

          {/* Photo Gallery Scroll Section */}
          <div className="space-y-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Real Visual Gallery ({photos.length} Photos)</span>
                </h3>
                <p className="text-[11px] text-slate-600">
                  Swipe or scroll horizontally to explore all views of {attraction.name}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollGallery('left')}
                  className="p-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  className="p-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Cards */}
            <div 
              ref={galleryScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth no-scrollbar snap-x"
            >
              {photos.map((picUrl, pIdx) => (
                <div
                  key={pIdx}
                  onClick={() => setActivePhotoIdx(pIdx)}
                  className={`snap-start shrink-0 w-56 sm:w-64 rounded-2xl overflow-hidden border cursor-pointer group relative transition-all shadow-xs ${
                    activePhotoIdx === pIdx
                      ? 'border-amber-500 ring-2 ring-amber-400/50 scale-[1.02]'
                      : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={picUrl}
                      alt={`${attraction.name} view ${pIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                      Photo {pIdx + 1}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity truncate">
                      Click to expand in viewer
                    </div>
                  </div>
                </div>
              ))}
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
