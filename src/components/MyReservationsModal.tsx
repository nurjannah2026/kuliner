import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Ticket, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { Reservation } from '../types';
import { formatDateIndo, formatRupiah, createWhatsAppBookingUrl } from '../utils/formatters';
import { RESTAURANT_PROFILE, TIME_SLOTS } from '../data/culinaryData';

interface MyReservationsModalProps {
  reservations: Reservation[];
  isOpen: boolean;
  onClose: () => void;
  onViewTicket: (res: Reservation) => void;
  onCancelReservation: (id: string) => void;
  onRescheduleReservation: (id: string, newDate: string, newTime: string) => void;
  onGoToBooking: () => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  reservations,
  isOpen,
  onClose,
  onViewTicket,
  onCancelReservation,
  onRescheduleReservation,
  onGoToBooking,
}) => {
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('12:30');

  if (!isOpen) return null;

  const handleStartReschedule = (res: Reservation) => {
    setReschedulingId(res.id);
    setNewDate(res.date);
    setNewTime(res.timeSlot);
  };

  const handleSaveReschedule = (id: string) => {
    if (!newDate || !newTime) return;
    onRescheduleReservation(id, newDate, newTime);
    setReschedulingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-xl text-stone-900">
                Daftar Reservasi Meja Saya
              </h3>
              <p className="text-xs text-stone-500">
                {reservations.length} reservasi tersimpan di perangkat ini.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h4 className="font-serif-display font-bold text-base text-stone-800">
                Belum Ada Reservasi Aktif
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 mb-5 leading-relaxed">
                Anda belum melakukan booking jadwal meja kuliner. Silakan pilih jadwal favorit Anda sekarang.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onGoToBooking();
                }}
                className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Pilih Jadwal & Booking Meja</span>
              </button>
            </div>
          ) : (
            reservations.map((res) => {
              const isRescheduling = reschedulingId === res.id;
              const isCancelled = res.status === 'cancelled';

              return (
                <div
                  key={res.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCancelled
                      ? 'bg-stone-50 border-stone-200 opacity-60'
                      : 'bg-white border-stone-200/90 shadow-sm hover:border-amber-700/40'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                        #{res.bookingCode}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          isCancelled
                            ? 'bg-stone-200 text-stone-600'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isCancelled ? 'Dibatalkan' : 'Terkonfirmasi'}
                      </span>
                    </div>

                    <span className="text-[11px] text-stone-400">
                      Pemesan: <strong className="text-stone-700">{res.customerName}</strong>
                    </span>
                  </div>

                  {/* Reschedule View or Normal View */}
                  {isRescheduling ? (
                    <div className="py-4 space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60 my-2">
                      <h5 className="font-semibold text-xs text-amber-900">Ubah Tanggal & Jam Santap:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-stone-600 mb-1">Tanggal Baru</label>
                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-stone-600 mb-1">Jam / Sesi Baru</label>
                          <select
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                          >
                            {TIME_SLOTS.map((t) => (
                              <option key={t.id} value={t.time}>
                                {t.time} WIB ({t.period === 'lunch' ? 'Siang' : t.period === 'afternoon' ? 'Sore' : 'Malam'})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setReschedulingId(null)}
                          className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-800"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveReschedule(res.id)}
                          className="px-4 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-semibold shadow-xs"
                        >
                          Simpan Jadwal Baru
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                        <span>{formatDateIndo(res.date)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-stone-700">
                        <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                        <span>{res.timeSlot} WIB</span>
                      </div>

                      <div className="flex items-center gap-2 text-stone-700">
                        <Users className="w-4 h-4 text-amber-800 shrink-0" />
                        <span>{res.guestCount} Tamu ({res.areaName})</span>
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  {!isCancelled && (
                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          onViewTicket(res);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Buka E-Ticket</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartReschedule(res)}
                          className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Ubah Jadwal</span>
                        </button>

                        <button
                          onClick={() => onCancelReservation(res.id)}
                          className="px-3 py-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Batalkan</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
