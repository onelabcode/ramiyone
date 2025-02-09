"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fetchBrands } from "action/brand";

function SponsorItem({ sponsor }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Link
        href={sponsor.website}
        className="group relative flex items-center justify-center w-32 h-20 transition-opacity hover:opacity-80"
      >
        <Image
          src={sponsor.logo || "/placeholder.svg"}
          alt={`${sponsor.name} logo`}
          fill
          className="object-contain"
        />
      </Link>
      <span className="text-sm text-center text-gray-600">{sponsor.name}</span>
    </div>
  );
}

export function SponsorCarousel() {
  const [brands, setBrands] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [
      AutoPlay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function loadBrands() {
      const brandsRes = await fetchBrands();
      if (brandsRes.success) {
        setBrands(brandsRes.data);
      }
    }
    loadBrands();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <p className="text-lg text-center text-muted-foreground mb-6">
              Our Trusted Sponsors
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {brands.map((sponsor, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex min-w-[200px] flex-[0_0_50%] items-center justify-center px-6",
                    "sm:min-w-[250px] sm:flex-[0_0_33.33%]",
                    "md:min-w-[300px] md:flex-[0_0_25%]",
                    "lg:min-w-[350px] lg:flex-[0_0_20%]"
                  )}
                >
                  <SponsorItem sponsor={sponsor} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {brands.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  selectedIndex === index
                    ? "bg-primary w-4"
                    : "bg-gray-200 hover:bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
