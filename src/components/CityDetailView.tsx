import React, { useState, useRef } from 'react';
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
  Check,
  ChevronLeft,
  ChevronRight,
  Camera,
  Eye
} from 'lucide-react';
import { DestinationCity, CityPlace } from '../types';
import { getRealPhotosForCity, getRealPhotosForPlace } from '../data/realPhotos';

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
  const [activeCityPhotoIdx, setActiveCityPhotoIdx] = useState<number>(0);
  const [placePhotoIndices, setPlacePhotoIndices] = useState<Record<string, number>>({});

  const cityGalleryRef = useRef<HTMLDivElement>(null);

  const cityPhotos = (city.images && city.images.length >= 6)
    ? city.images
    : getRealPhotosForCity(city.id, city.name, city.imageUrl);

  const subCategories = ['All', 'Pilgrimage', 'Beaches', 'Heritage', 'Islands', 'Nature'];

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

  const scrollCityGallery = (direction: 'left' | 'right') => {
    if (cityGalleryRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      cityGalleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePrevPlacePhoto = (placeId: string, totalPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlacePhotoIndices((prev) => {
      const current = prev[placeId] || 0;
      return { ...prev, [placeId]: current > 0 ? current - 1 : totalPhotos - 1 };
    });
  };

  const handleNextPlacePhoto = (placeId: string, totalPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlacePhotoIndices((prev) => {
      const current = prev[placeId] || 0;
      return { ...prev, [placeId]: current < totalPhotos - 1 ? current + 1 : 0 };
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7">
      {/* Top Breadcrumb & Action Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>All Cities</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBookmark}
            aria-label="Bookmark City"
            className={`p-2.5 rounded-full border transition-all shadow-xs cursor-pointer ${
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
            className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
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

      {/* Panoramic Hero Visual with Photo Carousel */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/9] sm:aspect-[21/9] max-h-[440px] w-full bg-slate-950 group">
        <img
          src={cityPhotos[activeCityPhotoIdx] || city.imageUrl}
          alt={`${city.name} view ${activeCityPhotoIdx + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setActiveCityPhotoIdx((prev) => (prev > 0 ? prev - 1 : cityPhotos.length - 1))}
          aria-label="Previous city photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer opacity-90 hover:opacity-100 z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveCityPhotoIdx((prev) => (prev < cityPhotos.length - 1 ? prev + 1 : 0))}
          aria-label="Next city photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer opacity-90 hover:opacity-100 z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/95 backdrop-blur-md text-white shadow-xs">
              {city.badge}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              <span>{activeCityPhotoIdx + 1} / {cityPhotos.length} Real Photos</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold pointer-events-auto">
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

      {/* Dedicated Scrollable City Visual Gallery */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-[11px] font-bold tracking-wider uppercase">
              <Camera className="w-4 h-4" />
              <span>City Photo Collection</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
              Explore {city.name} Through {cityPhotos.length} Real Pictures
            </h2>
            <p className="text-xs text-slate-500">
              Scroll horizontally to explore iconic landmarks, aerial perspectives, and authentic monuments
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCityGallery('left')}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs cursor-pointer transition-colors"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCityGallery('right')}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs cursor-pointer transition-colors"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Gallery Strip */}
        <div
          ref={cityGalleryRef}
          className="flex gap-3 overflow-x-auto pb-2 scroll-smooth no-scrollbar snap-x"
        >
          {cityPhotos.map((photoUrl, idx) => (
            <div
              key={idx}
              onClick={() => setActiveCityPhotoIdx(idx)}
              className={`snap-start shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden border cursor-pointer relative group transition-all ${
                activeCityPhotoIdx === idx
                  ? 'border-orange-500 ring-2 ring-orange-400/50 scale-[1.02] shadow-md'
                  : 'border-slate-200 hover:border-orange-300'
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                <img
                  src={photoUrl}
                  alt={`${city.name} real capture ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  Photo {idx + 1}
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold truncate">
                  {idx === 0 ? 'City Center & Horizon' : `Scenic Perspective #${idx + 1}`}
                </div>
              </div>
            </div>
          ))}
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
            <p className="text-xs text-slate-500 mt-0.5">
              Each destination includes at least 6 real photos. Scroll through images directly on each card or click to explore in detail.
            </p>
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

        {/* Places Grid with Multi-Photo Carousel on Each Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredPlaces.map((place) => {
            const placePhotos = (place.images && place.images.length >= 6)
              ? place.images
              : getRealPhotosForPlace(place.id, place.name, place.category, place.imageUrl);

            const currentPhotoIdx = placePhotoIndices[place.id] || 0;

            return (
              <div
                key={place.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Multi-Photo Carousel Header for Each Place */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 bg-slate-950">
                    <img
                      src={placePhotos[currentPhotoIdx] || place.imageUrl}
                      alt={`${place.name} view ${currentPhotoIdx + 1}`}
                      className="w-full h-full object-cover transition-all duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-xs">
                      {place.category}
                    </div>
                    
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>{currentPhotoIdx + 1} / {placePhotos.length}</span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/95 text-slate-900 backdrop-blur-xs shadow-xs">
                      ★ {place.rating}
                    </div>

                    {/* Left & Right mini scroll arrows on card */}
                    <button
                      onClick={(e) => handlePrevPlacePhoto(place.id, placePhotos.length, e)}
                      aria-label="Previous place picture"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer opacity-80 hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleNextPlacePhoto(place.id, placePhotos.length, e)}
                      aria-label="Next place picture"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer opacity-80 hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scrollable Mini Thumbnails for this Place */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
                    {placePhotos.map((thumbUrl, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => setPlacePhotoIndices((prev) => ({ ...prev, [place.id]: tIdx }))}
                        className={`shrink-0 w-11 h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                          currentPhotoIdx === tIdx
                            ? 'border-orange-500 ring-2 ring-orange-400/40 scale-105'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                        title={`View photo ${tIdx + 1}`}
                      >
                        <img
                          src={thumbUrl}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
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
                    onClick={() => onSelectPlace({ ...place, images: placePhotos })}
                    className="flex-1 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View All {placePhotos.length} Photos & Details</span>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
