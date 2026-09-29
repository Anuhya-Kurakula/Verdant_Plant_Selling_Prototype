import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  SunMedium, 
  Droplet, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Clock, 
  Truck, 
  Info,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';
import { POTS, formatINR } from '../data/mockData';
import SafeImage from './SafeImage';

export default function PlantDetailsView({ 
  plant, 
  userLocation, 
  onBack, 
  onAddToCart, 
  onOpenLocationModal 
}) {
  const [selectedPot, setSelectedPot] = useState(POTS[0]);
  const [includeMaintenance, setIncludeMaintenance] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  if (!plant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">No plant selected.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg">
          Back to Catalog
        </button>
      </div>
    );
  }

  // Location & Stock metrics
  const stockInfo = userLocation && plant.nurseryStock[userLocation.id];
  const isAvailableLocally = stockInfo ? stockInfo.inStock : true;
  const deliveryTimeline = userLocation 
    ? (stockInfo ? stockInfo.days : '2-4 business days') 
    : 'Select location for exact delivery timeline';

  const totalPrice = (plant.price + (selectedPot ? selectedPot.price : 0)) * quantity;

  const handleAddBundleToCart = () => {
    onAddToCart({
      plant,
      pot: selectedPot,
      quantity,
      soilIncluded: true,
      soilFormula: plant.soilFormula,
      whiteGlovePlantingIncluded: true,
      isGardenGround: selectedPot?.isGardenGround || false,
      maintenanceAddon: includeMaintenance,
      unitPrice: plant.price + (selectedPot ? selectedPot.price : 0),
      totalPrice,
      deliveryTimeline
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb / Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Living Collection</span>
        </button>

        <div 
          onClick={onOpenLocationModal}
          className="flex items-center gap-2 text-xs text-gray-700 bg-[#ede5d8] px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-[#e4dac9] transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-800" />
          <span>
            {userLocation ? `${userLocation.city}, ${userLocation.state}` : 'Check Delivery City'}
          </span>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Visual Showcase & Soil/Planting Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl overflow-hidden border border-[#e5decb] shadow-sm relative">
            <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
              <SafeImage
                src={plant.image}
                alt={plant.name}
                fallbackEmoji={plant.fallbackEmoji || '🌿'}
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                {plant.badge}
              </span>
            </div>

            {/* Micro specs below image */}
            <div className="p-6 bg-[#fbf9f4] grid grid-cols-3 gap-4 text-center border-t border-[#e8dfd0]">
              <div className="p-3 bg-white rounded-xl border border-[#ded5c5]">
                <SunMedium className="w-5 h-5 mx-auto text-amber-600 mb-1" />
                <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Sunlight</div>
                <div className="text-xs font-bold text-gray-800">{plant.light}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#ded5c5]">
                <Droplet className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Hydration</div>
                <div className="text-xs font-bold text-gray-800">{plant.water}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#ded5c5]">
                <Layers className="w-5 h-5 mx-auto text-emerald-700 mb-1" />
                <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Growth</div>
                <div className="text-xs font-bold text-gray-800">{plant.height}</div>
              </div>
            </div>
          </div>

          {/* Turnkey Service Blueprint Card */}
          <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-6 sm:p-8 space-y-5 border border-emerald-900/60 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Full Turnkey Botanical Service Included</h3>
                <p className="text-xs text-emerald-300">You select the plant & pot. We handle all the dirty work.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-emerald-800/60">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  1. Botanist Soil Selection
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed font-mono">
                  "{plant.soilFormula}"
                </p>
                <div className="text-[11px] text-emerald-300 mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Mixed fresh morning of delivery
                </div>
              </div>

              <div className="bg-emerald-900/50 p-4 rounded-2xl border border-emerald-800/60">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  2. In-Home White-Glove Planting
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Our uniformed technicians pot your specimen directly inside your chosen vessel, top-dress with natural stones, test light levels, and sweep clean.
                </p>
                <div className="text-[11px] text-emerald-300 mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Zero cleanup or dust for you
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Customization Flow (Step 1: Pot Selection, Step 2: Maintenance, Step 3: Cart) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5decb] shadow-sm space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {plant.category}
                </span>
                <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                  ★ {plant.rating} ({plant.reviewsCount} verified reviews)
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-950 mt-1">{plant.name}</h1>
              <p className="text-xs font-serif italic text-gray-500">{plant.scientificName}</p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {plant.description}
              </p>
            </div>

            {/* Delivery & Nursery Stock status banner */}
            <div className={`p-4 rounded-2xl border text-xs ${
              isAvailableLocally 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-start gap-2.5">
                <Truck className={`w-4 h-4 shrink-0 mt-0.5 ${isAvailableLocally ? 'text-emerald-700' : 'text-amber-700'}`} />
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    {userLocation ? (
                      isAvailableLocally ? (
                        <>In Stock at {userLocation.nurseryHub} ({stockInfo.stockCount} plants)</>
                      ) : (
                        <>Local Nursery Stock Depleted (Dispatching from Regional Hub)</>
                      )
                    ) : (
                      <>Delivery Time Estimate</>
                    )}
                  </div>
                  <div className="mt-0.5 text-gray-700">
                    Estimated Delivery: <strong>{deliveryTimeline}</strong>
                  </div>
                  {!userLocation && (
                    <button 
                      onClick={onOpenLocationModal}
                      className="mt-1 text-emerald-800 underline font-semibold cursor-pointer"
                    >
                      Set your city to verify stock & dates
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 1: Select Pot / Vessel OR Direct Garden Ground Planting */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Choose Vessel OR Plant Directly in Garden Ground</span>
                </label>
                <span className="text-xs text-emerald-800 font-semibold">Garden Ground Option Available</span>
              </div>

              <div className="space-y-2.5">
                {POTS.map((pot) => {
                  const isSelected = selectedPot?.id === pot.id;
                  const isGarden = pot.isGardenGround;

                  return (
                    <div
                      key={pot.id}
                      onClick={() => setSelectedPot(pot)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected 
                          ? isGarden ? 'border-emerald-700 bg-emerald-100/60 shadow-md ring-2 ring-emerald-600/30' : 'border-emerald-800 bg-emerald-50/50 shadow-sm' 
                          : isGarden ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-500' : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <SafeImage 
                            src={pot.image} 
                            alt={pot.name} 
                            fallbackEmoji={isGarden ? '🏡' : '🏺'}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <span>{pot.name}</span>
                            {isGarden && (
                              <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded-full font-extrabold uppercase">
                                Ground Setup
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{pot.finish} • {pot.dimensions}</div>
                          <div className="text-[11px] text-emerald-800 font-medium mt-0.5">{pot.tag}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-black text-gray-900">+{formatINR(pot.price)}</div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ml-auto mt-1 ${
                          isSelected ? 'bg-emerald-800 border-emerald-800 text-white' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Optional Care Plan Add-on */}
            <div className="pt-2 border-t border-gray-100">
              <div className="bg-[#f7f4ee] p-4 rounded-2xl border border-[#ded5c5] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-800" />
                    <span className="text-sm font-bold text-gray-900">Add Botanical Care Subscription?</span>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    Optional
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Include our monthly botanist visit (₹999/mo, cancel anytime). Guaranteed 100% plant replacement if it ever wilts under our watch.
                </p>
                <label className="flex items-center gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={includeMaintenance}
                    onChange={(e) => setIncludeMaintenance(e.target.checked)}
                    className="w-5 h-5 text-emerald-800 rounded focus:ring-emerald-700"
                  />
                  <span className="text-xs font-bold text-emerald-950">
                    Yes, attach Monthly Botanical Essentials Care Plan (+ ₹999/mo)
                  </span>
                </label>
              </div>
            </div>

            {/* Quantity Selector and Price Summary */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="bg-[#fbf9f4] p-4 rounded-xl border border-[#ded5c5] space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Plant Specimen ({plant.name}):</span>
                  <span>{formatINR(plant.price * quantity)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vessel ({selectedPot.name}):</span>
                  <span>{formatINR(selectedPot.price * quantity)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Custom Soil Formulation & Mix:</span>
                  <span>FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>On-Site Planting & Placement Service:</span>
                  <span>FREE (₹0)</span>
                </div>
                {includeMaintenance && (
                  <div className="flex justify-between text-emerald-900 font-bold pt-1 border-t border-gray-200">
                    <span>Monthly Care Plan:</span>
                    <span>₹999 / mo (billed separately)</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-300">
                  <span>Total Due Today:</span>
                  <span className="font-heading">{formatINR(totalPrice)}</span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddBundleToCart}
                className="w-full py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Custom Plant & Pot Bundle to Cart</span>
                <span className="text-emerald-200">•</span>
                <span>{formatINR(totalPrice)}</span>
              </button>

              <div className="text-center text-[11px] text-gray-500">
                🔒 No payment needed today • Clickable frontend prototype for contractor review
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
