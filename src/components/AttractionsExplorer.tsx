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
  ExternalLink
} from 'lucide-react';
import { ATTRACTIONS } from '../data/gujaratData';
import { Attraction, AttractionCategory, GujaratRegion } from '../types';

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
            From the subterranean stepwell marvels of Rani ki Vav and the world’s tallest monument, 
            to sacred Jyotirlingas and the pure white salt flats of Kutch.
          </p>
        </div>

        {/* UNESCO filter toggle */}
        <button
          onClick={() => setUnescoOnly(!unescoOnly)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            unescoOnly
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>UNESCO World Heritage Only ({ATTRACTIONS.filter((a) => a.isUnescoSite).length})</span>
        </button>
      </div>

      {/* Filter Bars */}
      <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-slate-500 shrink-0 mr-1">Category:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Region Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 shrink-0 mr-1">Region:</span>
          {REGIONS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                selectedRegion === reg.id
                  ? 'bg-orange-100 text-orange-900 border-orange-300 font-bold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong>{filteredAttractions.length}</strong> destination wonders</span>
        {searchQuery && (
          <span>Filtering by “<strong className="text-amber-700">{searchQuery}</strong>”</span>
        )}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map((att) => {
          const isSaved = savedAttractionIds.includes(att.id);
          return (
            <div
              key={att.id}
              id={`attraction-card-${att.id}`}
              className="group bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={att.imageUrl}
                  alt={att.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
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
                    <div>Time: <strong className="text-slate-700">{att.recommendedDuration || '1 - 2 Hours'}</strong></div>
                  </div>

                  <button
                    id={`view-details-${att.id}`}
                    onClick={() => onSelectAttraction(att)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all cursor-pointer group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
