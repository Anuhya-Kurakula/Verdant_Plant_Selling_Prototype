import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  ChevronRight, 
  CheckCircle2, 
  Sprout, 
  Droplet, 
  SunMedium, 
  Clock, 
  ArrowRight,
  Star,
  Users,
  Building2,
  CalendarCheck
} from 'lucide-react';
import { PLANTS, POTS, MAINTENANCE_PLANS, SERVICE_PROMISE, formatINR } from '../data/mockData';
import SafeImage from './SafeImage';

export default function HomeView({ 
  userLocation, 
  onOpenLocationModal, 
  onNavigate, 
  onSelectPlant, 
  onQuickAddPlantAndPot 
}) {
  const featuredPlants = PLANTS.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f2ece1] via-[#fbf9f4] to-[#fbf9f4] pt-8 md:pt-16 pb-12 border-b border-[#e9e2d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Service location pill banner */}
              <div 
                onClick={onOpenLocationModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/5 hover:bg-emerald-900/10 border border-emerald-900/15 cursor-pointer transition-all duration-200 group"
              >
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span className="text-xs sm:text-sm font-medium text-emerald-900">
                  {userLocation ? (
                    <>Delivering to <strong className="underline underline-offset-2">{userLocation.city}, {userLocation.state}</strong> • Local Nursery Active</>
                  ) : (
                    <>Select your city for live nursery stock & white-glove delivery estimate</>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-0.5 transition-transform" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#112415] tracking-tight leading-[1.12]">
                Architectural Flora & Garden Beds, Potted & <span className="text-emerald-700 italic font-serif">Nurtured Forever.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#364b3c] max-w-2xl leading-relaxed">
                Choose flowering shrubs, sacred tulsi, statement trees, and handcrafted pots—or have our team plant directly in your outdoor garden soil. We custom-blend the soil, deliver in climate-controlled vans, and provide ongoing garden care.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="px-8 py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-cream font-semibold text-base shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer text-white"
                >
                  <span>Explore Plant Catalog</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('plans')}
                  className="px-6 py-4 rounded-xl bg-cream-soft hover:bg-[#eae2d5] text-[#1c3623] font-semibold text-base border border-[#d8cebe] transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>View Maintenance Plans</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#e2d8c7] text-[#284030]">
                <div>
                  <div className="text-2xl font-bold font-heading text-emerald-900">100%</div>
                  <div className="text-xs text-[#526a57]">Custom organic living soil</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-emerald-900">Zero Mess</div>
                  <div className="text-xs text-[#526a57]">Pot or garden ground planting</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-emerald-900">Guaranteed</div>
                  <div className="text-xs text-[#526a57]">Free replacement warranty</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/20 via-emerald-800/10 to-amber-200/30 rounded-3xl blur-2xl -z-10" />
                
                <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-white relative">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80"
                    alt="Lush Botanical Garden Living Room"
                    fallbackEmoji="🌿"
                    className="w-full h-[460px] object-cover object-center"
                  />
                  
                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                          <Sprout className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Turnkey Service Included</div>
                          <div className="text-sm font-bold text-gray-900">Plant + Pot or Garden Soil + White-Glove Setup</div>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200">
                        Zero Dirty Work
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works - The 4-Step Promise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Effortless Greenery Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#112415]">
            How Verdant Oasis Delivers Perfection
          </h2>
          <p className="text-base sm:text-lg text-[#3f5746]">
            Traditional plant shopping leaves you carrying heavy soil bags, guessing pot drainage, and mourning dead plants. We reinvented the botanical journey from root to canopy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICE_PROMISE.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#e4dccd] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black font-heading text-emerald-800/20 mb-4 block">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                Done by Certified Staff
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Botanical Catalog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Curated Masterpieces
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">Featured Living Botanicals</h2>
            <p className="text-sm text-gray-600">Acclimated in regional greenhouse nursery hubs for optimal vitality.</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:text-emerald-950 text-sm group cursor-pointer"
          >
            <span>View All {PLANTS.length} Plants</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {featuredPlants.map((plant) => (
            <div 
              key={plant.id}
              onClick={() => onSelectPlant(plant)}
              className="bg-white rounded-2xl overflow-hidden border border-[#e5decb] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
                <SafeImage
                  src={plant.image}
                  alt={plant.name}
                  fallbackEmoji={plant.fallbackEmoji || '🌸'}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {plant.badge}
                </span>
                <div className="absolute bottom-3 right-3 bg-white/95 px-2 py-1 rounded-md text-xs font-bold text-emerald-900 shadow">
                  ★ {plant.rating}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-medium text-emerald-700">{plant.scientificName}</div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors mt-0.5">
                    {plant.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><SunMedium className="w-3.5 h-3.5 text-amber-600" /> {plant.difficulty}</span>
                    <span>•</span>
                    <span>{plant.height}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Plant Only</span>
                    <span className="text-xl font-bold text-emerald-900">{formatINR(plant.price)}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlant(plant);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-800 hover:text-white text-emerald-800 text-xs font-semibold transition-colors"
                  >
                    Select & Pair Pot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Pot Showcase Highlight */}
      <section className="bg-gradient-to-r from-[#213f28] to-[#142819] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-300 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-600/40">
                Handcrafted Vessels
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Pair With Hand-Thrown Ceramic & Engineered Concrete Pots
              </h2>
              <p className="text-emerald-100/80 leading-relaxed text-sm sm:text-base">
                Every vessel is chosen for breathable wall properties, hidden internal drip reservoirs, and scratch-resistant bases. No cheap plastic liners.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">✓</div>
                  <span>Custom sized to accommodate mature root ball expansion</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">✓</div>
                  <span>Includes organic mulch & decorative river pebble top-dress</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">✓</div>
                  <span>Expert planting done on site inside your chosen vessel</span>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('pots')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-colors cursor-pointer"
                >
                  Explore The Pot Gallery
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {POTS.map((pot) => (
                <div 
                  key={pot.id}
                  onClick={() => onNavigate('pots')}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all cursor-pointer group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-black/20">
                    <SafeImage 
                      src={pot.image} 
                      alt={pot.name} 
                      fallbackEmoji={pot.isGardenGround ? '🏡' : '🏺'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">{pot.name}</h4>
                      <p className="text-xs text-emerald-200/70">{pot.material}</p>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-300">{formatINR(pot.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Maintenance Plans Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#ede7da] rounded-3xl p-8 sm:p-12 border border-[#d6cbba] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-white/80 px-3 py-1 rounded-full border border-emerald-800/20">
              Contractor & Client Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Never Worry About A Dying Plant Again
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Our monthly and bi-weekly plant wellness subscriptions dispatch certified plant doctors to test root aerification, clean dust off fronds, feed organic micronutrients, and replace failing plants completely free of charge.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('plans')}
                className="px-6 py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Explore Care Plans (From ₹999/mo)
              </button>
              <button
                onClick={onOpenLocationModal}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 text-emerald-900 border border-emerald-900/20 font-semibold rounded-xl text-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>Verify Your Service Radius</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
