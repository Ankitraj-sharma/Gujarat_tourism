import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Bookmark, 
  Menu, 
  X, 
  Sun,
  Search,
  Waves,
  Hotel,
  UtensilsCrossed,
  User,
  Building,
  LogIn
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  searchQuery,
  setSearchQuery,
  user,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'cities', label: 'Popular Destinations', icon: Building, badge: 'Stitch' },
    { id: 'planner', label: 'Smart Trio Planner', icon: Compass, badge: 'Popular' },
    { id: 'temples', label: 'Temple Darshan', icon: Sun },
    { id: 'coastal', label: 'Coastal & 3D', icon: Waves },
    { id: 'saved', label: 'Saved Treasures', icon: Bookmark },
    { id: 'stays', label: 'Hotels & Stays', icon: Hotel },
    { id: 'culture', label: 'Cuisine & Crafts', icon: UtensilsCrossed },
    { id: 'budget', label: 'Budget Calculator', icon: Calendar },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
        {/* Top Banner with Gujarati Greeting */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium tracking-wide">
              <span className="bg-white/20 text-white font-semibold px-2 py-0.5 rounded text-[11px]">
                ખુશ્બુ ગુજરાત કી
              </span>
              <span className="hidden sm:inline">“Kutch Nahi Dekha Toh Kuch Nahi Dekha”</span>
              <span className="text-amber-200">| Official Inspired Tourism Portal</span>
            </div>
            <div className="flex items-center gap-4 text-amber-100 text-[11px]">
              <span>✨ 4 UNESCO Sites</span>
              <span className="hidden md:inline">• 1,600 km Arabian Coastline</span>
              <span className="hidden lg:inline">• The Realm of Asiatic Lions</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo & Brand */}
            <div 
              id="brand-logo"
              onClick={() => setActiveTab('cities')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 font-serif">
                    Explore <span className="text-amber-600">Gujarat</span>
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    GJ
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 -mt-0.5 hidden sm:block">
                  Khushboo Gujarat Ki • Smart Tourism Portal
                </p>
              </div>
            </div>

            {/* Quick Search */}
            <div className="hidden xl:flex flex-1 max-w-xs relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search temples, White Rann, Gir..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-amber-800 bg-amber-50 shadow-xs border border-amber-200/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions: Saved Trips & Auth / Profile */}
            <div className="flex items-center gap-2">
              <button
                id="saved-trips-btn"
                onClick={() => setActiveTab('saved')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold shadow-xs ${
                  activeTab === 'saved'
                    ? 'bg-orange-50 border-orange-300 text-orange-700'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                }`}
                title="View Saved Wishlist"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Saved</span>
                {savedCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-black flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* User Profile or Sign In Button */}
              {user ? (
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all ${
                    activeTab === 'profile'
                      ? 'bg-orange-50 border-orange-400 ring-2 ring-orange-500/20'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                  title="View Profile"
                >
                  <img
                    src={user.avatarUrl || 'https://lh3.googleusercontent.com/aida/AEtjO1WewJGM3H7HNvDr6lzL5W7qfI1xsQXEVd15kwF6FVl5RJjgSLj-Zwco3kDarx0sbfe_wV2CnP0FuiL4GvzpDwVcNesZZ7Nuzoa9b06bCjL17zLmAabctA4uHjwz-_iluIJ_0RXK-qBLymlaz2khmwtcApYtxpuva6mGoSY-0wXurk2tEXFPd0i7pw4TqUsxVcSOZeHWhshuiKT-NVS1vgpz2HRb87Wp6mbvOdmd9t0OnBtaJlNOkrQzNKU'}
                    alt={user.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-bold text-slate-800 hidden sm:inline max-w-[90px] truncate">
                    {(user.name || user.username || 'Explorer').split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search attractions, temples, safaris..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-amber-50 text-amber-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  if (user) setActiveTab('profile');
                  else onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium text-orange-700 bg-orange-50/70 mt-2"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-orange-600" />
                  <span>{user ? `Profile (${user.name || user.username || 'Explorer'})` : 'Sign In / Register'}</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Stitch Floating Bottom Navigation Bar (Mobile / Responsive) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('cities')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'cities' ? 'text-orange-600 font-bold' : 'text-slate-400'
          }`}
        >
          <Building className="w-5 h-5" />
          <span className="text-[10px]">Destinations</span>
        </button>

        <button
          onClick={() => setActiveTab('planner')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'planner' ? 'text-orange-600 font-bold' : 'text-slate-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Trio Planner</span>
        </button>

        <button
          onClick={() => setActiveTab('coastal')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'coastal' ? 'text-orange-600 font-bold' : 'text-slate-400'
          }`}
        >
          <Waves className="w-5 h-5" />
          <span className="text-[10px]">3D Coastal</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`relative flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'saved' ? 'text-orange-600 font-bold' : 'text-slate-400'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          {savedCount > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-black flex items-center justify-center">
              {savedCount}
            </span>
          )}
          <span className="text-[10px]">Saved</span>
        </button>

        <button
          onClick={() => {
            if (user) setActiveTab('profile');
            else onOpenAuth('login');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'profile' ? 'text-orange-600 font-bold' : 'text-slate-400'
          }`}
        >
          {user ? (
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="w-5 h-5 rounded-full object-cover border border-orange-500"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="text-[10px]">{user ? 'Profile' : 'Sign In'}</span>
        </button>
      </nav>
    </>
  );
};
