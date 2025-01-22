"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useBrandStore } from "@/app/store/BrandsState";

export function BrandMarquee() {
  const { brands, fetchBrands, loading } = useBrandStore(); 
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-transparent to-black/[0.02] py-6">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm text-center text-muted-foreground mb-6">
        Our Trusted Partners
        </p>
      </div>
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <p className="text-center font-medium text-sm">Loading brands...</p>
        ) : (
        <div className={cn(
          "flex place-items-center space-x-10 animate-scroll-right",
          isHovered && "animation-paused"
        )}>
          {brands.map((brand, idx) => (
            <a
              key={`${brand.name}-${idx}`}
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center group relative shrink-0"
            >
              <div className="relative w-10 h-10 transition-all duration-300 group-hover:scale-110 rounded-full bg-white/5 overflow-hidden  border-2 border-gray-600">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={cn(
                    "h-full w-full object-fill",
                    "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100",
                    "transition-all duration-300"
                  )}
                />
              </div>
            </a>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}