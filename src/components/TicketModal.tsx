import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Share2, 
  Printer, 
  UtensilsCrossed,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Reservation } from '../types';
import { formatDateIndo, formatRupiah, createWhatsAppBookingUrl } from '../utils/formatters';
import { RESTAURANT_PROFILE } from '../data/culinaryData';

interface TicketModalProps {
  reservation: Reservation | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ reservation, onClose }) => {
  if (!reservation) return null;

  const whatsappUrl = createWhatsAppBookingUrl(reservation, RESTAURANT_PROFILE.whatsapp);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-amber-800 to-stone-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-900/50 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
              Reservasi Berhasil Dikonfirmasi
            </span>
          </div>

          <h3 className="font-serif-display text-2xl font-bold text-white">
            E-Ticket Meja Kuliner
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {RESTAURANT_PROFILE.name} — Heritage Dining
          </p>

          <div className="mt-4 pt-3 border-t border-amber-700/50 flex items-center justify-between">
            <span className="text-[11px] text-stone-300 uppercase tracking-widest font-medium">
              Kode Booking
            </span>
            <span className="font-mono font-bold text-amber-300 text-sm tracking-wider bg-black/30 px-2.5 py-1 rounded-md">
              {reservation.bookingCode}
            </span>
          </div>
        </div>

        {/* Ticket Details Body with Scroll */}
        <div className="p-6 overflow-y-auto space-y-5 bg-[#FAF8F5]">
          {/* Main Info Box */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                  Hari & Tanggal
                </span>
                <span className="font-serif-display font-bold text-stone-900 text-base">
                  {formatDateIndo(reservation.date)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                    Jam Santap
                  </span>
                  <span className="font-bold text-stone-900 text-sm">
                    {reservation.timeSlot} WIB
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                    Tamu
                  </span>
                  <span className="font-bold text-stone-900 text-sm">
                    {reservation.guestCount} Orang
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-stone-100">
              <MapPin className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-semibold">
                  Area Meja
                </span>
                <span className="font-bold text-stone-900 text-sm">
                  {reservation.areaName}
                </span>
              </div>
            </div>
          </div>

          {/* Guest Data */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Nama Pemesan:</span>
              <span className="font-bold text-stone-900">{reservation.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">No. WhatsApp:</span>
              <span className="font-bold text-stone-900">{reservation.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tujuan Santap:</span>
              <span className="font-bold text-stone-900">{reservation.diningOccasion}</span>
            </div>
            {reservation.specialRequests && (
              <div className="pt-2 border-t border-stone-100 text-stone-600 italic">
                "{reservation.specialRequests}"
              </div>
            )}
          </div>

          {/* Pre-Orders List */}
          {reservation.preOrders.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
              <span className="font-bold text-stone-800 uppercase tracking-wider block text-[11px] pb-1 border-b border-stone-100">
                Hidangan Pre-Order ({reservation.preOrders.length})
              </span>
              {reservation.preOrders.map((p) => (
                <div key={p.dishId} className="flex justify-between text-stone-700">
                  <span>{p.dishName} x{p.quantity}</span>
                  <span className="font-semibold">{formatRupiah(p.price * p.quantity)}</span>
                </div>
              ))}
              {reservation.totalEstimatedAmount > 0 && (
                <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900">
                  <span>Estimasi Total:</span>
                  <span className="font-serif-display text-sm">{formatRupiah(reservation.totalEstimatedAmount)}</span>
                </div>
              )}
            </div>
          )}

          {/* Simulated QR Code */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 text-center flex flex-col items-center">
            {/* SVG barcode-like representation */}
            <div className="p-2 bg-stone-900 rounded-xl mb-2 text-white">
              <UtensilsCrossed className="w-8 h-8 text-amber-300 mx-auto" />
            </div>
            <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
              Scan untuk Check-in di Meja Resepsionis
            </span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-5 bg-white border-t border-stone-200 space-y-2.5">
          <a
            id="btn-whatsapp-booking-confirm"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm active:scale-98"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim Konfirmasi ke WhatsApp Resto</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Tiket</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Selesai & Tutup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
