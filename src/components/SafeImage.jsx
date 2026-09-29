import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

export default function SafeImage({ src, alt, className, fallbackEmoji = '🌿' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100/80 via-[#f4efe6] to-emerald-200/50 text-emerald-950 p-4 text-center select-none ${className}`}>
        <span className="text-4xl sm:text-5xl mb-1 animate-pulse">{fallbackEmoji}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 line-clamp-1">
          {alt}
        </span>
        <span className="text-[9px] text-gray-500 font-medium">Verdant Living Specimen</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
