import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Calendar, 
  Car, 
  Utensils, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Share2, 
  Printer, 
  Bookmark, 
  Check, 
  Info, 
  ShieldAlert, 
  Sun, 
  IndianRupee, 
  ArrowRight,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { 
  STARTING_HUBS, 
  TRIO_ROUTES, 
  ATTRACTIONS, 
  TEMPLES, 
  STAYS 
} from '../data/gujaratData';
import { 
  StartingHub, 
  TrioRoute, 
  DayPlan, 
  AttractionCategory 
} from '../types';

interface SmartTrioPlannerProps {
  selectedHub: StartingHub;
  onSelectHub: (hub: StartingHub) => void;
  onSaveTrip: (tripTitle: string, itinerary: DayPlan[]) => void;
  onViewAttraction: (attractionId: string) => void;
  onViewTemple: (templeId: string) => void;
  isTripSaved: boolean;
}

const INTEREST_OPTIONS: { id: AttractionCategory; label: string; icon: string }[] = [
  { id: 'Spiritual & Temples', label: 'Spiritual & Jyotirlingas', icon: '🛕' },
  { id: 'Wildlife & Sanctuaries', label: 'Asiatic Lions & Wildlife', icon: '🦁' },
  { id: 'UNESCO & Heritage', label: 'UNESCO Stepwells & Palaces', icon: '🏛️' },
  { id: 'Culture & Desert', label: 'White Rann & Kutch Crafts', icon: '🏜️' },
  { id: 'Coastal & Beaches', label: 'Coastal Drives & Beaches', icon: '🌊' },
  { id: 'Modern Wonders', label: 'Statue of Unity & Wonders', icon: '🗽' },
];

export const SmartTrioPlanner: React.FC<SmartTrioPlannerProps> = ({
  selectedHub,
  onSelectHub,
  onSaveTrip,
  onViewAttraction,
  onViewTemple,
  isTripSaved,
}) => {
  // Planner State
  const [durationDays, setDurationDays] = useState<number>(5);
  const [pace, setPace] = useState<'Relaxed' | 'Balanced' | 'Explorer'>('Balanced');
  const [selectedInterests, setSelectedInterests] = useState<AttractionCategory[]>([
    'Spiritual & Temples',
    'Wildlife & Sanctuaries',
    'Coastal & Beaches',
  ]);
  const [activeCuratedTrioId, setActiveCuratedTrioId] = useState<string>('saurashtra-divine-wildlife');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [budgetTier, setBudgetTier] = useState<'Budget' | 'Comfort' | 'Luxury'>('Comfort');
  const [savedSuccessAlert, setSavedSuccessAlert] = useState(false);

  // Toggle Interest
  const toggleInterest = (interest: AttractionCategory) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.length > 1
          ? prev.filter((i) => i !== interest)
          : prev
        : [...prev, interest]
    );
  };

  // Find active curated route if in curated mode
  const activeCuratedRoute = useMemo(() => {
    return TRIO_ROUTES.find((r) => r.id === activeCuratedTrioId) || TRIO_ROUTES[0];
  }, [activeCuratedTrioId]);

  // Generate dynamic custom itinerary when in custom mode or when parameters change
  const currentItinerary: DayPlan[] = useMemo(() => {
    if (!isCustomMode) {
      // Use active curated route's days adjusted to durationDays
      return activeCuratedRoute.itinerary.slice(0, Math.min(durationDays, activeCuratedRoute.itinerary.length));
    }

    // Dynamic Generator based on selectedHub, duration, and interests
    const generatedDays: DayPlan[] = [];

    // Hub-based itinerary logic
    if (selectedHub === 'Somnath / Porbandar' || selectedHub === 'Rajkot') {
      const stops = [
        {
          dest: 'Somnath & Prabhas Patan Coast',
          morning: 'Arrival in Somnath. Take sacred holy dip at Triveni Sangam and visit Bhalka Tirth.',
          afternoon: 'Check-in to ocean-facing guesthouse. Quiet relaxation along the coastal promenade.',
          evening: 'Witness the divine 7:00 PM Sandhya Aarti at Shree Somnath Jyotirlinga, followed by the 8:00 PM Jai Somnath Sound & Light Show.',
          stay: 'Somnath (Sagar Darshan)',
          km: 35,
          time: '1 hr',
          meal: 'Authentic Kathiyawadi Thali with Sev Tameta, Ringna no Olo, and Bajra no Rotlo.',
          tip: 'No mobile phones or smart watches allowed in the temple; use the free biometric lockers.',
          attractions: ['Somnath Temple', 'Bhalka Tirth', 'Triveni Sangam'],
        },
        {
          dest: 'Sasan Gir Asiatic Lion Sanctuary',
          morning: 'Drive to Sasan Gir teak forest (45 km, 1.5 hrs). Check into your jungle camp.',
          afternoon: 'Afternoon safari at Devalia Safari Park for guaranteed Asiatic Lion sightings.',
          evening: 'Campfire with authentic Siddi Dhamal folk dance performed by the African-origin Gujarati tribe.',
          stay: 'Sasan Gir Jungle Camp',
          km: 50,
          time: '1.5 hrs',
          meal: 'Pure Gir Cow A2 buttermilk and farm-cooked hot Kathiyawadi dal-bhat.',
          tip: 'Book Gypsy jungle safari permits in advance at girlion.gujarat.gov.in.',
          attractions: ['Gir Teak Forest', 'Devalia Safari Park', 'Siddi Folk Dance'],
        },
        {
          dest: 'Madhavpur Ghed Scenic Coast to Porbandar',
          morning: 'Dawn jungle safari in Gir sanctuary to spot active lion prides and leopards.',
          afternoon: 'Scenic drive along NH-51 Madhavpur Ghed ocean highway with waves crashing right next to the road.',
          evening: 'Visit Kirti Mandir (Gandhiji’s ancestral birthplace) and Sudama Temple in Porbandar.',
          stay: 'Porbandar Coastal Hotel',
          km: 150,
          time: '3 hrs',
          meal: 'Fresh green coconut water and Porbandar famous crispy Khajli pastry.',
          tip: 'Stop at Madhavpur Beach for coconut water and stunning ocean highway photography.',
          attractions: ['Madhavpur Coastal Drive', 'Kirti Mandir', 'Porbandar Beach'],
        },
        {
          dest: 'Dwarka Kingdom & Gomti Ghat',
          morning: 'Drive from Porbandar to Dwarka along the coastal belt (105 km, ~2.5 hrs).',
          afternoon: 'Visit the 2,200-year-old Dwarkadhish Temple. Watch the 52-yard Dhwajarohan ceremony.',
          evening: 'Sunset walk along Sudama Setu suspension bridge and peaceful boat ride on Gomti river.',
          stay: 'Dwarka',
          km: 110,
          time: '2.5 hrs',
          meal: 'Dwarka Makhan Mishri prasad and wholesome Gujarati Khichdi Kadhi.',
          tip: 'The 52-yard flag changes 5 times daily; watch from the temple square.',
          attractions: ['Dwarkadhish Temple', 'Gomti Ghat', 'Sudama Setu'],
        },
        {
          dest: 'Sudarshan Setu & Bet Dwarka Island',
          morning: 'Drive across the architectural marvel Sudarshan Setu cable bridge to Bet Dwarka.',
          afternoon: 'Visit Nageshwar Mahadev (one of the 12 Jyotirlingas) and Shivrajpur Blue Flag Beach.',
          evening: 'Return to Dwarka or Rajkot for departure.',
          stay: 'Departure / Extended Stay',
          km: 75,
          time: '2 hrs',
          meal: 'Hot Ghooghra and Shrinathji Peda.',
          tip: 'Shivrajpur Beach is certified clean with calm waters ideal for safe family swimming.',
          attractions: ['Sudarshan Setu', 'Bet Dwarka', 'Nageshwar Jyotirlinga', 'Shivrajpur Beach'],
        },
      ];

      for (let i = 0; i < durationDays; i++) {
        const stop = stops[i % stops.length];
        generatedDays.push({
          dayNumber: i + 1,
          destination: `Day ${i + 1}: ${stop.dest}`,
          morningPlan: stop.morning,
          afternoonPlan: stop.afternoon,
          eveningPlan: stop.evening,
          nightStayLocation: stop.stay,
          drivingDistanceKm: stop.km,
          estimatedDrivingTime: stop.time,
          recommendedMeal: stop.meal,
          proTravelTip: stop.tip,
          keyAttractions: stop.attractions,
        });
      }
    } else if (selectedHub === 'Bhuj (Kutch)') {
      const stops = [
        {
          dest: 'Bhuj Royal Heritage & Textile Weaving',
          morning: 'Arrive in Bhuj. Tour Aina Mahal (Hall of Mirrors) and the majestic Prag Mahal bell tower.',
          afternoon: 'Visit the Kutch Museum and Swaminarayan Temple. Lunch on spicy Kutchi Dabeli.',
          evening: 'Visit Bhujodi artisan village to watch Vankar master weavers creating handloom shawls.',
          stay: 'Bhuj Heritage Stay',
          km: 30,
          time: '1 hr',
          meal: 'Authentic Kutchi Dabeli with roasted peanuts and pomegranate seeds.',
          tip: 'Climb Prag Mahal clock tower for 360-degree views of Bhuj city.',
          attractions: ['Aina Mahal', 'Prag Mahal', 'Bhujodi Artisan Village'],
        },
        {
          dest: 'Nirona Rogan Art & Great White Rann',
          morning: 'Drive north towards Dhordo. Stop at Nirona village to witness the 400-year-old Rogan Art.',
          afternoon: 'Check-in to Kutchi Bhunga or luxury tent in Dhordo. Obtain Rann permit at Bhirandiyara.',
          evening: 'Step onto the vast White Rann under sunset. Walk the endless salt flats.',
          stay: 'Dhordo Tent City / White Rann Resort',
          km: 110,
          time: '2.5 hrs',
          meal: 'Traditional Kutchi dinner: Ringna no Olo, Bajra no Rotlo, and pure white butter.',
          tip: 'Take a moonlit walk on the white desert if your trip coincides with Purnima.',
          attractions: ['Nirona Rogan Art', 'White Rann of Kutch', 'Camel Cart Ride'],
        },
        {
          dest: 'Kalo Dungar (Black Hill) & Mandvi Sea Coast',
          morning: 'Drive to Kalo Dungar (highest point in Kutch). View the panoramic border salt expanse.',
          afternoon: 'Drive south to Mandvi coastal town. Visit the royal Vijay Vilas Palace.',
          evening: 'Unwind at Mandvi Beach with fresh tender coconut water and sunset views.',
          stay: 'Mandvi Beach Resort',
          km: 185,
          time: '3.5 hrs',
          meal: 'Fresh coastal snacks and famous Mandvi sweet mawa.',
          tip: 'Vijay Vilas Palace has a private beach and was featured in Lagaan.',
          attractions: ['Kalo Dungar', 'Vijay Vilas Palace', 'Mandvi Beach'],
        },
        {
          dest: '400-Year Wooden Shipyards & Return',
          morning: 'Visit the historic wooden shipbuilding yards along Rukmavati river.',
          afternoon: 'Explore Mandvi Wind Farm Beach and Shyamji Krishna Varma Memorial.',
          evening: 'Drive back to Bhuj for departure flight or train.',
          stay: 'Departure from Bhuj',
          km: 60,
          time: '1.2 hrs',
          meal: 'Traditional Gujarati thali with sweet dal and khichdi.',
          tip: 'Buy authentic Kutchi Bandhani sarees and hand-tuned copper bells in the bazaar.',
          attractions: ['Wooden Shipyards', 'Wind Farm Beach', 'Kranti Tirth'],
        },
      ];

      for (let i = 0; i < durationDays; i++) {
        const stop = stops[i % stops.length];
        generatedDays.push({
          dayNumber: i + 1,
          destination: `Day ${i + 1}: ${stop.dest}`,
          morningPlan: stop.morning,
          afternoonPlan: stop.afternoon,
          eveningPlan: stop.evening,
          nightStayLocation: stop.stay,
          drivingDistanceKm: stop.km,
          estimatedDrivingTime: stop.time,
          recommendedMeal: stop.meal,
          proTravelTip: stop.tip,
          keyAttractions: stop.attractions,
        });
      }
    } else {
      // Ahmedabad / Vadodara / Surat hubs
      const stops = [
        {
          dest: 'Ahmedabad UNESCO Walled City & Sabarmati',
          morning: 'Join the morning AMC Heritage Walk through the carved wooden pols of Old Ahmedabad.',
          afternoon: 'Visit Sidi Saiyyed Mosque to admire the iconic "Tree of Life" marble lattice jali.',
          evening: 'Visit Sabarmati Gandhi Ashram and take a sunset stroll across the Atal Pedestrian Bridge.',
          stay: 'Ahmedabad (House of MG)',
          km: 25,
          time: '1 hr',
          meal: 'Royal Gujarati Rasoi at Agashiye terrace: Puran Poli, Handvo, and Shrikhand.',
          tip: 'The morning heritage walk starts early at 7:30 AM from Kalupur Swaminarayan Temple.',
          attractions: ['Old Ahmedabad Pols', 'Sidi Saiyyed Mosque', 'Sabarmati Ashram', 'Atal Bridge'],
        },
        {
          dest: 'Modhera Sun Temple & Rani ki Vav (Patan)',
          morning: 'Drive north to Modhera Sun Temple. Marvel at the 108 shrines around Surya Kund.',
          afternoon: 'Visit the UNESCO World Heritage Rani ki Vav (Queen’s Stepwell) in Patan.',
          evening: 'See the Salvi family Patan Patola double-ikat silk museum before returning.',
          stay: 'Mehsana or Ahmedabad',
          km: 210,
          time: '4 hrs',
          meal: 'Patan famous Devda sweet and spiced Sev Khamani.',
          tip: 'Modhera is India’s first 100% solar-powered village.',
          attractions: ['Modhera Sun Temple', 'Rani ki Vav UNESCO', 'Patan Patola Museum'],
        },
        {
          dest: 'Vadodara Laxmi Vilas Palace & Heritage',
          morning: 'Drive via NE-1 expressway to Vadodara. Tour the monumental Laxmi Vilas Palace.',
          afternoon: 'Admire Raja Ravi Varma oil canvases at the Maharaja Fateh Singh Museum.',
          evening: 'Explore the Sayaji Baug gardens and local markets.',
          stay: 'Vadodara',
          km: 110,
          time: '2 hrs',
          meal: 'Spicy Mahakali Sev Usal of Vadodara with buttered pav.',
          tip: 'Audio guide at Laxmi Vilas Palace is narrated by the Maharaja and included in the ticket.',
          attractions: ['Laxmi Vilas Palace', 'Fateh Singh Museum', 'Sayaji Baug'],
        },
        {
          dest: 'Ekta Nagar & The World’s Tallest Statue',
          morning: 'Drive to Ekta Nagar along the Narmada river valley (90 km).',
          afternoon: 'Ascend to the 153m Viewing Gallery inside the 182-meter Statue of Unity.',
          evening: 'Marvel at the 3D Laser Projection show on the statue surface and Ekta Glow Garden.',
          stay: 'Ekta Nagar Tent City',
          km: 95,
          time: '1.8 hrs',
          meal: 'Ekta Food Court multi-cuisine thali dinner.',
          tip: 'Book viewing gallery tickets online in advance at sotickets.in — on-the-spot counters do not exist.',
          attractions: ['Statue of Unity', 'Sardar Sarovar Dam', 'Valley of Flowers', 'Laser Show'],
        },
        {
          dest: 'Champaner UNESCO Park & Return',
          morning: 'Visit the Jungle Safari animal park in Ekta Nagar and the Narmada river promenade.',
          afternoon: 'Drive to Champaner-Pavagadh UNESCO Archaeological Park; explore the 15th-century Jama Masjid.',
          evening: 'Return to Ahmedabad/Vadodara airport or railway station for departure.',
          stay: 'Departure',
          km: 130,
          time: '2.5 hrs',
          meal: 'Hot Dal Dhokli and sweet Mohanthal.',
          tip: 'Take the Pavagadh cable car ropeway if you want to visit Kalika Mata Shaktipeeth.',
          attractions: ['Champaner Jama Masjid', 'Pavagadh Hill', 'Departure Hub'],
        },
      ];

      for (let i = 0; i < durationDays; i++) {
        const stop = stops[i % stops.length];
        generatedDays.push({
          dayNumber: i + 1,
          destination: `Day ${i + 1}: ${stop.dest}`,
          morningPlan: stop.morning,
          afternoonPlan: stop.afternoon,
          eveningPlan: stop.evening,
          nightStayLocation: stop.stay,
          drivingDistanceKm: stop.km,
          estimatedDrivingTime: stop.time,
          recommendedMeal: stop.meal,
          proTravelTip: stop.tip,
          keyAttractions: stop.attractions,
        });
      }
    }

    return generatedDays;
  }, [isCustomMode, activeCuratedRoute, durationDays, selectedHub]);

  // Total metrics
  const totalDistance = useMemo(() => {
    return currentItinerary.reduce((acc, curr) => acc + curr.drivingDistanceKm, 0);
  }, [currentItinerary]);

  const estimatedBudget = useMemo(() => {
    const multiplier = budgetTier === 'Budget' ? 2200 : budgetTier === 'Comfort' ? 4200 : 8500;
    return durationDays * multiplier + Math.round(totalDistance * 12);
  }, [durationDays, budgetTier, totalDistance]);

  const handleSaveCurrentTrip = () => {
    const title = isCustomMode
      ? `${durationDays}-Day Custom ${selectedHub} Trio Circuit`
      : activeCuratedRoute.title;
    onSaveTrip(title, currentItinerary);
    setSavedSuccessAlert(true);
    setTimeout(() => setSavedSuccessAlert(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="smart-trio-planner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold tracking-wider uppercase mb-1">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Interactive Itinerary Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Smart Trio Planner
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Choose your starting hub, set your duration (1–14 days), and let our algorithm craft a 
            seamless 3-hub circuit with realistic driving times, temple aarti slots, and culinary stops.
          </p>
        </div>

        {/* Action Buttons: Save & Print */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="print-itinerary-btn"
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Itinerary</span>
          </button>

          <button
            id="save-trip-planner-btn"
            onClick={handleSaveCurrentTrip}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isTripSaved
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700'
            }`}
          >
            {isTripSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isTripSaved ? 'Trip Saved in My Trips' : 'Save Itinerary'}</span>
          </button>
        </div>
      </div>

      {savedSuccessAlert && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-medium animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Itinerary successfully saved to your browser! Access anytime from the top “My Saved” button.</span>
          </div>
          <button onClick={() => setSavedSuccessAlert(false)} className="text-emerald-700 hover:text-emerald-900 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Control Studio Box: Hubs, Duration, Pace & Mode */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-100 shadow-sm space-y-6">
        {/* Step 1: Starting Hub */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black flex items-center justify-center">
                1
              </span>
              Select Your Gateway Starting Hub:
            </label>
            <span className="text-[11px] text-slate-500">
              Current: <strong className="text-amber-700">{selectedHub}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {STARTING_HUBS.map((hub) => {
              const isSelected = selectedHub === hub.name;
              return (
                <button
                  key={hub.name}
                  id={`select-hub-${hub.name.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => {
                    onSelectHub(hub.name);
                    setIsCustomMode(true);
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-900' : 'text-slate-900'}`}>
                      {(hub.name || '').split(' ')[0] || hub.name || 'Hub'}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      {hub.airportCode}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                    {hub.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Duration, Pace & Budget Tier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          {/* Duration Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black flex items-center justify-center">
                  2
                </span>
                Trip Duration:
              </label>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-600 text-white">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            <input
              id="duration-range-slider"
              type="range"
              min="1"
              max="14"
              value={durationDays}
              onChange={(e) => {
                setDurationDays(parseInt(e.target.value, 10));
                setIsCustomMode(true);
              }}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />

            {/* Quick presets */}
            <div className="flex items-center justify-between gap-1 mt-2">
              {[
                { label: '3D Weekend', days: 3 },
                { label: '5D Classic', days: 5 },
                { label: '7D Grand', days: 7 },
                { label: '10D Odyssey', days: 10 },
              ].map((preset) => (
                <button
                  key={preset.days}
                  onClick={() => {
                    setDurationDays(preset.days);
                    setIsCustomMode(true);
                  }}
                  className={`text-[10px] font-semibold px-2 py-1 rounded-md border cursor-pointer transition-all ${
                    durationDays === preset.days
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Pace */}
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black flex items-center justify-center">
                3
              </span>
              Travel Pace:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'Relaxed', desc: '1-2 sights/day, easy mornings' },
                { id: 'Balanced', desc: '3-4 sights/day, ideal mix' },
                { id: 'Explorer', desc: 'Packed, early departures' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPace(p.id as any)}
                  className={`p-2 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                    pace === p.id
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">{p.id}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black flex items-center justify-center">
                4
              </span>
              Comfort & Stays Tier:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'Budget', label: 'Bhavan/Eco', desc: '~₹2.2k/day' },
                { id: 'Comfort', label: 'Resort/3-4★', desc: '~₹4.2k/day' },
                { id: 'Luxury', label: 'Palace/Tents', desc: '~₹8.5k/day' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBudgetTier(b.id as any)}
                  className={`p-2 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                    budgetTier === b.id
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">{b.label}</div>
                  <div className="text-[10px] text-amber-700 font-medium">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Travel Themes / Interests Chips */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
            Trip Themes & Must-Visit Highlights:
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => {
                    toggleInterest(interest.id);
                    setIsCustomMode(true);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{interest.icon}</span>
                  <span>{interest.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Curated Presets Bar vs Custom Switcher */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Or pick an Iconic Curated Trio Circuit:</span>
            <div className="flex flex-wrap gap-1.5">
              {TRIO_ROUTES.map((route) => (
                <button
                  key={route.id}
                  onClick={() => {
                    setActiveCuratedTrioId(route.id);
                    setDurationDays(route.durationDays);
                    setIsCustomMode(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    !isCustomMode && activeCuratedTrioId === route.id
                      ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {route.primaryHubs.join(' - ')}
                </button>
              ))}
            </div>
          </div>

          {isCustomMode && (
            <button
              onClick={() => setIsCustomMode(false)}
              className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-semibold cursor-pointer underline underline-offset-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Curated Trio Presets</span>
            </button>
          )}
        </div>
      </div>

      {/* Overview Card of Active Circuit */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <span className="bg-amber-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
              {isCustomMode ? 'Custom Tailored Circuit' : activeCuratedRoute.badge}
            </span>
            <span>Gateway: {selectedHub}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            {isCustomMode 
              ? `${durationDays}-Day Bespoke Gujarat Experience from ${selectedHub}`
              : activeCuratedRoute.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {isCustomMode
              ? `Tailored itinerary focusing on ${selectedInterests.join(', ')} with ${pace} pace traveling.`
              : activeCuratedRoute.tagline}
          </p>
        </div>

        {/* Quick Stats Widget */}
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-amber-200 text-xs shrink-0">
          <div className="text-center px-2">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Total Route</div>
            <div className="text-sm font-black text-slate-900">~{totalDistance} km</div>
          </div>
          <div className="h-7 w-px bg-amber-200" />
          <div className="text-center px-2">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Duration</div>
            <div className="text-sm font-black text-slate-900">{durationDays} Days</div>
          </div>
          <div className="h-7 w-px bg-amber-200" />
          <div className="text-center px-2">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Est. Expense</div>
            <div className="text-sm font-black text-emerald-700">₹{estimatedBudget.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Day-by-Day Interactive Accordion */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            <span>Day-by-Day Detailed Itinerary ({currentItinerary.length} Days)</span>
          </h3>
          <span className="text-xs text-slate-500">
            Click any day to expand activities, timings, and culinary stops
          </span>
        </div>

        <div className="space-y-3">
          {currentItinerary.map((day) => {
            const isExpanded = expandedDay === day.dayNumber;
            return (
              <div
                key={day.dayNumber}
                id={`day-accordion-${day.dayNumber}`}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-amber-400 shadow-md ring-1 ring-amber-400/20'
                    : 'border-slate-200 hover:border-amber-200'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedDay(isExpanded ? 0 : day.dayNumber)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center text-sm shrink-0">
                      D{day.dayNumber}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {day.destination}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-slate-400" />
                          <span>{day.drivingDistanceKm} km ({day.estimatedDrivingTime})</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>Stay: <strong>{day.nightStayLocation}</strong></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-xs text-amber-700 font-semibold">
                      {isExpanded ? 'Hide Details' : 'View Schedule'}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Day Body */}
                {isExpanded && (
                  <div className="px-4 pb-5 pt-1 border-t border-slate-100 space-y-4 text-xs bg-slate-50/40">
                    {/* 3-Time Segment Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      {/* Morning */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-800 text-xs mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>Morning (6:30 AM - 12:00 PM)</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-xs">
                          {day.morningPlan}
                        </p>
                      </div>

                      {/* Afternoon */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-bold text-orange-800 text-xs mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span>Afternoon (12:00 PM - 5:00 PM)</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-xs">
                          {day.afternoonPlan}
                        </p>
                      </div>

                      {/* Evening & Night */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-bold text-indigo-900 text-xs mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          <span>Evening (5:00 PM - 9:30 PM)</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-xs">
                          {day.eveningPlan}
                        </p>
                      </div>
                    </div>

                    {/* Key Attractions Chips with Direct Navigation */}
                    {day.keyAttractions && day.keyAttractions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">Key Stops:</span>
                        {day.keyAttractions.map((attName) => (
                          <span
                            key={attName}
                            className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-semibold"
                          >
                            {attName}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pro Tip & Culinary Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {/* Culinary Recommendation */}
                      <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 flex items-start gap-2.5">
                        <Utensils className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-900 block text-xs">Must-Try Food for Day {day.dayNumber}:</span>
                          <span className="text-amber-800/90 text-xs">{day.recommendedMeal}</span>
                        </div>
                      </div>

                      {/* Insider Travel Tip */}
                      <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200 flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-blue-900 block text-xs">Insider Tip:</span>
                          <span className="text-blue-800/90 text-xs">{day.proTravelTip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Stays Along Route */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Recommended Stays on this Circuit
            </h3>
            <p className="text-xs text-slate-500">
              Curated heritage palaces, desert luxury tent camps, and ocean-facing pilgrim bhavans
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700">Verified Quality</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAYS.slice(0, 3).map((stay) => (
            <div
              key={stay.id}
              className="group border border-slate-200 rounded-xl overflow-hidden hover:border-amber-400 transition-all hover:shadow-md bg-white"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={stay.imageUrl}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {stay.type}
                </span>
                <span className="absolute bottom-2 right-2 bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  ★ {stay.rating}
                </span>
              </div>
              <div className="p-3.5 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm truncate">{stay.name}</h4>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="truncate">{stay.location}</span>
                  <span className="font-bold text-emerald-700 whitespace-nowrap">{stay.priceRange}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {stay.experienceHighlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
