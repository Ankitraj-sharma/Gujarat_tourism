import React, { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  Trash2, 
  MapPin, 
  FolderPlus, 
  Wifi, 
  WifiOff, 
  Compass, 
  Navigation, 
  Calendar, 
  Sparkles, 
  Share2, 
  Check, 
  X, 
  Plus,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { Attraction } from '../types';

interface SavedTreasuresViewProps {
  savedAttractions: Attraction[];
  onRemoveAttraction: (id: string) => void;
  onSelectAttraction: (attraction: Attraction) => void;
  onOpenTripPlanner: () => void;
  onOpenCoastal3D?: () => void;
}

export const SavedTreasuresView: React.FC<SavedTreasuresViewProps> = ({
  savedAttractions,
  onRemoveAttraction,
  onSelectAttraction,
  onOpenTripPlanner,
  onOpenCoastal3D,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [offlineCached, setOfflineCached] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState([
    { id: 'f1', name: 'Saurashtra Road Trip', count: 5, color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'f2', name: 'Char Dham Yatra', count: 3, color: 'bg-orange-100 text-orange-900 border-orange-300' },
    { id: 'f3', name: 'Rann Utsav Winter', count: 4, color: 'bg-blue-100 text-blue-900 border-blue-300' },
  ]);

  const filterTabs = ['All', 'Pilgrimage', 'Beaches & Coast', 'Heritage & Forts', 'Crafts & Desert'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setFolders((prev) => [
      ...prev,
      {
        id: `f_${Date.now()}`,
        name: newFolderName.trim(),
        count: 0,
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      },
    ]);
    setNewFolderName('');
    setNewFolderOpen(false);
    showToast('Folder created successfully!');
  };

  const filteredItems = savedAttractions.filter((att) => {
    const cityName = att.cityOrDistrict || (att as any).city || '';
    const matchesSearch =
      (att.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (att.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === 'All') return matchesSearch;
    if (selectedFilter === 'Pilgrimage') return matchesSearch && (att.category === 'Spiritual & Temples' || (att.category as any) === 'Pilgrimage');
    if (selectedFilter === 'Beaches & Coast') return matchesSearch && (att.category === 'Coastal & Beaches' || (att.category as any) === 'Coastal' || att.name.includes('Beach'));
    if (selectedFilter === 'Heritage & Forts') return matchesSearch && (att.category === 'UNESCO & Heritage' || (att.category as any) === 'Heritage');
    if (selectedFilter === 'Crafts & Desert') return matchesSearch && (att.category === 'Culture & Desert' || (att.category as any) === 'Cultural' || att.name.includes('Rann'));
    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
            <Bookmark className="w-3.5 h-3.5 text-orange-600 fill-current" />
            <span>Curated Wishlist</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight mt-0.5">
            Saved Treasures
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your bookmarked temples, beaches, and safari permits with offline sync
          </p>
        </div>

        {/* Offline Cache Switcher Pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 p-2.5 rounded-2xl shadow-xs shrink-0">
          <div className="flex items-center gap-2">
            {offlineCached ? (
              <Wifi className="w-4 h-4 text-emerald-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-slate-400" />
            )}
            <div className="text-left">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Offline Mode
              </span>
              <span className="text-[10px] text-slate-500">
                {offlineCached ? 'Maps & aarti cached (28 MB)' : 'Disabled'}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setOfflineCached(!offlineCached);
              showToast(
                !offlineCached
                  ? 'Heritage guides cached for offline use!'
                  : 'Offline cache freed'
              );
            }}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
              offlineCached ? 'bg-orange-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                offlineCached ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-slate-900 text-white text-xs rounded-2xl flex items-center justify-between shadow-lg">
          <span>{toastMessage}</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Curated Itinerary Folders */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Itinerary Folders
          </span>
          <button
            onClick={() => setNewFolderOpen(true)}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Folder</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`p-3.5 rounded-2xl border ${folder.color} cursor-pointer hover:shadow-sm transition-all`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="truncate">{folder.name}</span>
              </div>
              <span className="text-[11px] opacity-80">{folder.count} places</span>
            </div>
          ))}

          <button
            onClick={() => setNewFolderOpen(true)}
            className="p-3.5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 text-slate-500 hover:text-orange-600 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Add Custom Trip</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within your saved attractions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 outline-none focus:border-orange-500 shadow-xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {filterTabs.map((tab) => {
            const active = selectedFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Saved Places List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No saved treasures found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Bookmark destinations from the Cities Explorer, Coastal Drives, or Temple Darshan views to access them here anytime.
          </p>
          <button
            onClick={onOpenTripPlanner}
            className="px-5 py-2.5 rounded-full bg-orange-600 text-white font-bold text-xs shadow-sm hover:bg-orange-700 transition-colors"
          >
            Launch Smart Trio Planner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((att) => (
            <div
              key={att.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 hover:border-orange-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex gap-3.5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={att.imageUrl}
                    alt={att.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-black/60 text-white backdrop-blur-xs">
                    {att.category}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-orange-600 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{att.cityOrDistrict || (att as any).city || 'Gujarat'}</span>
                    </span>
                    <button
                      onClick={() => onRemoveAttraction(att.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base font-serif truncate mt-0.5">
                    {att.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {att.shortDescription}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold mt-2">
                    <span>★ {att.rating}</span>
                    <span>•</span>
                    <span>{att.recommendedDuration || (att as any).suggestedVisitDuration || '2 - 3 Hours'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-3.5 mt-3.5 border-t border-slate-100">
                <button
                  onClick={() => onSelectAttraction(att)}
                  className="py-2 px-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs text-center transition-colors truncate"
                >
                  View Guide
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${att.name}, ${att.cityOrDistrict || (att as any).city || 'Gujarat'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1 truncate"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Directions</span>
                </a>

                {onOpenCoastal3D && (
                  <button
                    onClick={onOpenCoastal3D}
                    className="py-2 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1 truncate"
                  >
                    <Compass className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>3D Map</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Folder Modal */}
      {newFolderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleCreateFolder}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Create Itinerary Folder</h3>
              <button
                type="button"
                onClick={() => setNewFolderOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Folder Name
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g. Dwarka-Somnath Pilgrimage"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setNewFolderOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm"
              >
                Create Folder
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
