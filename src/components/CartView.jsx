import React from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ShoppingBag, 
  MapPin,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { formatINR } from '../data/mockData';
import SafeImage from './SafeImage';

export default function CartView({ 
  cartItems, 
  userLocation, 
  onUpdateQuantity, 
  onRemoveItem, 
  onNavigate, 
  onOpenLocationModal 
}) {
  const isCartEmpty = cartItems.length === 0;

  // Subtotal calculations
  const oneTimeTotal = cartItems
    .filter(item => item.type !== 'maintenance-subscription')
    .reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const recurringMonthlyTotal = cartItems
    .filter(item => item.type === 'maintenance-subscription' || item.maintenanceAddon)
    .reduce((sum, item) => {
      if (item.type === 'maintenance-subscription') {
        return sum + (item.price * item.quantity);
      }
      if (item.maintenanceAddon) {
        return sum + (999 * item.quantity);
      }
      return sum;
    }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#e5decb] gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Order Manifest
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-1">
            Your Botanical Selection & White-Glove Service
          </h1>
        </div>

        <div 
          onClick={onOpenLocationModal}
          className="flex items-center gap-2.5 bg-[#f0eae0] hover:bg-[#e7dfd1] border border-[#ded5c5] px-4 py-2 rounded-2xl cursor-pointer transition-colors self-start sm:self-auto"
        >
          <MapPin className="w-4 h-4 text-emerald-800" />
          <div className="text-xs">
            <span className="text-gray-500">Delivering to: </span>
            <strong className="text-emerald-950 font-bold">
              {userLocation ? `${userLocation.city}, ${userLocation.state}` : 'Select City'}
            </strong>
          </div>
        </div>
      </div>

      {isCartEmpty ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#ded5c5] space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Your Botanical Cart is Empty</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Select a living architectural plant or flowering flora and pair it with a handcrafted pot or ground planting service.
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
          >
            Explore Plant Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-5">
            {cartItems.map((item, idx) => {
              const isSubscription = item.type === 'maintenance-subscription';

              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-[#e5decb] shadow-sm space-y-4 relative"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <SafeImage
                        src={isSubscription ? 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=300&q=80' : item.plant?.image}
                        alt={isSubscription ? item.name : item.plant?.name}
                        fallbackEmoji={isSubscription ? '📋' : item.plant?.fallbackEmoji || '🌿'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                            {isSubscription ? 'Stewardship Plan' : item.isGardenGround ? 'Garden Ground Planting Bundle' : 'Custom Plant & Vessel Bundle'}
                          </span>
                          <h3 className="text-lg font-bold text-gray-950">
                            {isSubscription ? item.name : item.plant?.name}
                          </h3>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-black text-gray-950 font-heading">
                            {formatINR(isSubscription ? (item.price * item.quantity) : (item.unitPrice * item.quantity))}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {isSubscription ? `per ${item.billingCycle || 'month'}` : `${formatINR(item.unitPrice)} each`}
                          </div>
                        </div>
                      </div>

                      {/* Plant + Pot Bundle Breakdown */}
                      {!isSubscription && (
                        <div className="bg-[#fbf9f4] p-3 rounded-xl border border-[#ede5d8] text-xs space-y-1 text-gray-700">
                          <div>
                            <strong>{item.isGardenGround ? 'Ground Planting Option:' : 'Selected Vessel:'}</strong> {item.pot?.name} (+{formatINR(item.pot?.price)})
                          </div>
                          <div className="text-emerald-800 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span><strong>Custom Living Soil:</strong> {item.soilFormula || item.plant?.soilFormula} (Included FREE)</span>
                          </div>
                          <div className="text-emerald-800 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span><strong>White-Glove Service:</strong> {item.isGardenGround ? 'Excavated & planted directly in garden ground' : 'Delivered & planted on-site in vessel'} (Included FREE)</span>
                          </div>
                          {item.maintenanceAddon && (
                            <div className="text-purple-900 font-bold pt-1 border-t border-gray-200">
                              + Monthly Botanical Essentials Care Plan (₹999/mo)
                            </div>
                          )}
                        </div>
                      )}

                      {isSubscription && (
                        <div className="bg-[#fbf9f4] p-3 rounded-xl border border-[#ede5d8] text-xs text-gray-700">
                          <div><strong>Cadence:</strong> {item.cadence}</div>
                          <div className="text-emerald-800 font-medium">{item.description}</div>
                        </div>
                      )}

                      {/* Delivery estimate tag */}
                      {!isSubscription && item.deliveryTimeline && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
                          <Truck className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Estimated Arrival: <strong>{item.deliveryTimeline}</strong></span>
                        </div>
                      )}

                      {/* Controls: Quantity and Delete */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Turnkey guarantee reminder */}
            <div className="bg-[#ede7da] rounded-2xl p-5 border border-[#d6ccbb] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-gray-800">
                <strong className="text-emerald-950 font-bold block">Every delivery includes zero-effort installation:</strong>
                Our team carries all soil, clean canvas floor tarps, moisture meters, and organic finishing mulch. We plant in your preferred room and leave zero debris.
              </div>
            </div>
          </div>

          {/* Order Summary & Proceed to Checkout */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5decb] shadow-sm space-y-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-950 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Botanical & Pot Subtotal:</span>
                  <span className="font-bold text-gray-900">{formatINR(oneTimeTotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Certified Soil Engineering:</span>
                  <span>FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>In-Home White-Glove Planting:</span>
                  <span>FREE (₹0)</span>
                </div>
                <div className="flex justify-between">
                  <span>Climate-Controlled Courier Van:</span>
                  <span className="font-bold text-emerald-800">FREE</span>
                </div>

                {recurringMonthlyTotal > 0 && (
                  <div className="pt-2 border-t border-gray-100 flex justify-between text-purple-900 font-bold">
                    <span>Care Plan (Billed Monthly):</span>
                    <span>{formatINR(recurringMonthlyTotal)} / mo</span>
                  </div>
                )}

                <div className="pt-3 border-t-2 border-gray-200 flex justify-between items-baseline">
                  <div>
                    <div className="text-base font-black text-gray-950">Total Due Today:</div>
                    <div className="text-[11px] text-gray-400">Taxes calculated at review</div>
                  </div>
                  <div className="text-2xl font-black text-emerald-950 font-heading">
                    {formatINR(oneTimeTotal)}
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to White-Glove Scheduling</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                + Add More Botanicals
              </button>

              <div className="text-[11px] text-gray-500 text-center leading-relaxed">
                Prototype review mode: No payment cards charged. Interactive frontend with editable sample pricing.
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
