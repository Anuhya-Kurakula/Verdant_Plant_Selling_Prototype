import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  MapPin, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  onNavigate, 
  cartCount, 
  userLocation, 
  onOpenLocationModal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Plant Catalog' },
    { id: 'pots', label: 'Pot Selection' },
    { id: 'plans', label: 'Maintenance Plans' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/90 backdrop-blur-md border-b border-[#e8dfd0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-900 flex items-center justify-center text-emerald-200 shadow-md group-hover:bg-emerald-800 transition-colors">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black font-heading text-emerald-950 tracking-tight block">
                VERDANT OASIS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block -mt-1">
                Living Botany & White-Glove Care
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#ede6d8]/70 p-1.5 rounded-2xl border border-[#ded5c5]">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-gray-700 hover:text-emerald-950 hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Location Selector Pill */}
            <button
              onClick={onOpenLocationModal}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 border border-[#ded5c5] shadow-xs text-xs font-semibold text-gray-800 transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span className="truncate max-w-[130px]">
                {userLocation ? userLocation.city : 'Select City'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-400 text-emerald-950 text-xs font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e5decb] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => {
              onOpenLocationModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#fbf9f4] border border-[#ded5c5] text-xs font-bold text-emerald-950"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-800" />
              <span>Current Metro: {userLocation ? `${userLocation.city}, ${userLocation.state}` : 'Select City'}</span>
            </div>
            <span className="text-emerald-700 underline">Change</span>
          </button>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold ${
                  currentTab === link.id
                    ? 'bg-emerald-800 text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
