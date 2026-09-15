import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ChevronRight,
  Send,
  Baby,
  Heart,
  Briefcase,
  PartyPopper,
  Wine
} from 'lucide-react';
import { DINING_AREAS, TIME_SLOTS, CULINARY_DISHES } from '../data/culinaryData';
import { DiningArea, TimeSlot, PreOrderItem, Reservation, Dish } from '../types';
import { formatRupiah, formatDateIndo, generateBookingCode } from '../utils/formatters';

interface BookingEngineProps {
  preOrders: PreOrderItem[];
  onUpdatePreOrderQuantity: (dishId: string, delta: number) => void;
  onAddDishToPreOrder: (dish: Dish) => void;
  selectedAreaId: string;
  onSelectAreaId: (id: string) => void;
  onReservationCreated: (reservation: Reservation) => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  preOrders,
  onUpdatePreOrderQuantity,
  onAddDishToPreOrder,
  selectedAreaId,
  onSelectAreaId,
  onReservationCreated,
}) => {
  // Date handling
  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const getRelativeDateStr = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  const [bookingDate, setBookingDate] = useState<string>(getTodayStr());
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'lunch' | 'afternoon' | 'dinner'>('all');
  const [selectedTime, setSelectedTime] = useState<string>('12:30');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [diningOccasion, setDiningOccasion] = useState<Reservation['diningOccasion']>('Santap Santai');
  const [needBabyChair, setNeedBabyChair] = useState<boolean>(false);
  const [needElderFriendly, setNeedElderFriendly] = useState<boolean>(false);

  // Customer contact
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // UI state
  const [activeStep, setActiveStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');

  // Pre-selected area
  const currentArea = DINING_AREAS.find((a) => a.id === selectedAreaId) || DINING_AREAS[0];

  // Make sure guests count conforms to area constraints
  useEffect(() => {
    if (guestCount < currentArea.minGuests) {
      setGuestCount(currentArea.minGuests);
    }
  }, [currentArea]);

  // Calculate pre-order total
  const preOrderTotal = preOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const areaSurcharge = currentArea.extraFeePerTable || 0;
  const estimatedTotal = preOrderTotal + areaSurcharge;

  // Occasions list with icons
  const occasions: { label: Reservation['diningOccasion']; icon: React.ReactNode; desc: string }[] = [
    { label: 'Santap Santai', icon: <Wine className="w-4 h-4 text-amber-700" />, desc: 'Makan santai bersama keluarga / teman' },
    { label: 'Ulang Tahun / Perayaan', icon: <PartyPopper className="w-4 h-4 text-rose-600" />, desc: 'Kami siapkan ucapan & lilin mini' },
    { label: 'Jamuan Bisnis / Rapat', icon: <Briefcase className="w-4 h-4 text-blue-700" />, desc: 'Meja tenang dengan privasi tinggi' },
    { label: 'Romantic Dinner', icon: <Heart className="w-4 h-4 text-rose-500" />, desc: 'Tata letak meja hangat & temaram' },
    { label: 'Arisan / Kumpul Keluarga', icon: <Users className="w-4 h-4 text-emerald-700" />, desc: 'Pengaturan meja gabung panjang' }
  ];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!bookingDate) {
      setValidationError('Silakan pilih tanggal reservasi.');
      setActiveStep(1);
      return;
    }
    if (!selectedTime) {
      setValidationError('Silakan tentukan jam / slot waktu kedatangan.');
      setActiveStep(1);
      return;
    }
    if (!customerName.trim()) {
      setValidationError('Mohon masukkan nama lengkap pemesan.');
      setActiveStep(3);
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setValidationError('Mohon masukkan nomor WhatsApp yang aktif untuk konfirmasi.');
      setActiveStep(3);
      return;
    }

    const newReservation: Reservation = {
      id: `booking-${Date.now()}`,
      bookingCode: generateBookingCode(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || `${customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      date: bookingDate,
      timeSlot: selectedTime,
      guestCount,
      areaId: currentArea.id,
      areaName: currentArea.name,
      diningOccasion,
      specialRequests: [
        specialRequests.trim(),
        needElderFriendly ? 'Meja ramah lansia (tanpa tangga)' : '',
        needBabyChair ? 'Disediakan kursi bayi (baby high-chair)' : ''
      ].filter(Boolean).join('. '),
      needBabyChair,
      preOrders: [...preOrders],
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      totalEstimatedAmount: estimatedTotal
    };

    onReservationCreated(newReservation);
  };

  const filteredSlots = TIME_SLOTS.filter(
    (slot) => selectedPeriod === 'all' || slot.period === selectedPeriod
  );

  return (
    <div className="space-y-8 py-4">
      {/* Title Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>Formulir Pemilihan Jadwal & Meja Online</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Booking Meja & Pengalaman Kuliner Anda
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Pilih tanggal kedatangan, tentukan slot waktu favorit, pilih area ruangan yang Anda kehendaki, dan tambahkan pesanan hidangan agar siap saji begitu Anda tiba.
          </p>
        </div>

        {/* Multi-step progress chips */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { step: 1, label: '1. Jadwal & Waktu' },
            { step: 2, label: '2. Area & Jumlah Tamu' },
            { step: 3, label: '3. Data Tamu & Pre-Order' }
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeStep === s.step
                  ? 'bg-amber-800 text-white shadow-sm'
                  : activeStep > s.step
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{s.label}</span>
              {activeStep > s.step && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />}
            </button>
          ))}
        </div>
      </div>

      {validationError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{validationError}</span>
        </div>
      )}

      {/* Main Booking Engine Grid: Form (Col 8) + Live Summary (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Area */}
        <form onSubmit={handleConfirmReservation} className="lg:col-span-8 space-y-8">
          {/* STEP 1: JADWAL & SLOT WAKTU */}
          {activeStep === 1 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Langkah 1 dari 3</span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                    Pilih Tanggal & Sesi Waktu
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif-display">
                  1
                </div>
              </div>

              {/* Quick Date Shortcuts */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Pilihan Tanggal Cepat
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setBookingDate(getTodayStr())}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      bookingDate === getTodayStr()
                        ? 'border-amber-800 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-stone-200 bg-[#FAF8F5] text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="block text-[11px] font-bold text-amber-800 uppercase">Hari Ini</span>
                    <span className="text-xs font-semibold text-stone-800 block mt-0.5">
                      {formatDateIndo(getTodayStr()).split(',')[0]}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingDate(getRelativeDateStr(1))}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      bookingDate === getRelativeDateStr(1)
                        ? 'border-amber-800 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-stone-200 bg-[#FAF8F5] text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="block text-[11px] font-bold text-stone-500 uppercase">Besok</span>
                    <span className="text-xs font-semibold text-stone-800 block mt-0.5">
                      {formatDateIndo(getRelativeDateStr(1)).split(',')[0]}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingDate(getRelativeDateStr(2))}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      bookingDate === getRelativeDateStr(2)
                        ? 'border-amber-800 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-stone-200 bg-[#FAF8F5] text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="block text-[11px] font-bold text-stone-500 uppercase">Lusa</span>
                    <span className="text-xs font-semibold text-stone-800 block mt-0.5">
                      {formatDateIndo(getRelativeDateStr(2)).split(',')[0]}
                    </span>
                  </button>

                  <div className="relative">
                    <label
                      htmlFor="custom-booking-date"
                      className="block text-[11px] font-bold text-stone-500 uppercase mb-1"
                    >
                      Pilih Bebas
                    </label>
                    <input
                      id="custom-booking-date"
                      type="date"
                      min={getTodayStr()}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 font-medium"
                    />
                  </div>
                </div>

                <div className="mt-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
                  <span>Tanggal terpilih:</span>
                  <span className="font-bold text-stone-900 font-serif-display text-sm">
                    {formatDateIndo(bookingDate)}
                  </span>
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Pilih Jam / Sesi Santap (WIB)
                  </label>

                  {/* Period Filter Tabs */}
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedPeriod('all')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedPeriod === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPeriod('lunch')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedPeriod === 'lunch' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Makan Siang
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPeriod('afternoon')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedPeriod === 'afternoon' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Sore
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPeriod('dinner')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedPeriod === 'dinner' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Makan Malam
                    </button>
                  </div>
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredSlots.map((slot: TimeSlot) => {
                    const isSelected = selectedTime === slot.time;
                    const isFull = slot.status === 'full';

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={isFull}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative ${
                          isFull
                            ? 'opacity-40 bg-stone-100 border-stone-200 cursor-not-allowed'
                            : isSelected
                            ? 'border-amber-800 bg-amber-900 text-white shadow-md'
                            : 'border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-amber-600/50 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 font-bold text-base font-serif-display">
                          <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-stone-400'}`} />
                          <span>{slot.time}</span>
                        </div>

                        <span
                          className={`text-[10px] font-semibold mt-1 block uppercase tracking-wider ${
                            isSelected
                              ? 'text-amber-200'
                              : slot.status === 'limited'
                              ? 'text-amber-700'
                              : 'text-emerald-700'
                          }`}
                        >
                          {slot.status === 'limited' ? `Sisa ${slot.remainingTables} Meja` : 'Tersedia'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-2xl transition-all flex items-center gap-2 text-sm shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Lanjut Pilih Area & Meja</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AREA & JUMLAH TAMU */}
          {activeStep === 2 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Langkah 2 dari 3</span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                    Jumlah Tamu & Pilihan Area Meja
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif-display">
                  2
                </div>
              </div>

              {/* Guest Count Stepper */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="block font-serif-display font-bold text-base text-stone-900">
                    Berapa Jumlah Tamu yang Hadir?
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Mencakup dewasa dan anak-anak.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={guestCount <= currentArea.minGuests}
                    onClick={() => setGuestCount(Math.max(currentArea.minGuests, guestCount - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center text-stone-800 font-bold transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="min-w-16 text-center">
                    <span className="text-2xl font-bold font-serif-display text-stone-900">
                      {guestCount}
                    </span>
                    <span className="text-[11px] text-stone-500 block uppercase tracking-wider font-semibold">
                      Orang
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={guestCount >= currentArea.maxGuests}
                    onClick={() => setGuestCount(Math.min(currentArea.maxGuests, guestCount + 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center text-stone-800 font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Seating Area Selection Cards */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                  Pilih Area Meja / Suasana Ruangan
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DINING_AREAS.map((area: DiningArea) => {
                    const isSelected = selectedAreaId === area.id;

                    return (
                      <div
                        key={area.id}
                        onClick={() => onSelectAreaId(area.id)}
                        className={`rounded-2xl border p-4 transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-800 bg-amber-50/70 ring-2 ring-amber-800/30 shadow-md'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div>
                          <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                            <img
                              src={area.imageUrl}
                              alt={area.name}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-amber-800 text-white p-1 rounded-full shadow-sm">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            )}
                          </div>

                          <h4 className="font-serif-display font-bold text-stone-900 text-base">
                            {area.name}
                          </h4>
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                            {area.tagline}
                          </p>

                          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-stone-600">
                            <Users className="w-3.5 h-3.5 text-stone-400" />
                            <span>Kapasitas: {area.capacity}</span>
                          </div>
                        </div>

                        {area.extraFeePerTable && (
                          <div className="mt-3 pt-2 border-t border-stone-200/60 text-[11px] text-stone-600 flex justify-between">
                            <span>Sewa Privat:</span>
                            <span className="font-bold text-stone-800">{formatRupiah(area.extraFeePerTable)}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dining Occasion & Special Preferences */}
              <div className="pt-4 border-t border-stone-100 space-y-4">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Tujuan / Keperluan Santap
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {occasions.map((occ) => (
                    <button
                      key={occ.label}
                      type="button"
                      onClick={() => setDiningOccasion(occ.label)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        diningOccasion === occ.label
                          ? 'border-amber-800 bg-amber-50 text-amber-950 ring-1 ring-amber-800/30 font-semibold'
                          : 'border-stone-200 bg-[#FAF8F5] text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white border border-stone-200 shrink-0">
                        {occ.icon}
                      </div>
                      <div>
                        <span className="text-xs font-semibold block text-stone-900">{occ.label}</span>
                        <span className="text-[11px] text-stone-500 block">{occ.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Additional checkboxes for comfort */}
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-700">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={needBabyChair}
                      onChange={(e) => setNeedBabyChair(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 accent-amber-800"
                    />
                    <span className="flex items-center gap-1 font-medium">
                      <Baby className="w-3.5 h-3.5 text-amber-700" />
                      Perlu Kursi Bayi (High Chair)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={needElderFriendly}
                      onChange={(e) => setNeedElderFriendly(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 accent-amber-800"
                    />
                    <span className="font-medium">
                      Ramah Lansia (Meja Tanpa Undakan Tangga)
                    </span>
                  </label>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-5 py-2.5 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  Kembali ke Jadwal
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-2xl transition-all flex items-center gap-2 text-sm shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Lanjut ke Data Pemesan</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATA TAMU & PRE-ORDER */}
          {activeStep === 3 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Langkah 3 dari 3</span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
                    Data Kontak & Pre-Order Hidangan
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif-display">
                  3
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nama Lengkap Pemesan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Bambang Wijaya"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp / HP Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-stone-900"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Konfirmasi tiket & pengingat akan dikirimkan ke WhatsApp ini.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Alamat Email (Untuk Pengiriman E-Ticket)
                  </label>
                  <input
                    type="email"
                    placeholder="Contoh: bambang@email.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Catatan Khusus / Permintaan Meja (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Alergi udang, mohon sediakan lilin kecil untuk ultah, minta meja dekat kolam..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-stone-900"
                  />
                </div>
              </div>

              {/* Pre-Order Selection Mini-Catalog */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Pre-Order Hidangan Signature (Opsional)
                    </label>
                    <p className="text-xs text-stone-500">
                      Pesan lebih dulu agar hidangan fresh siap tanpa perlu menunggu lama.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {preOrders.length} Menu Dipilih
                  </span>
                </div>

                {/* Pre-order items list */}
                {preOrders.length > 0 && (
                  <div className="space-y-2 mb-4 bg-amber-50/50 p-3 rounded-2xl border border-amber-200/60">
                    {preOrders.map((item) => (
                      <div
                        key={item.dishId}
                        className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200/80 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.imageUrl}
                            alt={item.dishName}
                            className="w-9 h-9 rounded-lg object-cover"
                          />
                          <div>
                            <span className="font-semibold text-stone-900 block">{item.dishName}</span>
                            <span className="text-stone-500">{formatRupiah(item.price)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdatePreOrderQuantity(item.dishId, -1)}
                            className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-stone-900 min-w-4 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdatePreOrderQuantity(item.dishId, 1)}
                            className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Add Recommendations */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CULINARY_DISHES.slice(0, 3).map((dish) => {
                    const isAdded = preOrders.some((p) => p.dishId === dish.id);

                    return (
                      <div
                        key={dish.id}
                        className="p-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5] flex items-center justify-between gap-2"
                      >
                        <div className="truncate">
                          <span className="block font-semibold text-xs text-stone-900 truncate">
                            {dish.name}
                          </span>
                          <span className="text-[11px] text-stone-500 font-medium">
                            {formatRupiah(dish.price)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onAddDishToPreOrder(dish)}
                          className={`p-1.5 rounded-lg text-xs font-semibold shrink-0 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-amber-800 text-white hover:bg-amber-900'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form submit & back */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  Kembali ke Pilihan Meja
                </button>
                <button
                  type="submit"
                  id="btn-submit-booking-confirm"
                  className="px-8 py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl transition-all flex items-center gap-2 text-sm sm:text-base shadow-lg shadow-amber-950/20 active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Konfirmasi Reservasi Sekarang</span>
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Right Sticky Booking Summary */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider pb-3 border-b border-stone-100">
              <ShoppingBag className="w-4 h-4 text-amber-700" />
              <span>Ringkasan Booking Anda</span>
            </div>

            {/* Details */}
            <div className="divide-y divide-stone-100 text-xs py-2 space-y-3">
              <div className="pt-2 flex justify-between">
                <span className="text-stone-500">Tanggal Santap</span>
                <span className="font-bold text-stone-900 text-right">
                  {formatDateIndo(bookingDate)}
                </span>
              </div>

              <div className="pt-3 flex justify-between">
                <span className="text-stone-500">Jam / Sesi</span>
                <span className="font-bold text-stone-900">{selectedTime} WIB</span>
              </div>

              <div className="pt-3 flex justify-between">
                <span className="text-stone-500">Jumlah Tamu</span>
                <span className="font-bold text-stone-900">{guestCount} Orang</span>
              </div>

              <div className="pt-3 flex justify-between">
                <span className="text-stone-500">Area Meja</span>
                <span className="font-bold text-stone-900 text-right max-w-40 truncate">
                  {currentArea.name}
                </span>
              </div>

              <div className="pt-3 flex justify-between">
                <span className="text-stone-500">Keperluan</span>
                <span className="font-bold text-stone-900">{diningOccasion}</span>
              </div>

              {needBabyChair && (
                <div className="pt-3 flex justify-between text-amber-800 font-medium">
                  <span>Permintaan Khusus:</span>
                  <span>Kursi Bayi (Tersedia)</span>
                </div>
              )}

              {/* Pre-order subtotal */}
              {preOrders.length > 0 && (
                <div className="pt-3 space-y-1.5">
                  <span className="text-stone-500 block font-semibold">Pre-Order ({preOrders.length} hidangan):</span>
                  {preOrders.map((p) => (
                    <div key={p.dishId} className="flex justify-between text-stone-600">
                      <span className="truncate max-w-36">{p.dishName} x{p.quantity}</span>
                      <span className="font-medium">{formatRupiah(p.price * p.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}

              {areaSurcharge > 0 && (
                <div className="pt-3 flex justify-between">
                  <span className="text-stone-500">Biaya Privat VIP:</span>
                  <span className="font-bold text-stone-900">{formatRupiah(areaSurcharge)}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="pt-4 mt-2 border-t border-stone-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Estimasi Total</span>
                <span className="text-[11px] text-stone-400">(Dibayar di resto/saat tiba)</span>
              </div>
              <span className="font-serif-display text-xl font-bold text-stone-900">
                {estimatedTotal > 0 ? formatRupiah(estimatedTotal) : 'Bebas Biaya Booking'}
              </span>
            </div>

            {/* Guarantees */}
            <div className="mt-5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Garansi Meja Tersedia 100%</span>
              </div>
              <p className="text-stone-600 leading-normal">
                Meja Anda di-keep hingga 20 menit dari jam booking. Konfirmasi otomatis dikirimkan via WhatsApp.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
