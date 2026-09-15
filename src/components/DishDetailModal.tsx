import React from 'react';
import { X, Star, Flame, Sparkles, MapPin, Users, Plus, Check } from 'lucide-react';
import { Dish } from '../types';
import { formatRupiah } from '../utils/formatters';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToPreOrder?: (dish: Dish) => void;
  isInPreOrder?: boolean;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToPreOrder,
  isInPreOrder = false,
}) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-900 shrink-0">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/70 text-stone-200 hover:text-white hover:bg-stone-900 flex items-center justify-center backdrop-blur-md transition-colors border border-stone-700/50"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-700/90 text-amber-100 text-xs font-semibold backdrop-blur-sm mb-1.5">
                <MapPin className="w-3 h-3" />
                <span>Asal Resep: {dish.origin}</span>
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-white drop-shadow-sm">
                {dish.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-300 block font-medium">Harga Sajian</span>
              <span className="text-xl font-bold text-amber-300 font-serif-display">
                {formatRupiah(dish.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pb-2 border-b border-stone-100">
            <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg font-semibold border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{dish.rating} ({dish.reviewsCount} ulasan)</span>
            </div>

            <div className="flex items-center gap-1 text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
              <Users className="w-3.5 h-3.5 text-stone-500" />
              <span>{dish.portion}</span>
            </div>

            {/* Spicy Indicator */}
            <div className="flex items-center gap-1 bg-orange-50 text-orange-800 px-2.5 py-1 rounded-lg border border-orange-200">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>
                {dish.spicyLevel === 0 ? 'Tidak Pedas' : dish.spicyLevel === 1 ? 'Pedas Sedang' : dish.spicyLevel === 2 ? 'Pedas Khas' : 'Ekstra Pedas'}
              </span>
            </div>

            {dish.isChefSpecial && (
              <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg font-bold border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Rekomendasi Chef</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Cerita & Cita Rasa Hidangan
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Key Ingredients */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              Rempah & Bahan Utama Alami
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dish.keyIngredients.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 bg-stone-100 text-stone-700 rounded-full border border-stone-200 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens & Dietary Notes */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-600 flex items-start gap-2">
              <span className="font-semibold text-stone-800 shrink-0">Catatan Alergen:</span>
              <span>{dish.allergens.join(', ')}. Harap cantumkan pada formulir booking jika Anda memiliki alergi khusus.</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-stone-200/80 bg-[#FAF8F5] flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Total</span>
            <span className="text-lg font-bold text-stone-900 font-serif-display">
              {formatRupiah(dish.price)}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-stone-600 hover:text-stone-800 text-sm font-medium transition-colors"
            >
              Tutup
            </button>

            {onAddToPreOrder && (
              <button
                onClick={() => {
                  onAddToPreOrder(dish);
                  onClose();
                }}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-sm ${
                  isInPreOrder
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    : 'bg-amber-800 hover:bg-amber-900 text-white'
                }`}
              >
                {isInPreOrder ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Sudah di Pre-Order</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Pre-Order untuk Booking</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
