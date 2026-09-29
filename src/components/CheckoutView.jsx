import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Building, 
  User, 
  Mail, 
  Phone,
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { SUPPORTED_LOCATIONS, formatINR } from '../data/mockData';

export default function CheckoutView({ 
  cartItems, 
  userLocation, 
  onBack, 
  onCompleteOrder, 
  onOpenLocationModal 
}) {
  const [formData, setFormData] = useState({
    fullName: 'Ananya Rao',
    email: 'ananya.rao@example.in',
    phone: '+91 98490 12345',
    addressLine1: 'Villa 14, Palm Meadows, Jubilee Hills Road No. 36',
    deliveryDate: '2026-10-02',
    deliveryTimeSlot: '10:00 AM - 1:00 PM (Morning Placement)',
    roomPlacementNotes: 'Place the Fiddle Leaf Fig near the east-facing balcony glass slider. Italian marble flooring requires felt floor protector pads.',
    parkingInstructions: 'Visitor parking available near clubhouse. Inform gate security for flat 402/villa 14.',
    paymentMethod: 'invoice' // Mock payment
  });

  const [serviceConfirmed, setServiceConfirmed] = useState(true);

  const oneTimeTotal = cartItems
    .filter(item => item.type !== 'maintenance-subscription')
    .reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const recurringMonthlyTotal = cartItems
    .filter(item => item.type === 'maintenance-subscription' || item.maintenanceAddon)
    .reduce((sum, item) => {
      if (item.type === 'maintenance-subscription') return sum + (item.price * item.quantity);
      if (item.maintenanceAddon) return sum + (45 * item.quantity);
      return sum;
    }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompleteOrder({
      orderId: `VO-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: formData,
      location: userLocation,
      items: cartItems,
      oneTimeTotal,
      recurringMonthlyTotal,
      orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </button>

      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Step 3: White-Glove Scheduling
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-1">
          Delivery, On-Site Planting & Maintenance Setup
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Confirm delivery address in our active metro radius and schedule your arrival window.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Client Info & Scheduling */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Metro Verification Card */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 border border-emerald-900 shadow-md space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                    Service Area Verification
                  </div>
                  <div className="text-lg font-bold">
                    {userLocation ? `${userLocation.city}, ${userLocation.state}` : 'No Major Metro Selected'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenLocationModal}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Change Metro Hub
              </button>
            </div>

            {userLocation && (
              <div className="text-xs text-emerald-200/80 pt-2 border-t border-emerald-900/80 flex flex-wrap gap-x-6 gap-y-1">
                <span><strong>Origin Nursery:</strong> {userLocation.nurseryHub}</span>
                <span><strong>Hub Proximity:</strong> ~{userLocation.distanceMiles} miles</span>
                <span><strong>Transit:</strong> Climate-controlled biophilic van</span>
              </div>
            )}
          </div>

          {/* Recipient Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5decb] shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-800" />
              <span>Contact & Recipient</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number (For driver ETA)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address & On-Site Instructions */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5decb] shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-800" />
              <span>White-Glove Delivery Location</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Street Address & Suite / Unit</label>
                <input
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Preferred Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">White-Glove Appointment Window</label>
                  <select
                    value={formData.deliveryTimeSlot}
                    onChange={(e) => setFormData({ ...formData, deliveryTimeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option>10:00 AM - 1:00 PM (Morning Placement)</option>
                    <option>1:00 PM - 4:00 PM (Afternoon Placement)</option>
                    <option>4:00 PM - 7:00 PM (Evening Twilight)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Room Placement & Lighting Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.roomPlacementNotes}
                  onChange={(e) => setFormData({ ...formData, roomPlacementNotes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  placeholder="e.g. Master bedroom next to east window, living room corner, office reception desk..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Access & Elevator Instructions
                </label>
                <input
                  type="text"
                  value={formData.parkingInstructions}
                  onChange={(e) => setFormData({ ...formData, parkingInstructions: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  placeholder="e.g. Concierge check-in, service elevator code, gate code #1234..."
                />
              </div>
            </div>
          </div>

          {/* Contractor Review Payment Switcher */}
          <div className="bg-[#ede7da] rounded-3xl p-6 sm:p-7 border border-[#d6cbba] space-y-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-emerald-800" />
              <div>
                <h3 className="text-sm font-bold text-gray-900">Prototype Review Payment Setting</h3>
                <p className="text-xs text-gray-600">Simulate client billing or enterprise invoice billing.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-300 cursor-pointer text-xs font-bold text-gray-800">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="invoice"
                  checked={formData.paymentMethod === 'invoice'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                <span>White-Glove Net-30 Invoice</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-300 cursor-pointer text-xs font-bold text-gray-800">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                <span>Credit / Corporate Card (Mock)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Side: Order Summary & Confirmation CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5decb] shadow-sm space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-950 pb-3 border-b border-gray-100">
              Contractor Review Summary
            </h2>

            {/* Manifest List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className="text-xs text-gray-700 flex justify-between items-start gap-2 border-b border-gray-50 pb-2">
                  <div>
                    <div className="font-bold text-gray-900">{item.name || item.plant?.name} x{item.quantity}</div>
                    {item.pot && <div className="text-[11px] text-gray-500">Pairing: {item.pot.name}</div>}
                    {item.soilFormula && (
                      <div className="text-[10px] text-emerald-800">Soil: {item.soilFormula}</div>
                    )}
                  </div>
                  <div className="font-bold shrink-0">
                    {formatINR((item.unitPrice || item.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-200">
              <div className="flex justify-between">
                <span>One-Time Botanical Total:</span>
                <span className="font-bold text-gray-900">{formatINR(oneTimeTotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-800">
                <span>Custom Soil Engineering:</span>
                <span className="font-bold">INCLUDED FREE (₹0)</span>
              </div>
              <div className="flex justify-between text-emerald-800">
                <span>On-Site White-Glove Installation:</span>
                <span className="font-bold">INCLUDED FREE (₹0)</span>
              </div>
              {recurringMonthlyTotal > 0 && (
                <div className="flex justify-between text-purple-900 font-bold pt-1 border-t border-gray-100">
                  <span>Recurring Care Plan:</span>
                  <span>{formatINR(recurringMonthlyTotal)}/mo</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-300">
                <span>Total Amount:</span>
                <span className="font-heading">{formatINR(oneTimeTotal)}</span>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={serviceConfirmed}
                onChange={(e) => setServiceConfirmed(e.target.checked)}
                className="w-4 h-4 text-emerald-800 rounded mt-0.5"
              />
              <span>
                I agree to the Verdant Oasis white-glove planting protocols, scheduled access window, and botanical guarantee terms.
              </span>
            </label>

            {/* Complete Order Button */}
            <button
              type="submit"
              className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Confirm & Dispatch White-Glove Team</span>
            </button>

            <div className="text-[11px] text-gray-400 text-center">
              Frontend prototype verification. No real money or payment gateway invoked.
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
