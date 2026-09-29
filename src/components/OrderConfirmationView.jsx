import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Download,
  Share2,
  Sprout
} from 'lucide-react';
import { formatINR } from '../data/mockData';
import SafeImage from './SafeImage';

export default function OrderConfirmationView({ 
  orderData, 
  onNavigateHome, 
  onBrowseMore 
}) {
  if (!orderData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">No active order details found.</p>
        <button 
          onClick={onNavigateHome}
          className="mt-4 px-6 py-2.5 bg-emerald-800 text-white rounded-xl text-sm font-semibold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const { orderId, customer, location, items, oneTimeTotal, recurringMonthlyTotal, orderDate } = orderData;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Success Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9 text-emerald-300" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/60 px-3.5 py-1 rounded-full border border-emerald-700/50 inline-block">
          Order Confirmed & Scheduled
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Your Living Sanctuary is Being Prepared
        </h1>

        <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
          Order <strong>#{orderId}</strong> has been logged in our dispatch database. Our master botanists will freshly formulate living organic soil the morning of arrival.
        </p>

        <div className="pt-2 text-xs text-emerald-300/80 font-mono">
          Scheduled Delivery Date: <strong>{customer.deliveryDate}</strong> ({customer.deliveryTimeSlot})
        </div>
      </div>

      {/* Appointment & Nursery Hub Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Nursery & Transit Info */}
        <div className="bg-white rounded-3xl p-6 border border-[#e5decb] shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm">
            <Truck className="w-4 h-4 text-emerald-800" />
            <span>Assigned Nursery Dispatch Center</span>
          </div>

          <div className="bg-[#fbf9f4] p-4 rounded-2xl border border-[#ded5c5] space-y-1.5 text-xs text-gray-700">
            <div><strong>Nursery Facility:</strong> {location?.nurseryHub || 'Regional Metropolitan Flora Hub'}</div>
            <div><strong>Destination City:</strong> {location?.city || 'Selected Metro'}, {location?.state}</div>
            <div><strong>Transit Method:</strong> Temp-controlled biophilic courier van</div>
            <div><strong>Lead Horticulturist:</strong> Assigned 24h prior to appointment</div>
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Driver will SMS 30 minutes before arrival</span>
          </div>
        </div>

        {/* In-Home Planting Checklist */}
        <div className="bg-white rounded-3xl p-6 border border-[#e5decb] shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-800" />
            <span>White-Glove Protocol On-Site</span>
          </div>

          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
              <span>Protective canvas drop-cloths laid over flooring / lawn edges</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
              <span>Custom organic soil blend potted directly or trenched into garden beds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
              <span>Placement: "{customer.roomPlacementNotes || 'Client chosen space'}"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
              <span>Leaf polishing, organic fertilization, and first clinical watering performed</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Manifest Items List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5decb] shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-950 pb-3 border-b border-gray-100">
          Order Manifest Details
        </h2>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  <SafeImage
                    src={item.plant?.image || 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=200&q=80'}
                    alt={item.name || item.plant?.name}
                    fallbackEmoji={item.plant?.fallbackEmoji || '🌿'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {item.name || item.plant?.name} (Qty: {item.quantity})
                  </div>
                  {item.pot && (
                    <div className="text-xs text-gray-500">
                      {item.isGardenGround ? 'Garden Bedding:' : 'Paired Vessel:'} {item.pot.name}
                    </div>
                  )}
                  {item.soilFormula && (
                    <div className="text-[11px] text-emerald-800">Soil Mixture: {item.soilFormula}</div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {formatINR((item.unitPrice || item.price) * item.quantity)}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold">Potted On-Site</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-gray-200 space-y-2 text-xs sm:text-sm text-gray-600">
          <div className="flex justify-between">
            <span>One-Time Total:</span>
            <span className="font-bold text-gray-900">{formatINR(oneTimeTotal)}</span>
          </div>
          {recurringMonthlyTotal > 0 && (
            <div className="flex justify-between text-purple-900 font-bold">
              <span>Ongoing Care Plan (Billed Monthly):</span>
              <span>{formatINR(recurringMonthlyTotal)}/mo</span>
            </div>
          )}
          <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-200">
            <span>Amount Paid (Mock Review):</span>
            <span className="font-heading">{formatINR(oneTimeTotal)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
        >
          Return to Verdant Home
        </button>
        <button
          onClick={onBrowseMore}
          className="w-full sm:w-auto px-6 py-3.5 bg-cream-soft hover:bg-[#ede5d8] text-gray-900 font-bold text-sm rounded-xl border border-[#ded5c5] transition-all cursor-pointer"
        >
          Explore More Living Botanicals
        </button>
      </div>

      {/* Prototype Footer Note */}
      <div className="text-center text-xs text-gray-400">
        Contractor Prototype Review Mode • Verification Complete
      </div>
    </div>
  );
}
