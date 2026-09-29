import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import PlantCatalogView from './components/PlantCatalogView';
import PlantDetailsView from './components/PlantDetailsView';
import PotSelectionView from './components/PotSelectionView';
import MaintenancePlansView from './components/MaintenancePlansView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderConfirmationView from './components/OrderConfirmationView';
import LocationCheckerModal from './components/LocationCheckerModal';
import { PLANTS, POTS, SUPPORTED_LOCATIONS } from './data/mockData';

export default function App() {
  // Navigation State: 'home' | 'catalog' | 'details' | 'pots' | 'plans' | 'cart' | 'checkout' | 'confirmation'
  const [currentTab, setCurrentTab] = useState('home');

  // Selected Plant for details view
  const [selectedPlant, setSelectedPlant] = useState(PLANTS[0]);

  // User location state (default to Hyderabad Gachibowli for realistic first load)
  const [userLocation, setUserLocation] = useState(SUPPORTED_LOCATIONS[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Cart State (Initialized with 1 sample bundle for contractor review immediacy)
  const [cartItems, setCartItems] = useState([
    {
      plant: PLANTS[0], // Fiddle Leaf Fig
      pot: POTS[0], // Tuscan Cream Fluted Terracotta
      quantity: 1,
      soilIncluded: true,
      soilFormula: PLANTS[0].soilFormula,
      whiteGlovePlantingIncluded: true,
      maintenanceAddon: true,
      unitPrice: PLANTS[0].price + POTS[0].price,
      totalPrice: PLANTS[0].price + POTS[0].price,
      deliveryTimeline: 'Next-Day Delivery (within 24 hrs)'
    }
  ]);

  // Last completed order data
  const [lastOrder, setLastOrder] = useState(null);

  // Cart actions
  const handleAddToCart = (bundle) => {
    setCartItems(prev => [...prev, bundle]);
    setCurrentTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPlanToCart = (planItem) => {
    setCartItems(prev => [...prev, planItem]);
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setCurrentTab('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (orderData) => {
    setLastOrder(orderData);
    setCartItems([]); // Clear cart
    setCurrentTab('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#142617] antialiased selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Notification Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 text-center border-b border-emerald-900 font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>
          White-glove planting included free with every plant & pot combination • Direct dispatch across Hyderabad nursery hubs
        </span>
      </div>

      {/* Main Header / Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={navigateTo}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        userLocation={userLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            userLocation={userLocation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onNavigate={navigateTo}
            onSelectPlant={handleSelectPlant}
          />
        )}

        {currentTab === 'catalog' && (
          <PlantCatalogView
            userLocation={userLocation}
            onSelectPlant={handleSelectPlant}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
          />
        )}

        {currentTab === 'details' && (
          <PlantDetailsView
            plant={selectedPlant}
            userLocation={userLocation}
            onBack={() => navigateTo('catalog')}
            onAddToCart={handleAddToCart}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
          />
        )}

        {currentTab === 'pots' && (
          <PotSelectionView
            onSelectPlant={handleSelectPlant}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'plans' && (
          <MaintenancePlansView
            onAddPlanToCart={handleAddPlanToCart}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'cart' && (
          <CartView
            cartItems={cartItems}
            userLocation={userLocation}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={navigateTo}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            userLocation={userLocation}
            onBack={() => navigateTo('cart')}
            onCompleteOrder={handleCompleteOrder}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
          />
        )}

        {currentTab === 'confirmation' && (
          <OrderConfirmationView
            orderData={lastOrder}
            onNavigateHome={() => navigateTo('home')}
            onBrowseMore={() => navigateTo('catalog')}
          />
        )}
      </main>

      {/* Global Location Modal */}
      <LocationCheckerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        userLocation={userLocation}
        onSelectLocation={(loc) => setUserLocation(loc)}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

    </div>
  );
}
