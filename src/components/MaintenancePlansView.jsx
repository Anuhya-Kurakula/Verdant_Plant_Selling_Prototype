import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Users, 
  Building2, 
  Calendar, 
  Clock, 
  Scissors, 
  Droplets, 
  RotateCcw,
  MessageSquareHeart,
  Plus
} from 'lucide-react';
import { MAINTENANCE_PLANS, formatINR } from '../data/mockData';

export default function MaintenancePlansView({ onAddPlanToCart, onNavigate }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [selectedPlanId, setSelectedPlanId] = useState('starter-checkup');
  const [addedPlanNotice, setAddedPlanNotice] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    const cost = billingCycle === 'annual' ? plan.annualPriceDiscount : plan.pricePerMonth;
    onAddPlanToCart({
      id: `plan-${plan.id}`,
      name: `${plan.name} Maintenance Plan`,
      type: 'maintenance-subscription',
      cadence: plan.cadence,
      billingCycle,
      price: cost,
      description: plan.description,
      included: plan.included,
      contractorNote: plan.contractorNote,
      quantity: 1
    });
    setAddedPlanNotice(plan.name);
    setTimeout(() => setAddedPlanNotice(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          White-Glove Botanical Stewardship
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950">
          Subscription Care & 100% Thriving Guarantee
        </h1>
        <p className="text-base text-gray-600">
          Plants are living investments. Our in-house certified horticulturists visit your space on a recurring schedule to water, clean, prune, test soil chemistry, and guarantee eternal vitality.
        </p>

        {/* Billing cycle toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="bg-[#f0eae0] p-1.5 rounded-2xl border border-[#d8cebe] inline-flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-emerald-800 text-white shadow'
                  : 'text-gray-700 hover:text-gray-950'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-emerald-800 text-white shadow'
                  : 'text-gray-700 hover:text-gray-950'
              }`}
            >
              <span>Annual Stewardship</span>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                SAVE 15%
              </span>
            </button>
          </div>
        </div>

        {addedPlanNotice && (
          <div className="bg-emerald-800 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-lg inline-block animate-bounce">
            ✓ Added "{addedPlanNotice}" to your checkout cart!
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MAINTENANCE_PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const displayPrice = billingCycle === 'annual' ? plan.annualPriceDiscount : plan.pricePerMonth;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-7 border-2 flex flex-col justify-between transition-all relative ${
                isSelected
                  ? 'border-emerald-800 shadow-xl ring-2 ring-emerald-800/20'
                  : 'border-[#e4dcce] hover:border-gray-400 shadow-sm'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-900 text-emerald-100 text-xs px-3.5 py-1 rounded-full font-bold shadow-sm whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-950">{plan.name}</h3>
                  <p className="text-xs text-emerald-700 font-semibold">{plan.subtitle}</p>
                </div>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-950 font-heading">
                      {formatINR(displayPrice)}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">/ month</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-800 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{plan.cadence}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Checklist */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    What's Included:
                  </div>
                  <ul className="space-y-2.5">
                    {plan.included.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2.5 leading-snug">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button & Contractor Service Allocation */}
              <div className="mt-8 pt-4 border-t border-gray-100 space-y-3">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-md'
                      : 'bg-[#f4efe6] text-gray-900 hover:bg-emerald-800 hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Attach {plan.name}</span>
                </button>

                {/* Contractor Transparency note */}
                <div className="bg-[#fbf9f4] p-2.5 rounded-xl border border-[#ede6d8] text-[11px] text-gray-500 font-mono">
                  <strong>Contractor SOW:</strong> {plan.contractorNote}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Services Breakdown */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e5decb] space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Certified Plant Healthcare
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            Every Visit Follows Our 6-Point Clinical Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ded5c5]">
            <Droplets className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-900">Digital Soil Hydration Audit</h4>
            <p className="text-xs text-gray-600 mt-1">
              We probe the sub-strata root level to calibrate watering schedules to season and indoor HVAC humidity.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ded5c5]">
            <Sparkles className="w-6 h-6 text-emerald-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-900">Organic Foliar Polishing</h4>
            <p className="text-xs text-gray-600 mt-1">
              Dust blocks up to 40% of photosynthetic light. We gently wipe each leaf with natural cold-pressed horticultural oils.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ded5c5]">
            <Scissors className="w-6 h-6 text-amber-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-900">Sanitized Pruning & Sculpting</h4>
            <p className="text-xs text-gray-600 mt-1">
              Precision snipping of aging foliage redirects plant energy to vigorous new shoots and architectural symmetry.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ded5c5]">
            <ShieldCheck className="w-6 h-6 text-emerald-700 mb-2" />
            <h4 className="text-sm font-bold text-gray-900">Bio-Pest Surveillance</h4>
            <p className="text-xs text-gray-600 mt-1">
              Early detection of spider mites, thrips, or fungus gnats with organic predator and botanical treatments.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ded5c5]">
            <RotateCcw className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-900">Microbial Soil Top-Dressing</h4>
            <p className="text-xs text-gray-600 mt-1">
              Periodic infusion of mycorrhizae fungi and worm casting tea to revitalize soil microbiology naturally.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-[#ded5c5]">
            <MessageSquareHeart className="w-6 h-6 text-rose-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-900">Free Replacement Warranty</h4>
            <p className="text-xs text-gray-600 mt-1">
              If any plant declines in health despite our care, our nursery replaces it with an identical or superior specimen at $0 cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
