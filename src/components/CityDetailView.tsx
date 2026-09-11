import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  MapPin, 
  Sun, 
  Clock, 
  Navigation, 
  Plane, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  ExternalLink,
  Info,
  Check
} from 'lucide-react';
import { DestinationCity, CityPlace } from '../types';

interface CityDetailViewProps {
  city: DestinationCity;
  onBack: () => void;
  onSelectPlace: (place: CityPlace) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onBookDarshanPass?: () => void;
}

export const CityDetailView: React.FC<CityDetailViewProps> = ({
  city,
  onBack,
  onSelectPlace,
  isBookmarked,
  onToggleBookmark,
  onBookDarshanPass,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [showShareToast, setShowShareToast] = useState(false);

  const subCategories = ['All', 'Pilgrimage', 'Beaches', 'Heritage', 'Islands'];

  const filteredPlaces = city.famousPlaces.filter((place) => {
    if (selectedSubCategory === 'All') return true;
    return (
      place.category.toLowerCase() === selectedSubCategory.toLowerCase() ||
      place.categories?.some((c) => c.toLowerCase() === selectedSubCategory.toLowerCase())
    );
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${city.name} - Explore Vibrant Gujarat`,
        text: `Check out ${city.name} (${city.tagline}) in Gujarat!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7">
      {/* Top Breadcrumb & Action Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>All Cities</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBookmark}
            aria-label="Bookmark City"
            className={`p-2.5 rounded-full border transition-all shadow-xs ${
              isBookmarked
                ? 'bg-orange-50 border-orange-300 text-orange-600'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share Destination"
            className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showShareToast && (
        <div className="p-3 bg-slate-900 text-white text-xs rounded-2xl flex items-center justify-between shadow-lg">
          <span>Destination link copied to clipboard!</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Panoramic Hero Visual */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/9] sm:aspect-[21/9] max-h-[420px] w-full bg-slate-900">
        <img
          src={city.imageUrl}
          alt={city.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/90 backdrop-blur-md text-white shadow-xs">
            {city.badge}
          </span>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{city.weather}</span>
          </div>
        </div>

        {/* Bottom Hero Narrative */}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="flex items-center gap-2 text-xs text-orange-300 font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>{city.district} • {city.region}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
            {city.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl line-clamp-2">
            {city.description}
          </p>
        </div>
      </div>

      {/* Key Stats Interactive Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Traveler Rating
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xl font-black text-slate-900">★ {city.rating}</span>
            <span className="text-xs text-slate-500">({city.reviews})</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Key Attractions
          </span>
          <span className="text-xl font-black text-slate-900 block mt-0.5">
            {city.keyAttractionsCount} Places
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Best Time to Visit
          </span>
          <span className="text-sm font-bold text-slate-900 block mt-1 truncate">
            {city.bestTimeToVisit}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Nearest Airport
          </span>
          <span className="text-xs font-bold text-slate-900 block mt-1 truncate">
            {city.nearestAirport}
          </span>
        </div>
      </div>

      {/* Local Tip / Cultural Highlight Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-5 border border-orange-200/80 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-orange-900 uppercase tracking-wider block">
            Insider Traveler Tip
          </span>
          <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed font-medium">
            {city.localTip}
          </p>
        </div>
      </div>

      {/* Famous Places Section with Category Filter Chips */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider block">
              Sightseeing & Experiences
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              Famous Places in {city.name}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {subCategories.map((sub) => {
              const active = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3.5 bg-slate-100">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-xs">
                    {place.category}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/90 text-slate-900 backdrop-blur-xs">
                    ★ {place.rating}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {place.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {place.description}
                </p>

                <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span className="truncate">{place.timings}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3.5 mt-3.5 border-t border-slate-100">
                <button
                  onClick={() => onSelectPlace(place)}
                  className="flex-1 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs text-center transition-colors"
                >
                  View Details
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    place.navigationQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Navigate on Google Maps"
                >
                  <Navigation className="w-4 h-4 text-blue-600" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
