import React from 'react';
import { UtensilsCrossed, Calendar, Ticket, Phone, Clock, Sparkles } from 'lucide-react';
import { RESTAURANT_PROFILE } from '../data/culinaryData';

interface NavbarProps {
  activeTab: 'profile' | 'menu' | 'booking' | 'ambiance' | 'reviews';
  setActiveTab: (tab: 'profile' | 'menu' | 'booking' | 'ambiance' | 'reviews') => void;
  myBookingsCount: number;
  onOpenMyBookings: () => void;
  onQuickBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  myBookingsCount,
  onOpenMyBookings,
  onQuickBookClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top micro-bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reservasi Meja Instan & Garansi Meja Tersedia</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-400">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>Buka Setiap Hari: 10.30 - 22.30 WIB</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${RESTAURANT_PROFILE.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Layanan Tamu: {RESTAURANT_PROFILE.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 flex items-center justify-center shadow-md shadow-amber-950/10 group-hover:scale-105 transition-transform border border-amber-600/30">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif-display font-bold text-xl sm:text-2xl text-stone-900 tracking-tight leading-none group-hover:text-amber-800 transition-colors">
                Selera Nusantara
              </span>
              <span className="text-[11px] text-stone-500 font-medium tracking-wide uppercase mt-0.5">
                Heritage Dining & Spices
              </span>
            </div>
          </button>

          {/* Navigation items */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-full border border-stone-200">
            <button
              id="nav-tab-profile"
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Profil Kuliner & Dapur
            </button>
            <button
              id="nav-tab-menu"
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeTab === 'menu'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Menu Andalan
            </button>
            <button
              id="nav-tab-ambiance"
              onClick={() => setActiveTab('ambiance')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeTab === 'ambiance'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Pilihan Area Meja
            </button>
            <button
              id="nav-tab-booking"
              onClick={() => setActiveTab('booking')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'booking'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-amber-900 font-semibold hover:bg-amber-100/70'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Booking Jadwal</span>
            </button>
            <button
              id="nav-tab-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Ulasan Tamu
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* My Bookings Button */}
            <button
              id="btn-open-my-reservations"
              onClick={onOpenMyBookings}
              className="relative p-2.5 sm:px-3.5 sm:py-2 text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
              title="Daftar Reservasi Saya"
            >
              <Ticket className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">Reservasi Saya</span>
              {myBookingsCount > 0 && (
                <span className="w-5 h-5 bg-amber-700 text-white text-[11px] font-bold rounded-full flex items-center justify-center leading-none">
                  {myBookingsCount}
                </span>
              )}
            </button>

            {/* Quick Booking CTA */}
            <button
              id="btn-navbar-quick-book"
              onClick={onQuickBookClick}
              className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-amber-900/15 hover:shadow-amber-900/25 transition-all flex items-center gap-2 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span className="whitespace-nowrap">Booking Meja</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-1.5 border-t border-stone-200/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'profile' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Profil Kuliner
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'menu' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Menu Andalan
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'booking' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Pilih Jadwal Booking</span>
          </button>
          <button
            onClick={() => setActiveTab('ambiance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'ambiance' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Pilihan Area
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'reviews' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Ulasan
          </button>
        </div>
      </div>
    </header>
  );
};
