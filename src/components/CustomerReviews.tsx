import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, ThumbsUp, Send } from 'lucide-react';
import { CUSTOMER_REVIEWS, RESTAURANT_PROFILE } from '../data/culinaryData';
import { CustomerReview } from '../types';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newDishFav, setNewDishFav] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newAuthor.trim(),
      date: 'Baru saja',
      rating: newRating,
      dishFav: newDishFav.trim() || 'Rendang Tok & Hidangan Rempah',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      comment: newComment.trim(),
      visitedDate: 'September 2026'
    };

    setReviews([newRev, ...reviews]);
    setNewAuthor('');
    setNewDishFav('');
    setNewComment('');
    setShowAddForm(false);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <div className="space-y-10 py-4">
      {/* Reviews Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left md:border-r md:border-stone-100 md:pr-8">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Pengalaman Tamu
            </span>
            <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
              <span className="font-serif-display text-5xl font-bold text-stone-900">
                {RESTAURANT_PROFILE.rating}
              </span>
              <div>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-stone-500 font-medium block mt-0.5">
                  Berdasarkan {RESTAURANT_PROFILE.totalReviews}+ Ulasan Terverifikasi
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-500 mt-4 leading-relaxed">
              98% tamu menyatakan puas dengan kelezatan rempah, kebersihan area meja, dan ketepatan reservasi tanpa antre.
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 w-full max-w-sm">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>Cita Rasa Rempah</span>
                <span className="font-bold text-stone-900">4.9 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div className="bg-amber-700 h-2 rounded-full w-[98%]" />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                <span>Kebersihan & Suasana</span>
                <span className="font-bold text-stone-900">4.9 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div className="bg-amber-700 h-2 rounded-full w-[97%]" />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                <span>Kemudahan Booking Online</span>
                <span className="font-bold text-stone-900">5.0 / 5.0</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2">
                <div className="bg-emerald-700 h-2 rounded-full w-[100%]" />
              </div>
            </div>

            <div>
              <button
                id="btn-toggle-add-review"
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                {showAddForm ? 'Batal Tulis Ulasan' : 'Bagikan Pengalaman Anda'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {submittedMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Terima kasih! Ulasan Anda telah berhasil diterbitkan.</span>
        </div>
      )}

      {/* Add Review Form Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleAddReview}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-4"
        >
          <h3 className="font-serif-display font-bold text-lg text-stone-900">
            Tulis Ulasan & Kesan Kuliner Anda
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nama Lengkap Anda *
              </label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Contoh: Rian & Rekan Kerja"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Hidangan Favorit Anda
              </label>
              <input
                type="text"
                value={newDishFav}
                onChange={(e) => setNewDishFav(e.target.value)}
                placeholder="Contoh: Rendang Tok & Bebek Betutu"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Beri Bintang Penilaian
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setNewRating(num)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      num <= newRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-stone-500 font-semibold ml-2">
                {newRating} Bintang
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Ulasan & Cerita Kunjungan Anda *
            </label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ceritakan cita rasa hidangan, kenyamanan meja, dan kemudahan booking online..."
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-stone-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirimkan Ulasan</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">{rev.name}</h4>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="relative pl-6 mb-3">
                <MessageSquareQuote className="w-4 h-4 text-amber-600/40 absolute left-0 top-0" />
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
              <span className="text-stone-500">
                Menu Favorit: <strong className="text-stone-800">{rev.dishFav}</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Tamu Terverifikasi</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
