import React from 'react';
import { 
  Award, 
  Sparkles, 
  ChefHat, 
  Flame, 
  Leaf, 
  CheckCircle2, 
  ArrowRight,
  Wind,
  Trees,
  DoorClosed,
  Compass,
  Car,
  Baby,
  Star,
  Quote
} from 'lucide-react';
import { RESTAURANT_PROFILE } from '../data/culinaryData';

interface CulinaryProfileProps {
  onStartBooking: () => void;
  onExploreMenu: () => void;
}

export const CulinaryProfile: React.FC<CulinaryProfileProps> = ({
  onStartBooking,
  onExploreMenu
}) => {
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return <Wind className="w-5 h-5 text-amber-700" />;
      case 'Trees': return <Trees className="w-5 h-5 text-amber-700" />;
      case 'DoorClosed': return <DoorClosed className="w-5 h-5 text-amber-700" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-700" />;
      case 'Car': return <Car className="w-5 h-5 text-amber-700" />;
      case 'Baby': return <Baby className="w-5 h-5 text-amber-700" />;
      default: return <Sparkles className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-stone-900 text-white shadow-2xl border border-stone-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
            alt={`Suasana ${RESTAURANT_PROFILE.name}`}
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-16 sm:px-12 sm:py-24 lg:py-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kuliner Rempah Warisan Sejak {RESTAURANT_PROFILE.establishedYear}</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-50 leading-[1.15] mb-6">
            Kenikmatan Gastronomi <br />
            <span className="italic font-normal text-amber-200">Rempah Pusaka Nusantara</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed mb-8 font-light">
            {RESTAURANT_PROFILE.shortBio}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              id="btn-hero-booking"
              onClick={onStartBooking}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-2xl shadow-lg shadow-amber-900/30 transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              <span>Pilih Jadwal & Booking Meja</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-menu"
              onClick={onExploreMenu}
              className="px-6 py-3.5 bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium rounded-2xl border border-stone-700/70 transition-all backdrop-blur-sm cursor-pointer text-sm sm:text-base hover:text-white"
            >
              Lihat Menu & Sajian Khusus
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xl sm:text-2xl font-serif-display">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{RESTAURANT_PROFILE.rating}</span>
              </div>
              <p className="text-xs text-stone-400 mt-1">1.400+ Ulasan Tamu</p>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif-display text-stone-100">
                100%
              </div>
              <p className="text-xs text-stone-400 mt-1">Sertifikasi Halal MUI</p>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif-display text-stone-100">
                16+
              </div>
              <p className="text-xs text-stone-400 mt-1">Rempah Asli Pilihan</p>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif-display text-stone-100">
                0 Menit
              </div>
              <p className="text-xs text-stone-400 mt-1">Antre dengan Booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Kisah Kuliner (Story & Philosophy) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/80 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Leaf className="w-3.5 h-3.5 text-amber-700" />
              <span>Filosofi & Kisah Dapur</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-snug">
              {RESTAURANT_PROFILE.storyTitle}
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              {RESTAURANT_PROFILE.storyDescription.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* 3 Kitchen Core Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-100">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2.5">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-stone-900 text-sm">Slow Cooking</h4>
                <p className="text-xs text-stone-500 mt-1">Masak perlahan dengan kayu arang agar bumbu meresap sejati.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-stone-900 text-sm">Rempah Petani Asli</h4>
                <p className="text-xs text-stone-500 mt-1">Biji pala Banda, cengkeh Maluku, & kunyit dari petani mitra lokal.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-stone-900 text-sm">Tanpa Pengawet</h4>
                <p className="text-xs text-stone-500 mt-1">100% cita rasa gurih alami dari kelapa tua dan kaldu segar.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/5 border border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Dapur Tradisional Selera Nusantara"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">Tradisi Dapur</p>
                <p className="font-serif-display text-lg font-bold">Gerabah Tanah Liat & Bara Api Alami</p>
                <p className="text-xs text-stone-300 mt-0.5">Mempertahankan aroma khas tanah dan asap harum rempah.</p>
              </div>
            </div>

            {/* Floating culinary badge */}
            <div className="absolute -top-4 -right-4 bg-amber-800 text-white p-4 rounded-2xl shadow-xl border border-amber-700/50 hidden sm:flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-300" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-amber-200 font-medium">Penghargaan</p>
                <p className="font-bold text-xs text-white leading-tight">Best Heritage Dining 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Chef & Keahlian */}
      <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 border border-stone-700 shadow-2xl">
              <img
                src={RESTAURANT_PROFILE.chefImageUrl}
                alt={RESTAURANT_PROFILE.chefName}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-700/80 text-amber-100 text-xs font-semibold mb-1.5">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Dapur Utama</span>
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-white">{RESTAURANT_PROFILE.chefName}</h3>
                <p className="text-xs text-stone-300">{RESTAURANT_PROFILE.chefTitle}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Profil Penggagas Rasa</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
              Dedikasi 18 Tahun Menghidupkan Resep Leluhur
            </h2>

            {/* Chef Quote Card */}
            <div className="relative p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80">
              <Quote className="w-8 h-8 text-amber-400/40 mb-2" />
              <p className="font-serif-display italic text-base sm:text-lg text-amber-100 leading-relaxed">
                {RESTAURANT_PROFILE.chefQuote}
              </p>
              <p className="text-xs text-stone-400 mt-3 font-sans font-medium">
                — {RESTAURANT_PROFILE.chefName}, Executive Chef
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              Chef Aryo telah menjelajahi lebih dari 40 desa adat di Sumatera, Jawa, Bali, dan Sulawesi untuk mendokumentasikan takaran bumbu kuno yang belum pernah tertulis di buku modern. Di Selera Nusantara, setiap hidangan disiapkan dengan ketelitian artisan demi menjaga keaslian rasa dan nutrisi alaminya.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-800/50 border border-stone-700/60">
                <span className="block text-xl font-bold font-serif-display text-amber-300">18+ Tahun</span>
                <span className="text-xs text-stone-400">Pengalaman Kuliner Tradisional</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-800/50 border border-stone-700/60">
                <span className="block text-xl font-bold font-serif-display text-amber-300">40+ Desa Adat</span>
                <span className="text-xs text-stone-400">Riset Eksplorasi Bumbu Pusaka</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sertifikasi & Kebersihan Resmi */}
      <section className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Jaminan Kualitas & Kepercayaan
          </span>
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 mt-3">
            Standar Kebersihan, Kehalalan, dan Pelayanan Resmi
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {RESTAURANT_PROFILE.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-3">
                  {cert.badge}
                </div>
                <h4 className="font-serif-display font-bold text-stone-900 text-base">{cert.title}</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{cert.issuer}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Terverifikasi & Aktif</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fasilitas Lengkap Restoran */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
              Kenyamanan Maksimal
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              Fasilitas Lengkap untuk Kenyamanan Tamu
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm">
            Dirancang agar setiap momen santap bersama keluarga, kolega bisnis, maupun jamuan santai berlangsung sempurna.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESTAURANT_PROFILE.facilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-600/40 hover:bg-amber-50/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {getFacilityIcon(fac.icon)}
              </div>
              <h4 className="font-semibold text-stone-900 text-sm sm:text-base">{fac.name}</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Call-to-action Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-700/40">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-amber-300 font-semibold text-xs tracking-wider uppercase">
            Jadwalkan Kunjungan Anda Hari Ini
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
            Ingin Meja Khusus Tanpa Khawatir Kehabisan Tempat?
          </h3>
          <p className="text-stone-300 text-sm max-w-xl">
            Pilih tanggal dan sesi jam yang pas dengan jadwal Anda. Konfirmasi instan, tanpa antre, dan dapat langsung memilih hidangan favorit.
          </p>
        </div>

        <button
          id="btn-profile-cta-booking"
          onClick={onStartBooking}
          className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-2xl shadow-lg shadow-amber-950/40 transition-all shrink-0 active:scale-95 cursor-pointer text-sm sm:text-base flex items-center gap-2"
        >
          <span>Pilih Jadwal Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
