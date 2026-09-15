import { Reservation } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateIndo(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function generateBookingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const date = new Date();
  const dateCode = `${date.getFullYear().toString().slice(-2)}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  return `SN-${dateCode}-${randomStr}`;
}

export function createWhatsAppBookingUrl(booking: Reservation, whatsappNumber: string): string {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const preOrderList = booking.preOrders.length > 0
    ? booking.preOrders.map(p => `   • ${p.dishName} x${p.quantity} (${formatRupiah(p.price * p.quantity)})`).join('\n')
    : '   - Tidak ada pre-order (Pesan di tempat)';

  const text = `*KONFIRMASI RESERVASI MEJA - SELERA NUSANTARA*
------------------------------------------------
Kode Booking: *#${booking.bookingCode}*
Nama Pemesan: ${booking.customerName}
No. Kontak: ${booking.customerPhone}
Tanggal: *${formatDateIndo(booking.date)}*
Jam / Sesi: *${booking.timeSlot} WIB*
Jumlah Tamu: *${booking.guestCount} Orang*
Pilihan Area: *${booking.areaName}*
Keperluan: ${booking.diningOccasion}
Kursi Bayi: ${booking.needBabyChair ? 'Ya, Mohon disediakan' : 'Tidak'}

*Catatan Khusus:*
${booking.specialRequests ? `"${booking.specialRequests}"` : '-'}

*Pesanan Menu Awal:*
${preOrderList}
${booking.totalEstimatedAmount > 0 ? `Estimasi Total: *${formatRupiah(booking.totalEstimatedAmount)}*` : ''}

Mohon konfirmasi kesiapan meja kami. Terima kasih banyak!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
