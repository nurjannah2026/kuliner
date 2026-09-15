export interface Dish {
  id: string;
  name: string;
  category: 'Nasi Goreng' | 'Nasi Kuning' | 'Utama' | 'Sup & Kuah' | 'Kudapan' | 'Minuman' | 'Paket Jamuan';
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  spicyLevel: number; // 0 to 3
  isChefSpecial?: boolean;
  portion: string;
  origin: string; // e.g. 'Minangkabau', 'Yogyakarta', 'Bali'
  keyIngredients: string[];
  allergens?: string[];
  calories?: number;
}

export interface DiningArea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  minGuests: number;
  maxGuests: number;
  imageUrl: string;
  features: string[];
  extraFeePerTable?: number;
  recommendedFor: string;
}

export type TimePeriod = 'lunch' | 'afternoon' | 'dinner';

export interface TimeSlot {
  id: string;
  time: string;
  period: TimePeriod;
  status: 'available' | 'limited' | 'full';
  remainingTables: number;
}

export interface PreOrderItem {
  dishId: string;
  dishName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Reservation {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "12:30"
  guestCount: number;
  areaId: string;
  areaName: string;
  diningOccasion: 'Santap Santai' | 'Ulang Tahun / Perayaan' | 'Jamuan Bisnis / Rapat' | 'Romantic Dinner' | 'Arisan / Kumpul Keluarga';
  specialRequests: string;
  needBabyChair: boolean;
  preOrders: PreOrderItem[];
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  totalEstimatedAmount: number;
}

export interface RestaurantProfile {
  name: string;
  tagline: string;
  shortBio: string;
  storyTitle: string;
  storyDescription: string[];
  chefName: string;
  chefTitle: string;
  chefQuote: string;
  chefImageUrl: string;
  establishedYear: number;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
  rating: number;
  totalReviews: number;
  certifications: {
    title: string;
    issuer: string;
    badge: string;
  }[];
  facilities: {
    name: string;
    icon: string;
    desc: string;
  }[];
}

export interface CustomerReview {
  id: string;
  name: string;
  date: string;
  rating: number;
  dishFav: string;
  avatarUrl: string;
  comment: string;
  visitedDate: string;
}
