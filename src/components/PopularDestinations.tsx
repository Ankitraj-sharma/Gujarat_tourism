import React, { useState } from 'react';
import { 
  Search, 
  Mic, 
  SlidersHorizontal, 
  MapPin, 
  Sparkles, 
  Grid2X2, 
  List, 
  Calendar, 
  ArrowRight, 
  Tent, 
  Check, 
  Compass, 
  X,
  Volume2
} from 'lucide-react';
import { CITIES_DATA } from '../data/citiesData';
import { DestinationCity } from '../types';

interface PopularDestinationsProps {
  onSelectCity: (cityId: string) => void;
  onOpenTripPlanner: () => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  onSelectCity,
  onOpenTripPlanner,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tentCityModalOpen, setTentCityModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Cities' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'spiritual', label: 'Spiritual' },
    { id: 'wildlife', label: 'Nature & Wildlife' },
    { id: 'beaches', label: 'Beaches' },
    { id: 'desert', label: 'Desert & Craft' },
  ];

  const filteredCities = CITIES_DATA.filter((city) => {
    const matchesCategory = selectedCategory === 'all' || city.category === selectedCategory;
    const matchesSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setSearchQuery('Dwarka');
      setIsVoiceListening(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7">
      {/* Top Search & Filter Bar */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cities, monuments, sanctuaries..."
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-900 text-sm shadow-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleVoiceSearch}
              className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${
                isVoiceListening ? 'text-red-500 animate-pulse bg-red-50' : 'text-slate-400 hover:text-orange-600'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilterModal(true)}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-700 hover:text-orange-600 hover:border-orange-200 shadow-xs active:scale-95 transition-all shrink-0"
          title="Filter Destinations"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Category Chips Horizontal Scroll Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isActive && <Check className="w-3.5 h-3.5 text-orange-400" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section Header with Layout Toggle */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-orange-700 uppercase tracking-widest block">
            Discover
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Explore 33 districts of Vibrant Gujarat — from white deserts to sacred shores
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-xs shrink-0">
          <button
            onClick={() => setLayoutView('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              layoutView === 'grid' ? 'bg-orange-50 text-orange-600' : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Grid View"
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayoutView('list')}
            className={`p-1.5 rounded-lg transition-colors ${
              layoutView === 'list' ? 'bg-orange-50 text-orange-600' : 'text-slate-400 hover:text-slate-600'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Destinations Grid / List */}
      {filteredCities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No destinations match your search</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching for another city.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-full text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : layoutView === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container with Scrim & Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-600/90 backdrop-blur-xs text-white shadow-xs">
                    {city.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-black/50 backdrop-blur-xs text-white">
                    {city.placesCount} Places
                  </span>
                </div>

                {/* Title inside bottom scrim for high-contrast mobile look */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-orange-200 font-medium mb-0.5">
                    <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                    <span className="truncate">{city.subRegion}</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-tight text-white group-hover:text-orange-300 transition-colors">
                    {city.name}
                  </h3>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {city.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{city.bestTimeToVisit}</span>
                  <span className="text-orange-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3.5">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className="group bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/80 hover:border-orange-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 items-center"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-orange-600 text-white">
                  {city.badge}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs text-orange-700 font-semibold mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{city.subRegion}</span>
                  <span>•</span>
                  <span>{city.placesCount} Places</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-serif truncate group-hover:text-orange-600 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {city.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-600">
                  <span>Best Time: {city.bestTimeToVisit}</span>
                  <span>★ {city.rating}</span>
                </div>
              </div>

              <div className="shrink-0 pr-2">
                <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Festival Banner: Rann Utsav 2025 */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-900 via-amber-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-orange-500/30">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/30 backdrop-blur-md text-orange-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Official Gujarat Tourism Celebration</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif leading-tight">
            Rann Utsav 2025 – Dhordo Tent City
          </h3>

          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
            Experience the world-renowned full moon cultural extravaganza over crystalline salt flats.
            Witness Kutchi folk dances, paramotoring, traditional Rogan artisans, and luxury air-cooled Swiss tents.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setTentCityModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <Tent className="w-4 h-4" />
              <span>Book Tent City Pass</span>
            </button>

            <button
              onClick={() => onSelectCity('kutch')}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 active:scale-95 transition-all"
            >
              Explore Kutch Itinerary
            </button>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaPmtrRfXTh6Ana9yQ4GZArwxp4oCMf8ct1KSqMvwCcC33O3p2Y7Zu6g0Rp9rx-RFNFkNt_7kbSDO0o2wxfB7XfOxUEpv3Ff_IL9VKzmxC7OyqqmVYJQTG1GJ5ub1NUHrlgGfY5sIzXtqLtsr0P3H6Iuea8b2rqQX4JLMSHxp-j6CHtDWFex0OQF3mgAFYwJV_axkFdG014DBuyjVJH25VdXBkRyCHSJ9PaD8_2sxyeBhqgPNklLfQ"
            alt="Rann Utsav"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Rann Utsav Tent City Booking Modal */}
      {tentCityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                <Tent className="w-5 h-5" />
                <span>Rann Utsav Tent City Booking</span>
              </div>
              <button
                onClick={() => setTentCityModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-800 text-sm">
                Select your package for Dhordo Tent City:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border-2 border-orange-500 bg-orange-50/50">
                  <span className="font-bold text-slate-900 block">Premium AC Tent</span>
                  <span className="text-orange-600 font-extrabold text-sm">₹8,500 / night</span>
                  <p className="text-[11px] text-slate-500 mt-1">Includes traditional Kutchi buffet, desert safari & permit assistance.</p>
                </div>
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white">
                  <span className="font-bold text-slate-900 block">Royal Darbari Suite</span>
                  <span className="text-slate-900 font-extrabold text-sm">₹14,000 / night</span>
                  <p className="text-[11px] text-slate-500 mt-1">Private dining lounge, VIP cultural front row & dedicated guide.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setTentCityModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Thank you! Booking inquiry submitted to Gujarat Tourism official portal. Our representative will contact you.');
                  setTentCityModalOpen(false);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-full shadow-sm"
              >
                Confirm Tent Reservation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Filter Destinations</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Select Region</label>
              <div className="grid grid-cols-2 gap-2">
                {['All Regions', 'Central Gujarat', 'Saurashtra', 'Great Rann', 'South Gujarat', 'North Gujarat'].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => {
                      if (reg === 'All Regions') {
                        setSearchQuery('');
                      } else {
                        setSearchQuery(reg);
                      }
                      setShowFilterModal(false);
                    }}
                    className="p-2 rounded-xl border border-slate-200 hover:border-orange-500 text-xs font-semibold text-slate-700 text-left transition-colors"
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-full py-2.5 rounded-full bg-orange-600 text-white font-bold text-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
