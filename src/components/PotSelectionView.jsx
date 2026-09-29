import React, { useState } from 'react';
import { POTS, PLANTS, formatINR } from '../data/mockData';
import { Check, Sparkles, ArrowRight, ShieldCheck, Droplet, Sprout } from 'lucide-react';
import SafeImage from './SafeImage';

export default function PotSelectionView({ onSelectPlant, onNavigate }) {
  const [selectedPot, setSelectedPot] = useState(POTS[0]);
  const [recommendedPlant, setRecommendedPlant] = useState(PLANTS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Handcrafted Vessels & Garden Bedding
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950">
          Artisanal Pots & Direct Garden Soil Planting
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Whether you prefer architectural indoor ceramic planters, sacred traditional brass urlis, or having our horticulturists trench and plant directly in your outdoor garden soil, we handle every detail.
        </p>
      </div>

      {/* Pots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {POTS.map((pot) => {
          const isSelected = selectedPot.id === pot.id;
          const isGarden = pot.isGardenGround;

          return (
            <div
              key={pot.id}
              onClick={() => setSelectedPot(pot)}
              className={`bg-white rounded-3xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? isGarden ? 'border-emerald-700 shadow-xl ring-2 ring-emerald-600/30' : 'border-emerald-800 shadow-xl ring-2 ring-emerald-800/20' 
                  : isGarden ? 'border-emerald-300 bg-emerald-50/20 hover:border-emerald-500' : 'border-[#e2dac9] hover:border-gray-400 shadow-sm'
              }`}
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <SafeImage
                    src={pot.image}
                    alt={pot.name}
                    fallbackEmoji={isGarden ? '🏡' : '🏺'}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {pot.tag}
                  </span>
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-emerald-800 text-white p-1 rounded-full shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900 leading-snug">{pot.name}</h3>
                    <span className="text-lg font-black text-emerald-900 shrink-0 font-heading">
                      {formatINR(pot.price)}
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1 border-t border-gray-100 pt-3">
                    <div><strong>Material:</strong> {pot.material}</div>
                    <div><strong>Finish:</strong> {pot.finish}</div>
                    <div><strong>Dimensions:</strong> {pot.dimensions}</div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-1.5 pt-2 border-t border-gray-100">
                    {pot.features.map((feat, idx) => (
                      <li key={idx} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {isSelected ? 'Selected Vessel' : 'Choose This Vessel'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Pairing Demo */}
      <div className="bg-[#ede7da] rounded-3xl p-6 sm:p-10 border border-[#d8cdbc]">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Interactive Pairing Showcase
            </span>
            <h3 className="text-2xl font-bold text-gray-950">
              Ready to pair the "{selectedPot.name}" with a living plant?
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              When you choose this vessel in the plant configurator, our nursery botanists will customize the living soil mix to match the porosity of the <strong>{selectedPot.material}</strong>.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Browse Compatible Plants</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
