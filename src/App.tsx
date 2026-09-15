import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CulinaryProfile } from './components/CulinaryProfile';
import { MenuCatalog } from './components/MenuCatalog';
import { AmbianceGallery } from './components/AmbianceGallery';
import { CustomerReviews } from './components/CustomerReviews';
import { BookingEngine } from './components/BookingEngine';
import { DishDetailModal } from './components/DishDetailModal';
import { TicketModal } from './components/TicketModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { Footer } from './components/Footer';
import { Dish, PreOrderItem, Reservation } from './types';
import { INITIAL_BOOKINGS_STORAGE_KEY } from './data/culinaryData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'menu' | 'booking' | 'ambiance' | 'reviews'>('profile');
  const [selectedDishForDetail, setSelectedDishForDetail] = useState<Dish | null>(null);
  const [preOrders, setPreOrders] = useState<PreOrderItem[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<string>('pendopo-utama');

  // Reservations state with localStorage
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(INITIAL_BOOKINGS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load reservations from localStorage', e);
    }

    // Default sample reservation for demo purposes
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const tomorrowStr = d.toISOString().split('T')[0];

    return [
      {
        id: 'sample-res-1',
        bookingCode: 'SN-260916-G7K9',
        customerName: 'Siti Rahmawati',
        customerPhone: '081298765432',
        customerEmail: 'siti.rahmawati@gmail.com',
        date: tomorrowStr,
        timeSlot: '19:00',
        guestCount: 4,
        areaId: 'pendopo-utama',
        areaName: 'Pendopo Utama (Indoor AC)',
        diningOccasion: 'Santap Santai',
        specialRequests: 'Meja dekat dekorasi tanaman, ada anak kecil',
        needBabyChair: true,
        preOrders: [
          {
            dishId: 'dish-1',
            dishName: 'Rendang Daging Tok Kayu Bakar',
            price: 98000,
            quantity: 2,
            imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
          },
          {
            dishId: 'dish-9',
            dishName: 'Es Pisang Ijo Daun Suji Pandan Asli',
            price: 42000,
            quantity: 2,
            imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
          }
        ],
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        totalEstimatedAmount: 280000
      }
    ];
  });

  // Save reservations to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(INITIAL_BOOKINGS_STORAGE_KEY, JSON.stringify(reservations));
    } catch (e) {
      console.error('Failed to save reservations to localStorage', e);
    }
  }, [reservations]);

  // Modal controls
  const [confirmedReservationModal, setConfirmedReservationModal] = useState<Reservation | null>(null);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState<boolean>(false);

  // Scroll to top on tab change
  const handleTabChange = (tab: 'profile' | 'menu' | 'booking' | 'ambiance' | 'reviews') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pre-order handlers
  const handleTogglePreOrder = (dish: Dish) => {
    setPreOrders((prev) => {
      const exists = prev.find((p) => p.dishId === dish.id);
      if (exists) {
        return prev.filter((p) => p.dishId !== dish.id);
      } else {
        return [
          ...prev,
          {
            dishId: dish.id,
            dishName: dish.name,
            price: dish.price,
            quantity: 1,
            imageUrl: dish.imageUrl
          }
        ];
      }
    });
  };

  const handleUpdatePreOrderQuantity = (dishId: string, delta: number) => {
    setPreOrders((prev) =>
      prev
        .map((item) => {
          if (item.dishId === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as PreOrderItem[]
    );
  };

  const handleAddDishToPreOrder = (dish: Dish) => {
    setPreOrders((prev) => {
      const exists = prev.find((p) => p.dishId === dish.id);
      if (exists) {
        return prev.map((p) =>
          p.dishId === dish.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [
          ...prev,
          {
            dishId: dish.id,
            dishName: dish.name,
            price: dish.price,
            quantity: 1,
            imageUrl: dish.imageUrl
          }
        ];
      }
    });
  };

  // When area is picked in Ambiance tab
  const handleSelectAreaForBooking = (areaId: string) => {
    setSelectedAreaId(areaId);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a reservation is finalized
  const handleReservationCreated = (newReservation: Reservation) => {
    setReservations((prev) => [newReservation, ...prev]);
    // Open E-Ticket modal immediately
    setConfirmedReservationModal(newReservation);
    // Clear pre-order basket after booking
    setPreOrders([]);
  };

  // Reservation actions in modal
  const handleCancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
    );
  };

  const handleRescheduleReservation = (id: string, newDate: string, newTime: string) => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, date: newDate, timeSlot: newTime, status: 'confirmed' as const } : r
      )
    );
  };

  const activeReservationsCount = reservations.filter((r) => r.status === 'confirmed').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-800 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        myBookingsCount={activeReservationsCount}
        onOpenMyBookings={() => setIsMyReservationsOpen(true)}
        onQuickBookClick={() => handleTabChange('booking')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        {activeTab === 'profile' && (
          <CulinaryProfile
            onStartBooking={() => handleTabChange('booking')}
            onExploreMenu={() => handleTabChange('menu')}
          />
        )}

        {activeTab === 'menu' && (
          <MenuCatalog
            onSelectDishDetail={(dish) => setSelectedDishForDetail(dish)}
            preOrders={preOrders}
            onTogglePreOrder={handleTogglePreOrder}
            onGoToBooking={() => handleTabChange('booking')}
          />
        )}

        {activeTab === 'ambiance' && (
          <AmbianceGallery onSelectAreaForBooking={handleSelectAreaForBooking} />
        )}

        {activeTab === 'booking' && (
          <BookingEngine
            preOrders={preOrders}
            onUpdatePreOrderQuantity={handleUpdatePreOrderQuantity}
            onAddDishToPreOrder={handleAddDishToPreOrder}
            selectedAreaId={selectedAreaId}
            onSelectAreaId={setSelectedAreaId}
            onReservationCreated={handleReservationCreated}
          />
        )}

        {activeTab === 'reviews' && <CustomerReviews />}
      </main>

      {/* Dish Detail Modal */}
      {selectedDishForDetail && (
        <DishDetailModal
          dish={selectedDishForDetail}
          onClose={() => setSelectedDishForDetail(null)}
          onAddToPreOrder={handleAddDishToPreOrder}
          isInPreOrder={preOrders.some((p) => p.dishId === selectedDishForDetail.id)}
        />
      )}

      {/* Confirmed E-Ticket Modal */}
      {confirmedReservationModal && (
        <TicketModal
          reservation={confirmedReservationModal}
          onClose={() => setConfirmedReservationModal(null)}
        />
      )}

      {/* My Reservations Management Modal */}
      <MyReservationsModal
        reservations={reservations}
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        onViewTicket={(res) => setConfirmedReservationModal(res)}
        onCancelReservation={handleCancelReservation}
        onRescheduleReservation={handleRescheduleReservation}
        onGoToBooking={() => handleTabChange('booking')}
      />

      {/* Footer */}
      <Footer
        onQuickBook={() => handleTabChange('booking')}
        onSelectMenu={() => handleTabChange('menu')}
        onSelectProfile={() => handleTabChange('profile')}
      />
    </div>
  );
}
