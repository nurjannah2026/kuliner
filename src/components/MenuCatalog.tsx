import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Star, 
  Flame, 
  MapPin, 
  Plus, 
  Check, 
  Calendar,
  Utensils
} from 'lucide-react';
import { CULINARY_DISHES } from '../data/culinaryData';
import { Dish, PreOrderItem } from '../types';
import { formatRupiah } from '../utils/formatters';

interface MenuCatalogProps {
  onSelectDishDetail: (dish: Dish) => void;
  preOrders: PreOrderItem[];
  onTogglePreOrder: (dish: Dish) => void;
  onGoToBooking: () => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  onSelectDishDetail,
  preOrders,
  onTogglePreOrder,
  onGoToBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyChefSpecial, setOnlyChefSpecial] = useState<boolean>(false);

  const categories = ['Semua', 'Nasi Goreng', 'Nasi Kuning', 'Utama', 'Sup & Kuah', 'Kudapan', 'Minuman', 'Paket Jamuan'];

  const filteredDishes = CULINARY_DISHES.filter((dish) => {
    const matchCategory = selectedCategory === 'Semua' || dish.category === selectedCategory;
    const matchSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpecial = !onlyChefSpecial || dish.isChefSpecial;

    return matchCategory && matchSearch && matchSpecial;
  });

  const isDishInPreOrder = (dishId: string) => {
    return preOrders.some((p) => p.dishId === dishId);
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <Utensils className="w-3.5 h-3.5 text-amber-700" />
            <span>Katalog Kuliner Autentik</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Menu Pilihan & Warisan Bumbu Nusantara
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Semua hidangan dimasak fresh dengan rempah segar asli dan proses tradisional. Anda dapat memilih menu andalan ini untuk di-preorder saat booking jadwal meja agar siap saat Anda tiba.
          </p>
        </div>

        {/* Controls: Search & Filters */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari hidangan, daerah asal (misal: Rendang, Bali)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-stone-900"
            />
          </div>

          {/* Toggle Chef's Special */}
          <button
            onClick={() => setOnlyChefSpecial(!onlyChefSpecial)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
              onlyChefSpecial
                ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hanya Rekomendasi Chef</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pre-order notification banner if items in cart */}
      {preOrders.length > 0 && (
        <div className="bg-amber-900 text-white p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg border border-amber-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 flex items-center justify-center font-bold font-serif-display text-lg text-amber-100">
              {preOrders.reduce((sum, p) => sum + p.quantity, 0)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Pre-Order Meja Aktif</p>
              <p className="text-sm font-medium">
                {preOrders.length} jenis hidangan terpilih untuk reservasi Anda.
              </p>
            </div>
          </div>

          <button
            onClick={onGoToBooking}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Lanjut Pilih Jadwal & Booking Meja</span>
          </button>
        </div>
      )}

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80">
          <Utensils className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif-display text-lg font-bold text-stone-800">Tidak ada sajian yang sesuai</h3>
          <p className="text-stone-500 text-sm mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => {
            const inPreOrder = isDishInPreOrder(dish.id);

            return (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-amber-600/50 hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Dish Photo */}
                <div 
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 cursor-pointer"
                  onClick={() => onSelectDishDetail(dish)}
                >
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                  {/* Badges on top */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-stone-900/80 text-amber-200 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-stone-700/50">
                      <MapPin className="w-3 h-3" />
                      <span>{dish.origin}</span>
                    </span>

                    {dish.isChefSpecial && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-700 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>Khas Chef</span>
                      </span>
                    )}
                  </div>

                  {/* Rating on bottom left */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-xs text-white font-medium drop-shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dish.rating}</span>
                    <span className="text-stone-300 text-[11px]">({dish.reviewsCount})</span>
                  </div>

                  {/* Spicy indicator */}
                  {dish.spicyLevel > 0 && (
                    <div className="absolute bottom-2.5 right-3 flex items-center gap-0.5 bg-stone-900/80 px-2 py-0.5 rounded-full text-xs font-semibold text-orange-400 backdrop-blur-md">
                      <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                      <span className="text-[11px]">
                        {dish.spicyLevel === 1 ? 'Pedas Sedang' : dish.spicyLevel === 2 ? 'Pedas Mantap' : 'Pedas Ekstra'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => onSelectDishDetail(dish)}
                        className="font-serif-display text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer leading-snug line-clamp-1"
                      >
                        {dish.name}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="bg-stone-100 px-2 py-0.5 rounded-md font-medium text-stone-600">
                        {dish.portion}
                      </span>
                      {dish.calories && (
                        <span>• ±{dish.calories} kkal</span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-stone-400 block font-medium">Harga</span>
                      <span className="font-serif-display text-base sm:text-lg font-bold text-stone-900">
                        {formatRupiah(dish.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectDishDetail(dish)}
                        className="px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors font-medium cursor-pointer"
                        title="Lihat Komposisi & Bumbu"
                      >
                        Rincian
                      </button>

                      <button
                        onClick={() => onTogglePreOrder(dish)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                          inPreOrder
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                            : 'bg-amber-800 hover:bg-amber-900 text-white shadow-sm shadow-amber-900/10'
                        }`}
                      >
                        {inPreOrder ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Terpilih</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Pre-Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
