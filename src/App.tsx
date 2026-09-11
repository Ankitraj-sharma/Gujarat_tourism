/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PopularDestinations } from './components/PopularDestinations';
import { CityDetailView } from './components/CityDetailView';
import { SavedTreasuresView } from './components/SavedTreasuresView';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';

import { SmartTrioPlanner } from './components/SmartTrioPlanner';
import { AttractionsExplorer } from './components/AttractionsExplorer';
import { TempleDarshanGuide } from './components/TempleDarshanGuide';
import { CoastalDrivesGuide } from './components/CoastalDrivesGuide';
import { StaysAndResorts } from './components/StaysAndResorts';
import { CulinaryAndCrafts } from './components/CulinaryAndCrafts';
import { TripBudgetCalculator } from './components/TripBudgetCalculator';
import { AttractionModal } from './components/AttractionModal';
import { SavedTripModal } from './components/SavedTripModal';

import { StartingHub, Attraction, DayPlan, UserProfile, CityPlace } from './types';
import { ATTRACTIONS } from './data/gujaratData';
import { CITIES_DATA, INITIAL_USER_PROFILE } from './data/citiesData';
import { Sparkles, Phone, Mail, Globe, Shield, Heart } from 'lucide-react';

export default function App() {
  // Navigation active tab: 'cities' (Popular Destinations) | 'planner' | 'attractions' | 'temples' | 'coastal' | 'saved' | 'stays' | 'culture' | 'budget' | 'profile' | 'city-detail'
  const [activeTab, setActiveTab] = useState<string>('cities');
  const [selectedHub, setSelectedHub] = useState<StartingHub>('Ahmedabad');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [savedTripModalOpen, setSavedTripModalOpen] = useState<boolean>(false);
  const [selectedCityId, setSelectedCityId] = useState<string>('dwarka');

  // Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // User Profile state with local persistence
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('gujarat_user_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return {
            ...INITIAL_USER_PROFILE,
            ...parsed,
            name: parsed.name || INITIAL_USER_PROFILE.name,
            username: parsed.username || INITIAL_USER_PROFILE.username,
          };
        }
      }
      return INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Trip and Attractions persistence in localStorage
  const [savedTripTitle, setSavedTripTitle] = useState<string | null>(() => {
    try {
      return localStorage.getItem('gujarat_saved_trip_title') || null;
    } catch {
      return null;
    }
  });

  const [savedItinerary, setSavedItinerary] = useState<DayPlan[]>(() => {
    try {
      const stored = localStorage.getItem('gujarat_saved_itinerary');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedAttractionIds, setSavedAttractionIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('gujarat_bookmarked_attractions');
      return stored ? JSON.parse(stored) : ['dwarkadhish-temple', 'somnath-temple', 'white-rann-kutch'];
    } catch {
      return ['dwarkadhish-temple', 'somnath-temple', 'white-rann-kutch'];
    }
  });

  // Save profile to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('gujarat_user_profile', JSON.stringify(user));
      } else {
        localStorage.removeItem('gujarat_user_profile');
      }
    } catch (e) {
      console.warn('Profile save failed:', e);
    }
  }, [user]);

  // Save trips and bookmarks to localStorage
  useEffect(() => {
    try {
      if (savedTripTitle) {
        localStorage.setItem('gujarat_saved_trip_title', savedTripTitle);
      } else {
        localStorage.removeItem('gujarat_saved_trip_title');
      }
      localStorage.setItem('gujarat_saved_itinerary', JSON.stringify(savedItinerary));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, [savedTripTitle, savedItinerary]);

  useEffect(() => {
    try {
      localStorage.setItem('gujarat_bookmarked_attractions', JSON.stringify(savedAttractionIds));
    } catch (e) {
      console.warn('Bookmark storage failed:', e);
    }
  }, [savedAttractionIds]);

  const handleToggleBookmark = (id: string) => {
    setSavedAttractionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveTrip = (tripTitle: string, itinerary: DayPlan[]) => {
    setSavedTripTitle(tripTitle);
    setSavedItinerary(itinerary);
  };

  const handleClearTrip = () => {
    setSavedTripTitle(null);
    setSavedItinerary([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && activeTab !== 'attractions' && activeTab !== 'cities') {
      setActiveTab('cities');
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    handleOpenAuth('login');
  };

  // Select a city to view its detailed page
  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    setActiveTab('city-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Convert CityPlace to Attraction for modal view
  const handleSelectCityPlace = (place: CityPlace) => {
    const existingAtt = ATTRACTIONS.find(
      (a) => a.id === place.id || a.name.toLowerCase().includes(place.name.toLowerCase().slice(0, 8))
    );
    if (existingAtt) {
      setSelectedAttraction(existingAtt);
    } else {
      setSelectedAttraction({
        id: place.id,
        name: place.name,
        cityOrDistrict: selectedCity?.name || 'Dwarka',
        region: (selectedCity?.region as any) || 'Saurashtra',
        category: 'Spiritual & Temples',
        rating: place.rating || 4.8,
        reviewsCount: 4200,
        recommendedDuration: '2 - 3 Hours',
        bestTimeOfDay: 'Morning / Evening Aarti',
        timings: place.timings || 'Open daily (6:00 AM - 9:00 PM)',
        entryFee: place.entryFee || 'Free Entry',
        shortDescription: place.description || 'Iconic destination in Gujarat',
        detailedDescription: `${place.description || place.name} Timings: ${place.timings || 'Daily'}. Entry: ${place.entryFee || 'Free'}.`,
        historicalSignificance: `Celebrated attraction in ${selectedCity?.name || 'Gujarat'} visited by thousands of travelers and devotees.`,
        imageUrl: place.imageUrl,
        highlights: place.tags || ['Historic Landmark', 'Gujarat Tourism'],
        insiderTips: [
          'Modest attire recommended for traditional and heritage places.',
          'Visit early in the morning or near sunset for best photography and tranquility.',
        ],
        mustTryFoodNearby: ['Authentic Gujarati Farsan & Tea', 'Kathiyawadi Thali'],
        latitude: 22.24,
        longitude: 68.96,
        tags: place.tags || ['Heritage', 'Gujarat'],
      });
    }
  };

  const selectedCity = CITIES_DATA.find((c) => c.id === selectedCityId) || CITIES_DATA[2];

  const savedAttractionObjects = ATTRACTIONS.filter((a) => savedAttractionIds.includes(a.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-200 selection:text-amber-900 pb-16 sm:pb-0">
      {/* Sticky Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedAttractionIds.length}
        onOpenSaved={() => {
          setActiveTab('saved');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        user={user}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {/* Stitch Screen 1 & 2: Popular Destinations */}
        {activeTab === 'cities' && (
          <PopularDestinations
            onSelectCity={handleSelectCity}
            onOpenTripPlanner={() => setActiveTab('planner')}
          />
        )}

        {/* Stitch Screen 1 & 4: Destination Detail (e.g. Dwarka) */}
        {activeTab === 'city-detail' && (
          <CityDetailView
            city={selectedCity}
            onBack={() => setActiveTab('cities')}
            onSelectPlace={handleSelectCityPlace}
            isBookmarked={savedAttractionIds.includes(selectedCity.id)}
            onToggleBookmark={() => handleToggleBookmark(selectedCity.id)}
            onBookDarshanPass={() => setActiveTab('temples')}
          />
        )}

        {/* Stitch Screen 2 & 3: Saved Treasures */}
        {activeTab === 'saved' && (
          <SavedTreasuresView
            savedAttractions={savedAttractionObjects}
            onRemoveAttraction={handleToggleBookmark}
            onSelectAttraction={(att) => setSelectedAttraction(att)}
            onOpenTripPlanner={() => setActiveTab('planner')}
            onOpenCoastal3D={() => setActiveTab('coastal')}
          />
        )}

        {/* Stitch Screen 5: User Profile & Accounts */}
        {activeTab === 'profile' && user && (
          <ProfileView
            user={user}
            onUpdateUser={setUser}
            onLogout={handleLogout}
            onOpenLoginModal={() => handleOpenAuth('login')}
          />
        )}

        {/* Existing Feature: Smart Trio Planner */}
        {activeTab === 'planner' && (
          <>
            <Hero
              onSelectHub={(hub) => {
                setSelectedHub(hub);
                setActiveTab('planner');
              }}
              onExplorePlanner={() => {
                const el = document.getElementById('smart-trio-planner');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreTemples={() => setActiveTab('temples')}
            />
            <SmartTrioPlanner
              selectedHub={selectedHub}
              onSelectHub={setSelectedHub}
              onSaveTrip={handleSaveTrip}
              onViewAttraction={(id) => {
                const att = ATTRACTIONS.find((a) => a.id === id);
                if (att) setSelectedAttraction(att);
              }}
              onViewTemple={() => setActiveTab('temples')}
              isTripSaved={savedItinerary.length > 0}
            />
          </>
        )}

        {/* Existing Feature: Attractions Explorer */}
        {activeTab === 'attractions' && (
          <AttractionsExplorer
            onSelectAttraction={(att) => setSelectedAttraction(att)}
            savedAttractionIds={savedAttractionIds}
            onToggleBookmark={handleToggleBookmark}
            searchQuery={searchQuery}
          />
        )}

        {/* Existing Feature: Temple Darshan Guide */}
        {activeTab === 'temples' && <TempleDarshanGuide />}

        {/* Existing Feature + 3D Three.js Map: Coastal Drives */}
        {activeTab === 'coastal' && <CoastalDrivesGuide />}

        {/* Existing Feature: Hotels & Stays */}
        {activeTab === 'stays' && <StaysAndResorts />}

        {/* Existing Feature: Cuisine & Crafts */}
        {activeTab === 'culture' && <CulinaryAndCrafts />}

        {/* Existing Feature: Trip Budget Calculator */}
        {activeTab === 'budget' && <TripBudgetCalculator />}
      </main>

      {/* Detailed Attraction Modal */}
      <AttractionModal
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
        isSaved={selectedAttraction ? savedAttractionIds.includes(selectedAttraction.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Saved Itinerary & Bookmarks Drawer */}
      <SavedTripModal
        isOpen={savedTripModalOpen}
        onClose={() => setSavedTripModalOpen(false)}
        savedTripTitle={savedTripTitle}
        savedItinerary={savedItinerary}
        savedAttractionIds={savedAttractionIds}
        onRemoveBookmark={handleToggleBookmark}
        onClearTrip={handleClearTrip}
        onSelectAttraction={(att) => setSelectedAttraction(att)}
      />

      {/* Login & Registration Modal with Google, Facebook, and Phone Number OTP with Validations */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setActiveTab('profile');
        }}
        initialMode={authModalMode}
      />

      {/* Authentic Gujarat Tourism Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-sm">
                  GJ
                </div>
                <span className="font-extrabold text-lg text-white font-serif tracking-tight">
                  Explore <span className="text-amber-400">Gujarat</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Celebrating the timeless heritage, sacred shrines, coastal beauty, and wild wonders of vibrant Gujarat.
              </p>
              <div className="text-[11px] text-amber-300 font-medium">
                “પધારો અમારે દેશ — જય શ્રી કૃષ્ણ”
              </div>
            </div>

            {/* Quick Circuits */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Popular Circuits</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => setActiveTab('cities')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Popular Destinations (33 Districts)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('planner')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Smart Trio Circuit Planner
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('temples')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Somnath & Dwarka Aarti Timings
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('coastal')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    1,600 km Arabian Coastal Highway & 3D
                  </button>
                </li>
              </ul>
            </div>

            {/* Travel Essentials */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Traveler Tools</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => setActiveTab('saved')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Saved Treasures & Offline Guides
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('budget')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Trip Cost & Fuel Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('stays')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Heritage Haveli & Palace Stays
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpenAuth('login')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Traveler Sign In & E-Passes
                  </button>
                </li>
              </ul>
            </div>

            {/* Helpline & Security */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Assistance & Helpline</h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tourist Helpline: 1800 233 7951</span>
                </p>
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Police & Medical SOS: 112 / 108</span>
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>gujarattourism.com</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>
              © 2026 Explore Gujarat • Built with high-fidelity Stitch Design Model
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
