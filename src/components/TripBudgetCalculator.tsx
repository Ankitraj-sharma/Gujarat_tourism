import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Users, 
  Calendar, 
  Car, 
  Hotel, 
  Utensils, 
  Ticket, 
  Sparkles, 
  IndianRupee, 
  Check, 
  Info,
  ShieldCheck
} from 'lucide-react';

export const TripBudgetCalculator: React.FC = () => {
  const [travelers, setTravelers] = useState<number>(2);
  const [days, setDays] = useState<number>(5);
  const [transportMode, setTransportMode] = useState<'taxi' | 'selfDrive' | 'publicTransit'>('taxi');
  const [stayCategory, setStayCategory] = useState<'budget' | 'comfort' | 'luxury'>('comfort');
  const [foodPreference, setFoodPreference] = useState<'thali' | 'balanced' | 'premium'>('balanced');
  const [includeSafari, setIncludeSafari] = useState<boolean>(true);
  const [includeStatueViewing, setIncludeStatueViewing] = useState<boolean>(true);
  const [includeRannPermit, setIncludeRannPermit] = useState<boolean>(true);

  // Budget Calculations
  const calculations = useMemo(() => {
    // Rooms needed: ceil(travelers / 2)
    const rooms = Math.ceil(travelers / 2);
    const roomCostPerNight = 
      stayCategory === 'budget' ? 1800 : stayCategory === 'comfort' ? 4200 : 10500;
    const totalStay = (days - 1) * rooms * roomCostPerNight;

    // Transport (assuming ~180 km / day)
    let totalTransport = 0;
    if (transportMode === 'taxi') {
      // Cab with driver @ ~₹3,200/day + driver allowance ₹400
      totalTransport = days * 3600;
    } else if (transportMode === 'selfDrive') {
      // Self drive rental + fuel (~₹2,500/day)
      totalTransport = days * 2600;
    } else {
      // GSRTC Volvo / Trains (~₹600/person/day)
      totalTransport = days * travelers * 600;
    }

    // Food
    const foodPerPersonPerDay = 
      foodPreference === 'thali' ? 450 : foodPreference === 'balanced' ? 900 : 1800;
    const totalFood = days * travelers * foodPerPersonPerDay;

    // Sightseeing & Activities
    let activitiesCost = 0;
    if (includeSafari) {
      // Gir safari gypsy permit (~₹4,000 for up to 6 people)
      const gypsies = Math.ceil(travelers / 6);
      activitiesCost += gypsies * 4200;
    }
    if (includeStatueViewing) {
      // Viewing gallery ₹380 per person
      activitiesCost += travelers * 380;
    }
    if (includeRannPermit) {
      // Rann permit ₹100 per person + vehicle ₹50
      activitiesCost += travelers * 100 + 100;
    }
    // Miscellaneous entry (temple tokens, stepwells, sound & light shows)
    activitiesCost += travelers * days * 150;

    // Shopping & Souvenirs allowance
    const shoppingEstimate = travelers * 1500;

    const grandTotal = totalStay + totalTransport + totalFood + activitiesCost + shoppingEstimate;
    const costPerPerson = Math.round(grandTotal / travelers);

    return {
      totalStay,
      totalTransport,
      totalFood,
      activitiesCost,
      shoppingEstimate,
      grandTotal,
      costPerPerson,
    };
  }, [
    travelers, 
    days, 
    transportMode, 
    stayCategory, 
    foodPreference, 
    includeSafari, 
    includeStatueViewing, 
    includeRannPermit
  ]);

  return (
    <div id="trip-budget-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-amber-200/60 pb-6">
        <div className="flex items-center gap-2 text-amber-700 text-xs font-bold tracking-wider uppercase mb-1">
          <Calculator className="w-4 h-4 text-amber-600" />
          <span>Smart Cost Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
          Gujarat Trip Budget Calculator
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Estimate your exact travel costs across private transport, hotels, authentic Kathiyawadi dining, 
          and jungle safari permits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (8 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          {/* Travelers & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Number of Travelers: ({travelers})</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setTravelers(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      travelers === num
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num === 1 ? 'Solo' : num === 2 ? 'Couple' : num === 4 ? '4 Friends' : '6 Group'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Duration: ({days} Days)</span>
              </label>
              <input
                type="range"
                min="2"
                max="14"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg mt-2"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                <span>2 Days</span>
                <span>7 Days</span>
                <span>14 Days</span>
              </div>
            </div>
          </div>

          {/* Transport Mode */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-amber-600" />
              <span>Transport Choice:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'taxi', label: 'Private AC Cab', desc: 'Driver + Fuel included (~₹3.6k/day)' },
                { id: 'selfDrive', label: 'Self-Drive Car', desc: 'Rental + Petrol (~₹2.6k/day)' },
                { id: 'publicTransit', label: 'GSRTC Volvo & Rail', desc: 'Budget intercity transit (~₹600/p/d)' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setTransportMode(m.id as any)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer text-xs ${
                    transportMode === m.id
                      ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{m.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stays Tier */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Hotel className="w-4 h-4 text-amber-600" />
              <span>Accommodation Style:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'budget', label: 'Trust Bhavan / Homestay', rate: '₹1,800 / room' },
                { id: 'comfort', label: '3-4★ Hotel / Beach Resort', rate: '₹4,200 / room' },
                { id: 'luxury', label: 'Royal Palace / Tent City', rate: '₹10,500 / room' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStayCategory(s.id as any)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer text-xs ${
                    stayCategory === s.id
                      ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{s.label}</div>
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">{s.rate}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Food & Dining Preference */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Dining Style:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'thali', label: 'Authentic Thalis & Farsan', desc: '₹450 / person / day' },
                { id: 'balanced', label: 'Balanced Mix & Cafes', desc: '₹900 / person / day' },
                { id: 'premium', label: 'Heritage Terraces & Buffets', desc: '₹1,800 / person / day' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFoodPreference(f.id as any)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer text-xs ${
                    foodPreference === f.id
                      ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{f.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Activities Toggles */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-amber-600" />
              <span>Included Key Experiences:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={includeSafari}
                  onChange={(e) => setIncludeSafari(e.target.checked)}
                  className="accent-amber-600 w-4 h-4 rounded"
                />
                <span className="font-semibold text-slate-800">Gir Lion Gypsy Safari</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={includeStatueViewing}
                  onChange={(e) => setIncludeStatueViewing(e.target.checked)}
                  className="accent-amber-600 w-4 h-4 rounded"
                />
                <span className="font-semibold text-slate-800">Statue of Unity Deck</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={includeRannPermit}
                  onChange={(e) => setIncludeRannPermit(e.target.checked)}
                  className="accent-amber-600 w-4 h-4 rounded"
                />
                <span className="font-semibold text-slate-800">White Rann Permits</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 shadow-md space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 block">
              Estimated Trip Total
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-serif mt-1">
              ₹{calculations.grandTotal.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-amber-900 font-semibold mt-0.5">
              ~₹{calculations.costPerPerson.toLocaleString('en-IN')} per person ({travelers} {travelers === 1 ? 'traveler' : 'travelers'}, {days} days)
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2.5 pt-4 border-t border-amber-200/80 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <Hotel className="w-3.5 h-3.5 text-amber-700" /> Stays ({days - 1} nights)
              </span>
              <strong className="text-slate-900 font-bold">₹{calculations.totalStay.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-amber-700" /> Transport ({days} days)
              </span>
              <strong className="text-slate-900 font-bold">₹{calculations.totalTransport.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-amber-700" /> Dining & Thalis
              </span>
              <strong className="text-slate-900 font-bold">₹{calculations.totalFood.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-amber-700" /> Safaris, Tickets & Darshan
              </span>
              <strong className="text-slate-900 font-bold">₹{calculations.activitiesCost.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Handicrafts & Sweets
              </span>
              <strong className="text-slate-900 font-bold">₹{calculations.shoppingEstimate.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Pro Saving Tips */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-200 space-y-2 text-[11px] text-slate-700">
            <div className="font-bold text-amber-900 flex items-center gap-1.5 uppercase text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Smart Money Saving Tips:</span>
            </div>
            <ul className="space-y-1 list-disc list-inside leading-relaxed text-slate-600">
              <li>Book Gir Lion Safari permits directly via Gujarat Forest Dept (girlion.gujarat.gov.in) to avoid 3x agent markups.</li>
              <li>Stay at Somnath Sagar Darshan or Dwarka Trust Guest Houses for clean AC sea-view rooms under ₹2,500.</li>
              <li>Travel during weekday non-rush slots to get up to 30% off hotel tariffs in Ahmedabad and Vadodara.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
