import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  MapPin, 
  SunMedium, 
  Droplet, 
  ShieldCheck, 
  Heart, 
  Info,
  Clock,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { PLANTS, formatINR } from '../data/mockData';
import SafeImage from './SafeImage';

export default function PlantCatalogView({ 
  userLocation, 
  onSelectPlant, 
  onOpenLocationModal 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [onlyPetFriendly, setOnlyPetFriendly] = useState(false);

  const categories = [
    'All', 
    'Flowering & Aromatic', 
    'Medicinal & Sacred', 
    'Garden & Outdoor Landscapes',
    'Indoor Trees', 
    'Statement Foliage', 
    'Air Purifying', 
    'Low Light Champions'
  ];
  const difficulties = ['All', 'Beginner Friendly', 'Easy Care', 'Moderate'];

  const filteredPlants = PLANTS.filter(plant => {
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || plant.difficulty === selectedDifficulty;
    const matchesPet = !onlyPetFriendly || plant.petFriendly;
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesPet && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Location Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e5decb]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Botanical Archive
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-1">
            Living Architectural Plant Collection
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Carefully curated for architectural interiors, light tolerance, and long-term thriving.
          </p>
        </div>

        {/* Location Indicator Card */}
        <div 
          onClick={onOpenLocationModal}
          className="bg-[#f0eae0] hover:bg-[#e8e0d3] border border-[#d9cebc] p-3.5 rounded-2xl cursor-pointer transition-all flex items-center gap-3 self-start md:self-auto"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-950 uppercase tracking-wide">
              {userLocation ? `Location: ${userLocation.city}, ${userLocation.state}` : 'Check Delivery Radius'}
            </div>
            <div className="text-xs text-gray-600">
              {userLocation ? 'Live nursery inventory & delivery dates enabled' : 'Click to select your major metro'}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5decb] shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search plant name, scientific species, or room style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all text-gray-900"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">Care:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#fbf9f4] border border-[#ded5c5] px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>

          {/* Pet Friendly Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none bg-[#fbf9f4] border border-[#ded5c5] px-3.5 py-2 rounded-xl">
            <input
              type="checkbox"
              checked={onlyPetFriendly}
              onChange={(e) => setOnlyPetFriendly(e.target.checked)}
              className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-700"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-800">Pet Non-Toxic Only</span>
          </label>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-[#f4efe6] text-gray-700 hover:bg-[#e9e2d5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {filteredPlants.map(plant => {
          // Calculate stock in active location
          const stockInfo = userLocation && plant.nurseryStock[userLocation.id];
          const isAvailableLocally = stockInfo ? stockInfo.inStock : true;

          return (
            <div
              key={plant.id}
              onClick={() => onSelectPlant(plant)}
              className="bg-white rounded-2xl overflow-hidden border border-[#e5decb] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Plant Image & Badges */}
              <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
                <SafeImage
                  src={plant.image}
                  alt={plant.name}
                  fallbackEmoji={plant.fallbackEmoji || '🌿'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                  {plant.badge}
                </span>

                {plant.petFriendly && (
                  <span className="absolute top-3 right-3 bg-white/95 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-1">
                    🐾 Pet Safe
                  </span>
                )}

                {/* Nursery Availability Tag */}
                <div className="absolute bottom-3 left-3 right-3">
                  {userLocation ? (
                    isAvailableLocally ? (
                      <div className="bg-emerald-950/90 backdrop-blur-md text-emerald-200 text-xs px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          In Local Nursery ({stockInfo.stockCount} left)
                        </span>
                        <span className="text-[11px] text-emerald-200">{stockInfo.days.includes('Same') ? 'Same-Day' : 'Next-Day'}</span>
                      </div>
                    ) : (
                      <div className="bg-amber-950/90 backdrop-blur-md text-amber-200 text-xs px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center justify-between">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          Regional Transfer
                        </span>
                        <span className="text-[11px] text-amber-200">4-6 Days</span>
                      </div>
                    )
                  ) : (
                    <div className="bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg text-center">
                      Set city for precise delivery dates
                    </div>
                  )}
                </div>
              </div>

              {/* Plant Meta Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    {plant.scientificName}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors mt-0.5">
                    {plant.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {plant.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="my-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <SunMedium className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{plant.light}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Droplet className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{plant.water}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block font-medium">Base Plant</span>
                    <span className="text-xl font-black text-emerald-950 font-heading">
                      {formatINR(plant.price)}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlant(plant);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                  >
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-3">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No matching botanical specimens</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to browse our full living plant catalog.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setOnlyPetFriendly(false);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
