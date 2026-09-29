import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Building2, 
  Truck, 
  Clock, 
  X,
  Compass
} from 'lucide-react';
import { SUPPORTED_LOCATIONS } from '../data/mockData';

export default function LocationCheckerModal({ 
  isOpen, 
  onClose, 
  userLocation, 
  onSelectLocation 
}) {
  const [searchInput, setSearchInput] = useState('');
  const [checkedResult, setCheckedResult] = useState(null);

  if (!isOpen) return null;

  const handleSearchCheck = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const query = searchInput.trim().toLowerCase();

    // Check if query matches any supported city, state, or zip code
    const found = SUPPORTED_LOCATIONS.find(loc => {
      const matchCity = loc.city.toLowerCase().includes(query);
      const matchState = loc.state.toLowerCase() === query;
      const matchZip = loc.zipCodes.some(zip => zip.includes(query));
      return matchCity || matchState || matchZip;
    });

    if (found) {
      setCheckedResult({
        supported: true,
        location: found,
        query: searchInput
      });
    } else {
      setCheckedResult({
        supported: false,
        query: searchInput,
        message: `We currently do not service "${searchInput}". White-glove planting, living soil blending, and ongoing maintenance require our climate-controlled local nursery van network, currently active in major metropolitan areas only.`
      });
    }
  };

  const handlePickCity = (loc) => {
    onSelectLocation(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#ded5c5] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Compass className="w-3.5 h-3.5" />
            <span>Metro Delivery Radius Checker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
            Check Service Availability
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Because our service includes hand-delivering live specimens, mixing organic soil on-site, and recurring technician visits, we operate exclusively out of dedicated metropolitan nursery hubs.
          </p>
        </div>

        {/* Zip or City Lookup Form */}
        <form onSubmit={handleSearchCheck} className="space-y-3 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter locality (e.g. Jubilee Hills, Gachibowli, Kondapur) or PIN (e.g. 500033)..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (checkedResult) setCheckedResult(null);
                }}
                className="w-full pl-10 pr-4 py-3 bg-[#fbf9f4] border border-[#ded5c5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 text-gray-900"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Verify
            </button>
          </div>

          <div className="text-[11px] text-gray-500">
            Try searching: <em>"Jubilee Hills"</em>, <em>"500032"</em>, <em>"Gachibowli"</em>, <em>"Kondapur"</em>, or outside areas like <em>"Warangal"</em>, <em>"Nizamabad"</em>, or an unserviced village.
          </div>
        </form>

        {/* Dynamic Verification Result */}
        {checkedResult && (
          <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
            {checkedResult.supported ? (
              <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-4.5 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Great news! We service {checkedResult.location.city}, {checkedResult.location.state}</span>
                </div>
                <div className="space-y-1 text-xs text-emerald-800/90 pl-7">
                  <div><strong>Nursery Hub:</strong> {checkedResult.location.nurseryHub}</div>
                  <div><strong>Distance:</strong> ~{checkedResult.location.distanceMiles} miles from dispatch center</div>
                  <div><strong>Service Tier:</strong> {checkedResult.location.serviceTier}</div>
                </div>
                <div className="pl-7 pt-1">
                  <button
                    onClick={() => handlePickCity(checkedResult.location)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Set as My Active Location
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border-2 border-amber-500/40 rounded-2xl p-4.5 space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>Outside Active Service Area</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed pl-7">
                  {checkedResult.message}
                </p>
                <div className="pl-7 pt-1 text-[11px] text-gray-600">
                  Tip: For contractor testing, please select one of our supported hub cities below.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Supported Major Hubs List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Supported Major Metropolitan Hubs ({SUPPORTED_LOCATIONS.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUPPORTED_LOCATIONS.map((loc) => {
              const isCurrent = userLocation?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => handlePickCity(loc)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-md'
                      : 'bg-[#fbf9f4] hover:bg-[#ede5d8] border-[#ded5c5] text-gray-800'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <MapPin className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-800'}`} />
                      <span>{loc.city}, {loc.state}</span>
                    </div>
                    <div className={`text-[11px] truncate max-w-[170px] ${isCurrent ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {loc.nurseryHub}
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {isCurrent ? 'Active' : 'Select'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contractor Disclaimer Note */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-500 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
          <span>Major cities only; outside towns and villages intentionally return the service limitation alert.</span>
        </div>

      </div>
    </div>
  );
}
