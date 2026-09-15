import { RestaurantProfile, Dish, DiningArea, CustomerReview, TimeSlot } from '../types';

export const RESTAURANT_PROFILE: RestaurantProfile = {
  name: 'Selera Nusantara',
  tagline: 'Warisan Cita Rasa Rempah Pusaka & Pengalaman Gastronomi Tradisional',
  shortBio: 'Restoran kuliner autentik Indonesia yang memadukan kehangatan resep warisan leluhur, rempah segar pilihan dari petani lokal nusantara, dan suasana jamuan bersahaja.',
  storyTitle: 'Perjalanan Menjaga Ruh Rasa Nusantara',
  storyDescription: [
    'Berdiri sejak 2012, Selera Nusantara berawal dari kecintaan mendalam terhadap kekayaan bumbu dapur Nusantara yang begitu beragam dari Sabang sampai Merauke. Kami percaya bahwa setiap racikan rempah membawa jejak kebudayaan, kehangatan keluarga, dan filosofi hidup para tetua.',
    'Dapur kami dipimpin langsung oleh Chef Aryo Dananjaya yang mendedikasikan lebih dari 18 tahun untuk meneliti teknik memasak tradisional lambat (slow cooking) dengan kayu arang, gerabah tanah liat, dan rempah segar tanpa pengawet atau penyedap sintetis.',
    'Setiap hidangan yang tersaji di meja Anda adalah perayaan rasa—dari Rendang Tok Kayu Bakar yang dimasak 8 jam, Bebek Betutu Gianyar yang harum dedaunan rempah, hingga Kesegaran Es Pisang Ijo Daun Suji.'
  ],
  chefName: 'Chef Aryo Dananjaya',
  chefTitle: 'Executive Chef & Heritage Food Researcher',
  chefQuote: '"Masakan Indonesia bukan sekadar rasa asin, manis, atau pedas; ia adalah harmoni puluhan rempah yang bernyanyi bersama dalam api yang sabar."',
  chefImageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
  establishedYear: 2012,
  address: 'Jl. Senopati No. 48, Kebayoran Baru',
  district: 'Jakarta Selatan',
  city: 'DKI Jakarta',
  postalCode: '12190',
  phone: '+62 21 7208 9912',
  whatsapp: '+62 812 8900 7721',
  openingHours: [
    { days: 'Senin - Kamis', hours: '11.00 - 21.30 WIB' },
    { days: 'Jumat - Sabtu', hours: '10.30 - 22.30 WIB' },
    { days: 'Minggu & Hari Libur', hours: '10.00 - 22.00 WIB' }
  ],
  rating: 4.9,
  totalReviews: 1420,
  certifications: [
    { title: 'Sertifikat Halal MUI', issuer: 'LPPOM MUI No. 00160098721122', badge: '100% Halal' },
    { title: 'Hygiene & Sanitasi Grade A', issuer: 'Dinas Kesehatan Prov. DKI Jakarta', badge: 'Grade A' },
    { title: 'Best Indonesian Heritage Dining 2024', issuer: 'Culinary Awards Indonesia', badge: 'Award Winner' }
  ],
  facilities: [
    { name: 'Ruang Pendopo Ber-AC', icon: 'Wind', desc: 'Sejuk, nyaman, diiringi alunan gending gamelan kontemporer halus.' },
    { name: 'Area Taman Asri', icon: 'Trees', desc: 'Suasana terbuka alami dengan gemericik air dan tanaman tropis.' },
    { name: 'Bale Kencana VIP Room', icon: 'DoorClosed', desc: 'Ruang privat eksklusif lengkap dengan proyektor & smart TV untuk acara/meeting.' },
    { name: 'Musholla Nyaman & Bersih', icon: 'Compass', desc: 'Fasilitas ibadah lengkap terpisah pria & wanita ber-AC.' },
    { name: 'Parkir Luas & Valet Gratis', icon: 'Car', desc: 'Kapasitas parkir hingga 40 mobil dengan layanan valet aman.' },
    { name: 'Ramah Keluarga & Bayi', icon: 'Baby', desc: 'Tersedia kursi bayi (high chair) dan area ramah lansia tanpa undakan.' }
  ]
};

export const DINING_AREAS: DiningArea[] = [
  {
    id: 'pendopo-utama',
    name: 'Pendopo Utama (Indoor AC)',
    tagline: 'Nuansa Kayu Jati Hangat & Kesejukan Maksimal',
    description: 'Area makan utama dengan arsitektur joglo kontemporer, meja kayu jati solid, pencahayaan temaram hangat, dan pendingin ruangan penuh.',
    capacity: '2 - 12 Orang / Meja',
    minGuests: 1,
    maxGuests: 12,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    features: ['Full AC', 'Dekat Bar Jamu & Minuman', 'Live Musik Akustik (Weekend)', 'Baby Chair Tersedia'],
    recommendedFor: 'Makan santai bersama pasangan atau keluarga inti'
  },
  {
    id: 'taman-asri',
    name: 'Taman Pelataran Asri (Semi-Outdoor)',
    tagline: 'Suasana Tropis Teduh & Udara Terbuka',
    description: 'Dikelilingi tanaman palem, pakis, dan kolam koi dengan kanopi pelindung cuaca. Sangat sejuk di sore dan malam hari.',
    capacity: '2 - 8 Orang / Meja',
    minGuests: 1,
    maxGuests: 8,
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    features: ['Sirkulasi Udara Segar', 'Smoking Allowed Terbatas', 'Pemandangan Kolam Koi', 'Lampu Gantung Estetik'],
    recommendedFor: 'Kumpul sore santai, sahabat, dan pecinta suasana alam'
  },
  {
    id: 'bale-kencana-vip',
    name: 'Bale Kencana (VIP Private Room)',
    tagline: 'Eksklusif, Tenang, & Privasi Penuh',
    description: 'Ruang makan privat dengan pintu kedap suara, pelayan pribadi (dedicated butler), layar presentasi 65 inci, dan rest room khusus.',
    capacity: '6 - 20 Orang',
    minGuests: 6,
    maxGuests: 20,
    extraFeePerTable: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    features: ['100% Private', 'Smart TV & Sound System', 'Dedicated Butler', 'Pengaturan Meja Rapat/Ulang Tahun'],
    recommendedFor: 'Meeting bisnis penting, jamuan arisan, ulang tahun eksklusif'
  },
  {
    id: 'chefs-table',
    name: "Chef's Table Gastronomy",
    tagline: 'Interaksi Langsung & Cerita Dapur Nusantara',
    description: 'Meja bar marmer menghadap dapur terbuka kaca (open kitchen). Nikmati sajian eksklusif dengan penjelasan langsung dari Chef Aryo.',
    capacity: '2 - 6 Orang',
    minGuests: 2,
    maxGuests: 6,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    features: ['Pemandangan Open Kitchen', 'Disajikan Langsung oleh Chef', 'Penjelasan Filosofi Setiap Piring', 'Complimentary Welcome Mocktail'],
    recommendedFor: 'Food enthusiast, kencan spesial, dan penikmat seni kuliner'
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  // Lunch
  { id: 'l1', time: '11:30', period: 'lunch', status: 'available', remainingTables: 5 },
  { id: 'l2', time: '12:00', period: 'lunch', status: 'limited', remainingTables: 2 },
  { id: 'l3', time: '12:30', period: 'lunch', status: 'limited', remainingTables: 1 },
  { id: 'l4', time: '13:00', period: 'lunch', status: 'available', remainingTables: 4 },
  { id: 'l5', time: '13:30', period: 'lunch', status: 'available', remainingTables: 6 },
  
  // Afternoon
  { id: 'a1', time: '15:00', period: 'afternoon', status: 'available', remainingTables: 8 },
  { id: 'a2', time: '16:00', period: 'afternoon', status: 'available', remainingTables: 7 },
  { id: 'a3', time: '17:00', period: 'afternoon', status: 'available', remainingTables: 5 },
  
  // Dinner
  { id: 'd1', time: '18:00', period: 'dinner', status: 'available', remainingTables: 4 },
  { id: 'd2', time: '18:30', period: 'dinner', status: 'limited', remainingTables: 2 },
  { id: 'd3', time: '19:00', period: 'dinner', status: 'limited', remainingTables: 1 },
  { id: 'd4', time: '19:30', period: 'dinner', status: 'available', remainingTables: 3 },
  { id: 'd5', time: '20:00', period: 'dinner', status: 'available', remainingTables: 5 },
  { id: 'd6', time: '20:30', period: 'dinner', status: 'available', remainingTables: 6 }
];

export const CULINARY_DISHES: Dish[] = [
  {
    id: 'dish-1',
    name: 'Rendang Daging Tok Kayu Bakar',
    category: 'Utama',
    description: 'Daging sapi has dalam pilihan dimasak perlahan 8 jam di atas kayu rambutan dengan 16 rempah Minang dan santan kelapa tua murni hingga gurih meresap sampai ke serat terdalam.',
    price: 98000,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 380,
    spicyLevel: 1,
    isChefSpecial: true,
    portion: 'Porsi 1-2 Orang',
    origin: 'Sumatera Barat (Minangkabau)',
    keyIngredients: ['Daging Sapi Has', 'Santan Kelapa Segar', 'Kapur Balado', 'Lengkuas', 'Daun Kunyit', 'Asam Kandis'],
    allergens: ['Daging Sapi'],
    calories: 420
  },
  {
    id: 'dish-2',
    name: 'Bebek Betutu Daun Pisang Gianyar',
    category: 'Utama',
    description: 'Bebek muda utuh dibalut bumbu base genep khas Bali, dibungkus pelepah pinang dan daun pisang, lalu dipanggang bara sekam arang hingga dagingnya sangat empuk terlepas dari tulang.',
    price: 135000,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 290,
    spicyLevel: 2,
    isChefSpecial: true,
    portion: 'Porsi 2 Orang (Setengah Ekor)',
    origin: 'Bali (Gianyar)',
    keyIngredients: ['Bebek Muda', 'Kencur', 'Kunyit Bakar', 'Cabai Rawit Merah', 'Minyak Kelapa Tandusan'],
    allergens: ['Unggas'],
    calories: 550
  },
  {
    id: 'dish-3',
    name: 'Sate Maranggi Sapi Purwakarta Sambal Oncom',
    category: 'Utama',
    description: 'Daging sapi tenderloin yang dimarinasi ketumbar sangrai, kecap kedelai hitam manis pusaka, dan gula aren, dibakar arang kelapa disajikan dengan sambal tomat oncom segar.',
    price: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 310,
    spicyLevel: 1,
    isChefSpecial: false,
    portion: '10 Tusuk + Acar & Sambal Oncom',
    origin: 'Jawa Barat (Purwakarta)',
    keyIngredients: ['Sapi Tenderloin', 'Ketumbar Sangrai', 'Kecap Tradisional', 'Oncom Merah', 'Tomat Rampai'],
    allergens: ['Kedelai'],
    calories: 380
  },
  {
    id: 'dish-4',
    name: 'Sop Buntut Rempah Pala Kuali Tanah',
    category: 'Sup & Kuah',
    description: 'Buntut sapi pilihan dipotong tebal dimasak dalam kaldu bening gurih bertabur biji pala Banda, kapulaga Jawa, kayu manis, wortel manis, dan kentang lembut.',
    price: 125000,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 275,
    spicyLevel: 0,
    isChefSpecial: true,
    portion: 'Porsi 1-2 Orang (Mangkuk Besar)',
    origin: 'Jakarta (Betawi)',
    keyIngredients: ['Buntut Sapi Australia', 'Biji Pala Banda', 'Cengkeh', 'Kapulaga', 'Bawang Goreng Brebes'],
    allergens: ['Daging Sapi'],
    calories: 460
  },
  {
    id: 'dish-5',
    name: 'Ikan Bakar Jimbaran Bumbu Genep Madu',
    category: 'Utama',
    description: 'Ikan Gurame atau Kakap Merah segar tangkapan nelayan lokal, dibakar dengan arang batok kelapa dan olesan bumbu rempah Bali berkaramel madu hutan liar.',
    price: 110000,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 195,
    spicyLevel: 1,
    isChefSpecial: false,
    portion: '1 Ekor (± 600 gram)',
    origin: 'Bali (Jimbaran)',
    keyIngredients: ['Ikan Gurame Segar', 'Madu Hutan Sumbawa', 'Bawang Merah', 'Terasi Bakar', 'Jeruk Limau'],
    allergens: ['Seafood / Ikan'],
    calories: 390
  },
  {
    id: 'dish-6',
    name: 'Ayam Tangkap Rempah Daun Kari Renyah',
    category: 'Utama',
    description: 'Potongan ayam kampung berbumbu kunyit lengkuas yang digoreng bersama tumpukan daun temurui (daun kari), pandan wangi, dan cabai hijau renyah khas Serambi Mekkah.',
    price: 88000,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 160,
    spicyLevel: 2,
    isChefSpecial: false,
    portion: 'Setengah Ekor Ayam Kampung',
    origin: 'Aceh',
    keyIngredients: ['Ayam Kampung Muda', 'Daun Temurui/Kari', 'Daun Pandan', 'Bawang Putih', 'Cabai Hijau'],
    allergens: ['Unggas'],
    calories: 430
  },
  {
    id: 'dish-7',
    name: 'Gado-Gado Siram Kacang Mede Sangrai',
    category: 'Utama',
    description: 'Aneka sayur mayur organik kukus renyah, tahu tempe goreng, telur pindang, disiram kuah saus kacang tanah berpadu kacang mede sangrai yang lembut gurih beraroma jeruk limau.',
    price: 55000,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 140,
    spicyLevel: 1,
    isChefSpecial: false,
    portion: 'Porsi 1 Orang Sehat',
    origin: 'Jawa & Betawi',
    keyIngredients: ['Sayur Organik', 'Kacang Mede Sangrai', 'Gula Merah Tuban', 'Air Asam Jawa', 'Kerupuk Emping'],
    allergens: ['Kacang Tanah', 'Kacang Mede', 'Telur'],
    calories: 320
  },
  {
    id: 'dish-8',
    name: 'Tahu Telur Petis Gurih Surabaya',
    category: 'Kudapan',
    description: 'Tahu sutra lembut dibalut kocokan telur bebek yang digoreng garing berbentuk sarang burung, disiram kuah saus petis udang Sidoarjo yang pekat, legit, dan bertabur kacang.',
    price: 48000,
    imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 110,
    spicyLevel: 1,
    isChefSpecial: false,
    portion: 'Porsi 1-2 Orang',
    origin: 'Jawa Timur (Surabaya)',
    keyIngredients: ['Tahu Sutra', 'Telur Bebek', 'Petis Udang Sidoarjo', 'Kecap Hitam', 'Tauge Segar'],
    allergens: ['Telur', 'Kedelai', 'Kacang'],
    calories: 340
  },
  {
    id: 'dish-9',
    name: 'Es Pisang Ijo Daun Suji Pandan Asli',
    category: 'Kudapan',
    description: 'Pisang raja matang dibalut adonan lembut berwarna hijau alami dari perasan daun pandan dan suji murni, disajikan dengan bubur sumsum gurih, sirup frambozen buatan sendiri, dan es serut.',
    price: 42000,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 420,
    spicyLevel: 0,
    isChefSpecial: true,
    portion: 'Mangkuk Penutup 1 Orang',
    origin: 'Sulawesi Selatan (Makassar)',
    keyIngredients: ['Pisang Raja', 'Daun Suji Alami', 'Tepung Beras', 'Santan Kental', 'Sirup Frambozen Home-made'],
    allergens: ['Santan'],
    calories: 280
  },
  {
    id: 'dish-10',
    name: 'Wedang Rempah Uwuh Keraton Yogyakarta',
    category: 'Minuman',
    description: 'Seduhan hangat kayu secang yang menghasilkan warna merah anggun, jahe merah bakar, cengkeh, kayu manis, pala, dan gula batu kristal pereda lelah dan penyejuk raga.',
    price: 32000,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 180,
    spicyLevel: 0,
    isChefSpecial: false,
    portion: '1 Cangkir Gerabah Tradisional',
    origin: 'DI Yogyakarta (Imogiri)',
    keyIngredients: ['Kayu Secang', 'Jahe Merah Bakar', 'Cengkeh', 'Kayu Manis', 'Gula Batu Asli'],
    allergens: [],
    calories: 90
  },
  {
    id: 'dish-11',
    name: 'Es Timun Serut Jeruk Nipis Bunga Telang',
    category: 'Minuman',
    description: 'Minuman pelepas dahaga dari serutan timun muda segar berpadu perasan jeruk nipis peras, selasih harum, dan infusi bunga telang biru alami yang menyegarkan.',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 220,
    spicyLevel: 0,
    isChefSpecial: false,
    portion: '1 Gelas Tinggi Dingin',
    origin: 'Aceh / Melayu',
    keyIngredients: ['Timun Organik', 'Jeruk Nipis', 'Bunga Telang Alami', 'Biji Selasih', 'Madu Alami'],
    allergens: [],
    calories: 75
  },
  {
    id: 'dish-12',
    name: 'Paket Jamuan Agung Sultan (Untuk 4 Tamu)',
    category: 'Paket Jamuan',
    description: 'Paket lengkap istimewa: Rendang Daging Tok, Bebek Betutu Gianyar, Sop Buntut Rempah Pala, Bakwan Jagung Renyah, Nasi Liwet Rempah Bakar 1 Ceting, Es Pisang Ijo (4 porsi), dan Wedang/Es Timun (4 porsi).',
    price: 495000,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 130,
    spicyLevel: 1,
    isChefSpecial: true,
    portion: 'Porsi Lengkap 4 Tamu',
    origin: 'Koleksi Jamuan Mahakarya Nusantara',
    keyIngredients: ['Rendang', 'Bebek Betutu', 'Sop Buntut', 'Nasi Liwet Rempah', 'Aneka Sambal Nusantara'],
    allergens: ['Daging Sapi', 'Unggas', 'Seafood'],
    calories: 1800
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Ratih Pratiwi & Keluarga',
    date: '3 hari yang lalu',
    rating: 5,
    dishFav: 'Rendang Daging Tok & Sop Buntut',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'Pengalaman booking online-nya sangat mudah dan cepat! Pas datang di meja Bale Kencana, ruangannya sudah wangi rempah dan meja tertata rapi persis seperti waktu pilih di website. Rendangnya empuk luar biasa sampai lumer di mulut.',
    visitedDate: 'September 2026'
  },
  {
    id: 'rev-2',
    name: 'Dimas Wicaksono',
    date: '1 minggu yang lalu',
    rating: 5,
    dishFav: "Chef's Table Experience & Bebek Betutu",
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'Reservasi untuk ulang tahun istri di Chef’s Table. Chef Aryo ramah sekali menjelaskan filosofi setiap bumbu. Rasanya otentik tapi penyajiannya mewah berkelas. Fitur pemilihan jadwalnya sangat membantu tanpa antre.',
    visitedDate: 'September 2026'
  },
  {
    id: 'rev-3',
    name: 'Dr. Hendra Gunawan',
    date: '2 minggu yang lalu',
    rating: 5,
    dishFav: 'Paket Jamuan Agung Sultan',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'Kami mengadakan makan malam bersama kolega luar negeri di Pendopo Utama. Mereka sangat kagum dengan cita rasa rempah Nusantara dan alunan musik latarnya. Tempat parkir luas dan pelayanan bintang lima.',
    visitedDate: 'Agustus 2026'
  }
];

export const INITIAL_BOOKINGS_STORAGE_KEY = 'selera_nusantara_reservations_v1';
