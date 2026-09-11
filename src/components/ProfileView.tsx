import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Share2, 
  MapPin, 
  Award, 
  QrCode, 
  Calendar, 
  ShieldCheck, 
  PhoneCall, 
  AlertTriangle, 
  LogOut, 
  ChevronRight, 
  Edit3, 
  Compass, 
  Check, 
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { UserProfile, UserBooking } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onOpenLoginModal,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBookingQr, setSelectedBookingQr] = useState<UserBooking | null>(null);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Edit form state
  const [name, setName] = useState(user.name);
  const [tagline, setTagline] = useState(user.tagline);
  const [phone, setPhone] = useState(user.phone || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      tagline,
      phone,
    });
    setEditModalOpen(false);
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.name} - Gujarat Explorer Profile`,
        text: `View my Vibrant Gujarat travel footprint and badges!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 absolute top-0 left-0 right-0" />

        <div className="relative pt-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-xs">
                4
              </span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold text-slate-900 font-serif">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900">
                  Silver
                </span>
              </div>
              <p className="text-xs text-slate-500">@{user.username} • {user.tagline}</p>
              <p className="text-xs font-semibold text-orange-600 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{user.level}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-orange-600" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={handleShareProfile}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {shareToast && (
        <div className="p-3 bg-slate-900 text-white text-xs rounded-2xl flex items-center justify-between shadow-lg">
          <span>Profile link copied to clipboard!</span>
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Travel Footprint Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Districts
          </span>
          <div className="flex items-baseline justify-center sm:justify-start gap-1 mt-0.5">
            <span className="text-2xl font-black text-slate-900">{user.districtsExplored}</span>
            <span className="text-xs text-slate-400">/ 33</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Places Visited
          </span>
          <span className="text-2xl font-black text-slate-900 block mt-0.5">
            {user.placesVisited}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Bookmarked
          </span>
          <span className="text-2xl font-black text-slate-900 block mt-0.5">
            {user.bookmarkedCount}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
            Travel Reviews
          </span>
          <div className="flex items-baseline justify-center sm:justify-start gap-1 mt-0.5">
            <span className="text-2xl font-black text-slate-900">{user.travelReviewsCount}</span>
            <span className="text-xs text-amber-500 font-bold">4.9★</span>
          </div>
        </div>
      </div>

      {/* Gujarat Explorer Badges */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-600" />
            <h3 className="font-bold text-slate-900 text-sm">Gujarat Explorer Badges</h3>
          </div>
          <span className="text-xs font-semibold text-orange-600">5 Earned</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className="p-3.5 rounded-2xl border border-amber-200/70 bg-gradient-to-b from-amber-50/50 to-orange-50/30 flex flex-col items-center text-center justify-between shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-base shadow-sm mb-2">
                ★
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  {badge.name}
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                  {badge.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Bookings & E-Passes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Active E-Passes & Bookings
          </span>
          <span className="text-xs font-semibold text-slate-400">2 Confirmed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {user.bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 uppercase text-[10px]">
                    {booking.status}
                  </span>
                  <span className="font-mono text-slate-500 font-semibold">{booking.passNumber}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-base font-serif">
                  {booking.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{booking.location}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-700 mt-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{booking.time}</span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{booking.travelers} Traveler(s)</span>
                <button
                  onClick={() => setSelectedBookingQr(booking)}
                  className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Show Entry QR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gujarat Tourism Support & Security */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Tourism Security & Emergency SOS</span>
          </div>
          <span className="text-[11px] text-slate-400">Govt. of Gujarat</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="tel:18002337951"
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-3 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">24x7 Official Helpline</span>
              <span className="text-[11px] text-slate-400">1800 233 7951 (Toll-Free)</span>
            </div>
          </a>

          <button
            onClick={() => setSosModalOpen(true)}
            className="p-3.5 rounded-2xl bg-red-950/40 hover:bg-red-950/60 border border-red-800/50 flex items-center gap-3 text-left transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-red-300 block">Emergency SOS Dispatch</span>
              <span className="text-[11px] text-slate-400">Tap for Police / Medical 112</span>
            </div>
          </button>
        </div>
      </div>

      {/* Account Settings & Logout */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-1">
        <button
          onClick={onOpenLoginModal}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-slate-400" />
            <span>Switch Account / Manage Logins</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-red-50 text-red-600 text-xs font-bold transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4 text-red-500" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </button>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base font-serif">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bio / Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* QR Code Pass Viewer Modal */}
      {selectedBookingQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xs w-full p-6 text-center space-y-4 shadow-2xl border border-orange-200">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                Verified E-Pass
              </span>
              <button
                onClick={() => setSelectedBookingQr(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h4 className="font-bold text-slate-900 text-base font-serif">
              {selectedBookingQr.title}
            </h4>

            {/* QR Code graphic */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
              <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Stylized QR patterns */}
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#1e293b" />
                  <rect x="14" y="14" width="17" height="17" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#f57c00" />
                  <rect x="65" y="10" width="25" height="25" fill="#1e293b" />
                  <rect x="69" y="14" width="17" height="17" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#f57c00" />
                  <rect x="10" y="65" width="25" height="25" fill="#1e293b" />
                  <rect x="14" y="69" width="17" height="17" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#f57c00" />
                  <rect x="42" y="15" width="16" height="8" fill="#1e293b" />
                  <rect x="42" y="30" width="8" height="16" fill="#1e293b" />
                  <rect x="15" y="42" width="16" height="8" fill="#1e293b" />
                  <rect x="45" y="55" width="10" height="10" fill="#f57c00" />
                  <rect x="65" y="45" width="25" height="8" fill="#1e293b" />
                  <rect x="60" y="65" width="8" height="25" fill="#1e293b" />
                  <rect x="75" y="75" width="15" height="15" fill="#1e293b" />
                </svg>
              </div>
              <span className="font-mono text-xs font-bold text-slate-700 mt-2">
                {selectedBookingQr.passNumber}
              </span>
            </div>

            <div className="text-left text-xs text-slate-600 space-y-1">
              <p><strong>Gate:</strong> {selectedBookingQr.location}</p>
              <p><strong>Valid for:</strong> {selectedBookingQr.time}</p>
              <p><strong>Holder:</strong> {user.name}</p>
            </div>

            <button
              onClick={() => setSelectedBookingQr(null)}
              className="w-full py-2 bg-orange-600 text-white rounded-full text-xs font-bold shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Emergency SOS Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-red-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h4 className="font-bold text-slate-900 text-lg">Emergency Assistance</h4>
            <p className="text-xs text-slate-600">
              Your live location coordinates will be shared with the nearest Gujarat Tourist Police control room.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                className="w-full py-3 px-4 rounded-full bg-red-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-red-500/30"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Unified Emergency 112</span>
              </a>

              <a
                href="tel:108"
                className="w-full py-3 px-4 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Medical Ambulance 108</span>
              </a>
            </div>

            <button
              onClick={() => setSosModalOpen(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
