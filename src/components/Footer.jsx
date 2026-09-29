import React from 'react';
import { Sprout, ShieldCheck, MapPin, Heart, Mail, ArrowUpRight } from 'lucide-react';
import { SUPPORTED_LOCATIONS } from '../data/mockData';

export default function Footer({ onNavigate, onOpenLocationModal }) {
  return (
    <footer className="bg-[#102213] text-emerald-100/80 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-2xl font-black font-heading text-white tracking-tight">
                VERDANT OASIS
              </span>
            </div>

            <p className="text-sm text-emerald-200/70 max-w-sm leading-relaxed">
              We bridge architectural botanical curation with certified living plant stewardship. Customers choose the plant and handcrafted pot; our team crafts the living soil, delivers in climate-controlled vans, plants on-site, and maintains lifetime vitality.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Plant Lifetime Warranty with Active Care Subscriptions</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Living Botanicals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pots')} className="hover:text-white transition-colors cursor-pointer">
                  Artisanal Pots
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-white transition-colors cursor-pointer">
                  Care Subscriptions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cart')} className="hover:text-white transition-colors cursor-pointer">
                  Order Manifest
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Hubs */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Major Metro Hubs
              </h4>
              <button 
                onClick={onOpenLocationModal} 
                className="text-xs text-emerald-400 hover:text-white underline cursor-pointer"
              >
                Verify
              </button>
            </div>
            <ul className="space-y-1.5 text-xs">
              {SUPPORTED_LOCATIONS.map(loc => (
                <li key={loc.id} className="flex items-center gap-1.5 text-emerald-200/80">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{loc.city}, {loc.state} ({loc.nurseryHub.split(' ')[0]})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contractor Review Notice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Contractor Note</h4>
            <div className="bg-emerald-950/80 p-3.5 rounded-xl border border-emerald-800/60 text-[11px] space-y-1.5 text-emerald-200/90">
              <div><strong>Status:</strong> Functional Prototype</div>
              <div><strong>Prices & Specs:</strong> Fully editable mock data in <code className="text-emerald-300">mockData.js</code></div>
              <div><strong>Delivery Logic:</strong> Metro availability & nursery distance reactive.</div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/60">
          <div>
            © {new Date().getFullYear()} Verdant Oasis Living Co. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Prototype Version 1.0</span>
            <span>•</span>
            <span>React 19 + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
