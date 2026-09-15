import React from 'react';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { RESTAURANT_PROFILE } from '../data/culinaryData';

interface FooterProps {
  onQuickBook: () => void;
  onSelectMenu: () => void;
  onSelectProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onQuickBook,
  onSelectMenu,
  onSelectProfile,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 text-amber-100 flex items-center justify-center border border-amber-600/40">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif-display font-bold text-xl text-white">
                Selera Nusantara
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Warisan kuliner rempah pusaka dari dapur tradisi Indonesia. Menghadirkan jamuan autentik dengan kenyamanan pemesanan jadwal meja online.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sertifikasi Halal MUI 100%</span>
            </div>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="font-serif-display font-bold text-white text-base mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Jam Operasional</span>
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              {RESTAURANT_PROFILE.openingHours.map((item, idx) => (
                <div key={idx} className="flex justify-between pb-1.5 border-b border-stone-900">
                  <span className="text-stone-300">{item.days}</span>
                  <span className="font-medium text-amber-200">{item.hours}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 mt-3">
              *Reservasi meja dianjurkan 2–3 jam sebelum kedatangan.
            </p>
          </div>

          {/* Lokasi & Alamat */}
          <div>
            <h4 className="font-serif-display font-bold text-white text-base mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Lokasi Restoran</span>
            </h4>
            <address className="not-italic text-xs text-stone-400 space-y-1 leading-relaxed">
              <p className="font-medium text-stone-200">{RESTAURANT_PROFILE.name}</p>
              <p>{RESTAURANT_PROFILE.address}</p>
              <p>{RESTAURANT_PROFILE.district}, {RESTAURANT_PROFILE.city} {RESTAURANT_PROFILE.postalCode}</p>
            </address>

            <div className="mt-4 pt-3 border-t border-stone-900 flex items-center gap-2 text-xs">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-medium transition-colors"
              >
                <span>Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Kontak & Reservasi Cepat */}
          <div className="space-y-4">
            <h4 className="font-serif-display font-bold text-white text-base mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Hubungi Kami</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p>Telepon: <span className="text-stone-200">{RESTAURANT_PROFILE.phone}</span></p>
              <p>WhatsApp: <span className="text-stone-200">{RESTAURANT_PROFILE.whatsapp}</span></p>
            </div>

            <button
              onClick={onQuickBook}
              className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Booking Meja Sekarang</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {RESTAURANT_PROFILE.name}. Semua hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <button onClick={onSelectProfile} className="hover:text-stone-300 transition-colors">Profil Kuliner</button>
            <button onClick={onSelectMenu} className="hover:text-stone-300 transition-colors">Katalog Menu</button>
            <button onClick={onQuickBook} className="hover:text-stone-300 transition-colors">Jadwal Reservasi</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
