import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  IndianRupee, 
  Bookmark, 
  Sparkles, 
  Check, 
  ArrowRight,
  Info,
  ExternalLink,
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { ATTRACTIONS } from '../data/gujaratData';
import { Attraction, AttractionCategory, GujaratRegion } from '../types';
import { getRealPhotosForPlace } from '../data/realPhotos';

interface AttractionsExplorerProps {
  onSelectAttraction: (attraction: Attraction) => void;
  savedAttractionIds: string[];
  onToggleBookmark: (attractionId: string) => void;
  searchQuery: string;
}

const CATEGORIES: { id: AttractionCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'All Sights' },
  { id: 'Spiritual & Temples', label: 'Spiritual & Temples' },
  { id: 'UNESCO & Heritage', label: 'UNESCO & Heritage' },
  { id: 'Wildlife & Sanctuaries', label: 'Wildlife & Lions' },
  { id: 'Culture & Desert', label: 'White Rann & Kutch' },
  { id: 'Coastal & Beaches', label: 'Coastal & Beaches' },
  { id: 'Modern Wonders', label: 'Modern Wonders' },
];

const REGIONS: { id: GujaratRegion | 'All'; label: string }[] = [
  { id: 'All', label: 'All Regions' },
  { id: 'Saurashtra', label: 'Saurashtra (Gir/Somnath/Dwarka)' },
  { id: 'Kutch', label: 'Kutch (White Desert/Bhuj)' },
  { id: 'North Gujarat', label: 'North Gujarat (Patan/Modhera/Ambaji)' },
  { id: 'Central Gujarat', label: 'Central Gujarat (Vadodara/Ekta Nagar)' },
];

export const AttractionsExplorer: React.FC<AttractionsExplorerProps> = ({
  onSelectAttraction,
  savedAttractionIds,
  onToggleBookmark,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AttractionCategory | 'All'>('All');
  const [selectedRegion, setSelectedRegion] = useState<GujaratRegion | 'All'>('All');
  const [unescoOnly, setUnescoOnly] = useState(false);
  const [cardPhotoIndices, setCardPhotoIndices] = useState<Record<string, number>>({});

  // Filtered Attractions
  const filteredAttractions = useMemo(() => {
    return ATTRACTIONS.filter((att) => {
      // Category filter
      if (selectedCategory !== 'All' && att.category !== selectedCategory) {
        return false;
      }
      // Region filter
      if (selectedRegion !== 'All' && att.region !== selectedRegion) {
        return false;
      }
      // UNESCO filter
      if (unescoOnly && !att.isUnescoSite) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = att.name.toLowerCase().includes(q);
        const matchesGujarati = att.gujaratiName?.toLowerCase().includes(q);
        const matchesCity = att.cityOrDistrict.toLowerCase().includes(q);
        const matchesDesc = att.shortDescription.toLowerCase().includes(q);
        const matchesTags = att.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesGujarati && !matchesCity && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedRegion, unescoOnly, searchQuery]);

  const handlePrevCardPhoto = (attId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => {
      const cur = prev[attId] || 0;
      return { ...prev, [attId]: cur > 0 ? cur - 1 : total - 1 };
    });
  };

  const handleNextCardPhoto = (attId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => {
      const cur = prev[attId] || 0;
      return { ...prev, [attId]: cur < total - 1 ? cur + 1 : 0 };
    });
  };

  return (
    <div id="attractions-explorer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold tracking-wider uppercase mb-1">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>Curated Gujarat Directory</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Iconic Attractions & Wonders
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            From subterranean stepwell marvels and the world’s tallest monument, to sacred Jyotirlingas 
            and the pure white salt flats of Kutch. Each destination includes 6+ authentic real pictures.
          </p>
        </div>

        {/* Total Count Badge */}
        <div className="flex items-center gap-3">
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300">
            {filteredAttractions.length} Destinations Available
          </span>
          <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" /> 6+ Real Photos Each
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                active
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50 hover:border-amber-300'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Region & UNESCO Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Region:</span>
          {REGIONS.map((reg) => {
            const active = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {reg.label.split(' ')[0]}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setUnescoOnly(!unescoOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
            unescoOnly
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>UNESCO World Heritage Only</span>
        </button>
      </div>

      {/* Active Filter Indicator */}
      <div className="text-xs text-slate-500 flex items-center justify-between">
        <span>Showing <strong>{filteredAttractions.length}</strong> places with multi-photo galleries</span>
        {searchQuery && (
          <span>Filtering by “<strong className="text-amber-700">{searchQuery}</strong>”</span>
        )}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map((att) => {
          const isSaved = savedAttractionIds.includes(att.id);
          const photos = (att.images && att.images.length >= 6)
            ? att.images
            : getRealPhotosForPlace(att.id, att.name, att.category, att.imageUrl);
          
          const currentPhotoIdx = cardPhotoIndices[att.id] || 0;

          return (
            <div
              key={att.id}
              id={`attraction-card-${att.id}`}
              className="group bg-white rounded-3xl border border-slate-200/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Banner with Multi-Photo Controls */}
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={photos[currentPhotoIdx] || att.imageUrl}
                    alt={`${att.name} photo ${currentPhotoIdx + 1}`}
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                      {att.region}
                    </span>
                    {att.isUnescoSite && (
                      <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> UNESCO
                      </span>
                    )}
                    <span className="bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                      <Camera className="w-3 h-3" /> {currentPhotoIdx + 1}/{photos.length}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    id={`bookmark-${att.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(att.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
                      isSaved
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-black/40 text-white hover:bg-black/70'
                    }`}
                    title={isSaved ? 'Remove from Saved' : 'Save Attraction'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Prev/Next Photo Arrows on card */}
                  <button
                    onClick={(e) => handlePrevCardPhoto(att.id, photos.length, e)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer opacity-75 hover:opacity-100"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleNextCardPhoto(att.id, photos.length, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer opacity-75 hover:opacity-100"
                    title="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-base sm:text-lg text-white font-serif leading-tight">
                      {att.name}
                    </h3>
                    {att.gujaratiName && (
                      <div className="text-[11px] text-amber-300 font-medium font-sans">
                        {att.gujaratiName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mini Thumbnails Strip under Image */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 overflow-x-auto no-scrollbar">
                  {photos.map((thumb, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => setCardPhotoIndices((prev) => ({ ...prev, [att.id]: tIdx }))}
                      className={`shrink-0 w-10 h-7 rounded-md overflow-hidden border transition-all cursor-pointer ${
                        currentPhotoIdx === tIdx
                          ? 'border-amber-400 ring-1 ring-amber-400 scale-105'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                      title={`Photo ${tIdx + 1}`}
                    >
                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {att.cityOrDistrict}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-700 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {att.rating} ({att.reviewsCount.toLocaleString()})
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {att.shortDescription}
                  </p>

                  {/* Highlights Mini List */}
                  <div className="space-y-1 pt-1">
                    {att.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <span className="text-amber-600 font-bold shrink-0">•</span>
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Quick Info and View Details Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                  <div className="text-[10px] text-slate-500 leading-tight">
                    <div>Entry: <strong className="text-slate-700">{att.entryFee ? att.entryFee.split(';')[0] : 'Free Entry'}</strong></div>
                    <div>Duration: <strong className="text-slate-700">{att.recommendedDuration || '1 - 2 Hours'}</strong></div>
                  </div>

                  <button
                    id={`view-details-${att.id}`}
                    onClick={() => onSelectAttraction({ ...att, images: photos })}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-600 text-amber-900 hover:text-white border border-amber-200 hover:border-amber-600 text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View {photos.length} Photos</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
