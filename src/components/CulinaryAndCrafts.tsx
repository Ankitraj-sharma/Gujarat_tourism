import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Award, 
  MapPin, 
  Check, 
  Flame, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { CULINARY_SPECIALTIES, HANDICRAFTS } from '../data/gujaratData';

export const CulinaryAndCrafts: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'cuisine' | 'crafts'>('cuisine');

  return (
    <div id="culinary-and-crafts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold tracking-wider uppercase mb-1">
            <UtensilsCrossed className="w-4 h-4 text-amber-600" />
            <span>Culture, Cuisine & Master Artisans</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Gujarati Gastronomy & Living Crafts
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Savor sweet dal, fiery Kathiyawadi garlic curries, and winter Surati Undhiyu, while discovering 
            miraculous 400-year-old Rogan oil embroidery and Patan’s double-ikat silk heritage.
          </p>
        </div>

        {/* Section Toggles */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveSection('cuisine')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'cuisine'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            🍽️ Iconic Culinary Trail
          </button>
          <button
            onClick={() => setActiveSection('crafts')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'crafts'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            🎨 GI-Certified Crafts
          </button>
        </div>
      </div>

      {/* Culinary Trail Showcase */}
      {activeSection === 'cuisine' ? (
        <div className="space-y-6">
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <Flame className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <strong className="font-bold text-sm block">The Dual Flavors of Gujarat:</strong>
              <p className="leading-relaxed">
                Central & South Gujarat cuisine balances mild sweetness with tangy kokum and delicate spices (sweet dal, Kadhi, Surati Undhiyu). In contrast, Saurashtra’s rustic Kathiyawadi cuisine is famed for fire and smoke: crushed garlic, wood-smoked eggplant (Olo), and thick Bajra no Rotlo patted by hand.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CULINARY_SPECIALTIES.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                    {dish.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    🌱 100% Pure Veg
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 font-serif">
                        {dish.name}
                      </h3>
                      <span className="text-xs text-amber-700 font-medium">
                        {dish.gujaratiName} • {dish.originRegion}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                    <div className="flex items-start gap-1 text-slate-600">
                      <strong className="text-slate-800 shrink-0">Taste:</strong>
                      <span className="truncate">{dish.flavorProfile}</span>
                    </div>
                    <div className="flex items-start gap-1 text-amber-800">
                      <strong className="shrink-0">Must-Try At:</strong>
                      <span className="truncate font-semibold">{dish.mustTrySpot}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Handicrafts Showcase */
        <div className="space-y-6">
          <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <Award className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
            <div className="text-xs text-orange-950 space-y-1">
              <strong className="font-bold text-sm block">Living Heritage of Master Guilds:</strong>
              <p className="leading-relaxed">
                Gujarat is home to ancient crafts protected by Geographical Indication (GI) tags. Meet the single surviving Khatri family practicing Rogan Art in Nirona, and the Salvi dynasty weaving double-ikat Patola saris for kings and deities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HANDICRAFTS.map((craft) => (
              <div
                key={craft.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-lg transition-all p-6 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {craft.giTagCertified && (
                        <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-700" /> GI Certified
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-medium">
                        Age: {craft.historicalAge}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 font-serif">
                      {craft.name}
                    </h3>
                    <div className="text-xs font-semibold text-amber-700 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {craft.artisanVillage}, {craft.district}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {craft.description}
                </p>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Artisan Workshop / Purchase</span>
                    <span className="font-semibold text-slate-800">{craft.whereToBuyDirectly}</span>
                  </div>
                  <ShoppingBag className="w-4 h-4 text-amber-700 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
