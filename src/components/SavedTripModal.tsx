import React from 'react';
import { 
  X, 
  Bookmark, 
  Printer, 
  Trash2, 
  Share2, 
  MapPin, 
  Calendar, 
  Car, 
  Utensils, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { DayPlan, Attraction } from '../types';
import { ATTRACTIONS } from '../data/gujaratData';

interface SavedTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTripTitle: string | null;
  savedItinerary: DayPlan[];
  savedAttractionIds: string[];
  onRemoveBookmark: (id: string) => void;
  onClearTrip: () => void;
  onSelectAttraction: (attraction: Attraction) => void;
}

export const SavedTripModal: React.FC<SavedTripModalProps> = ({
  isOpen,
  onClose,
  savedTripTitle,
  savedItinerary,
  savedAttractionIds,
  onRemoveBookmark,
  onClearTrip,
  onSelectAttraction,
}) => {
  if (!isOpen) return null;

  const bookmarkedAttractions = ATTRACTIONS.filter((a) => savedAttractionIds.includes(a.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                My Saved Itinerary & Bookmarks
              </h2>
              <p className="text-xs text-slate-500">
                Offline browser persistence • Print or export your customized itinerary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 text-xs text-slate-700">
          {/* Saved Trip Itinerary Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Current Saved Circuit:</span>
              </h3>
              {savedItinerary.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer text-[11px]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Itinerary</span>
                  </button>
                  <button
                    onClick={onClearTrip}
                    className="text-red-600 hover:text-red-700 font-semibold cursor-pointer text-[11px]"
                  >
                    Clear Circuit
                  </button>
                </div>
              )}
            </div>

            {savedItinerary.length > 0 ? (
              <div className="space-y-3">
                <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                  <div className="font-bold text-amber-950 text-sm font-serif">
                    {savedTripTitle || 'Custom Gujarat Circuit'}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                    {savedItinerary.length} Days • Total estimated distance ~
                    {savedItinerary.reduce((acc, c) => acc + c.drivingDistanceKm, 0)} km
                  </div>
                </div>

                <div className="space-y-2">
                  {savedItinerary.map((day) => (
                    <div
                      key={day.dayNumber}
                      className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-xs">
                          {day.destination}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {day.drivingDistanceKm} km ({day.estimatedDrivingTime})
                        </span>
                      </div>

                      <p className="text-slate-600 text-[11px] line-clamp-2">
                        <strong>Morning:</strong> {day.morningPlan}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span>Stay: <strong>{day.nightStayLocation}</strong></span>
                        <span className="text-amber-800">Meal: {day.recommendedMeal.slice(0, 35)}...</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-dashed border-slate-300 text-slate-500">
                <Sparkles className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="font-semibold text-xs text-slate-700">No active itinerary saved yet.</p>
                <p className="text-[11px] mt-1">
                  Open the <strong>Smart Trio Planner</strong> and click <strong>“Save Itinerary”</strong> to keep your favorite plan here!
                </p>
              </div>
            )}
          </div>

          {/* Bookmarked Attractions Section */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>Bookmarked Attractions ({bookmarkedAttractions.length})</span>
            </h3>

            {bookmarkedAttractions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bookmarkedAttractions.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-all"
                  >
                    <div 
                      onClick={() => {
                        onSelectAttraction(att);
                        onClose();
                      }}
                      className="flex items-center gap-2.5 cursor-pointer overflow-hidden flex-1"
                    >
                      <img
                        src={att.imageUrl}
                        alt={att.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {att.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {att.cityOrDistrict}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(att.id)}
                      className="text-slate-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                No attractions bookmarked yet. Click the bookmark icon on any attraction card to save it.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-3xl flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-all"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
