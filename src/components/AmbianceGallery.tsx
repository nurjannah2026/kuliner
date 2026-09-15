import React from 'react';
import { Users, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { DINING_AREAS } from '../data/culinaryData';
import { DiningArea } from '../types';
import { formatRupiah } from '../utils/formatters';

interface AmbianceGalleryProps {
  onSelectAreaForBooking: (areaId: string) => void;
}

export const AmbianceGallery: React.FC<AmbianceGalleryProps> = ({
  onSelectAreaForBooking
}) => {
  return (
    <div className="space-y-12 py-4">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Kenyamanan Ruang & Suasana</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Pilihan Area Tempat Duduk & Meja Jamuan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Setiap sudut Selera Nusantara dirancang dengan perpaduan arsitektur kayu pusaka, pencahayaan hangat, dan sirkulasi udara optimal. Pilih area yang paling sesuai dengan momen Anda.
          </p>
        </div>
      </div>

      {/* Areas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {DINING_AREAS.map((area: DiningArea) => (
          <div
            key={area.id}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Photo */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                <img
                  src={area.imageUrl}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1 block">
                    {area.tagline}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-white leading-tight">
                    {area.name}
                  </h3>
                </div>

                <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-stone-200 border border-stone-700/50 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kapasitas: {area.capacity}</span>
                </div>
              </div>

              {/* Description & Features */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-stone-600 leading-relaxed">
                  {area.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                    Sangat Dianjurkan Untuk:
                  </span>
                  <p className="text-xs text-amber-950 font-medium">
                    {area.recommendedFor}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Fasilitas Area:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {area.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {area.extraFeePerTable && (
                  <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span>Biaya Minimum/Sewa Ruang Privat:</span>
                    <span className="font-bold text-stone-800 font-serif-display text-sm">
                      {formatRupiah(area.extraFeePerTable)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0">
              <button
                id={`btn-select-area-${area.id}`}
                onClick={() => onSelectAreaForBooking(area.id)}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-amber-800 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm active:scale-98 cursor-pointer"
              >
                <span>Pilih Jadwal di {area.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
