import React, { useState, useMemo } from 'react';
import { 
  Hotel, 
  MapPin, 
  Star, 
  Sparkles, 
  Check, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { STAYS } from '../data/gujaratData';
import { StayOption, GujaratRegion } from '../types';

export const StaysAndResorts: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<GujaratRegion | 'All'>('All');

  const stayTypes = [
    'All',
    'Desert Tent City',
    'Temple Trust Bhavan',
    'Jungle Safari Lodge',
    'Heritage Palace',
    'Coastal Resort',
  ];

  const filteredStays = useMemo(() => {
    return STAYS.filter((stay) => {
      if (selectedType !== 'All' && stay.type !== selectedType) {
        return false;
      }
      if (selectedRegion !== 'All' && stay.region !== selectedRegion) {
        return false;
      }
      return true;
    });
  }, [selectedType, selectedRegion]);

  return (
    <div id="stays-and-resorts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold tracking-wider uppercase mb-1">
            <Hotel className="w-4 h-4 text-amber-600" />
            <span>Curated Hospitality Guide</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Hotels, Palaces & Desert Camps
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            From regal 1920s heritage havelis and biophilic Gir lion safari eco-resorts, to ocean-facing 
            pilgrim trust guest houses and luxury circular Kutchi Bhungas.
          </p>
        </div>

        <div className="text-xs bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-2 rounded-xl flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Transparent tariff estimates with direct booking guidance</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {stayTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedType === type
                ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStays.map((stay) => (
          <div
            key={stay.id}
            id={`stay-card-${stay.id}`}
            className="group bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Preview */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src={stay.imageUrl}
                alt={stay.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  {stay.type}
                </span>
                <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {stay.region}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-amber-900 text-xs font-black px-2 py-0.5 rounded-md shadow-sm">
                ★ {stay.rating} ({stay.reviews})
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-base text-slate-900 font-serif truncate">
                    {stay.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{stay.location}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {stay.experienceHighlight}
                </p>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {stay.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {stay.amenities.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-bold self-center">
                      +{stay.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Best For Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Tariff Guide</div>
                  <div className="text-xs font-black text-emerald-700">{stay.priceRange}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                    {stay.recommendedFor[0] || 'Couples & Family'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
