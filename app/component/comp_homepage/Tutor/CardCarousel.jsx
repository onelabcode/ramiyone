"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


export function CardCarousel({ children, className }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback((emblaApi) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6 min-h-[400px]">
          {children}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90",
            !canScrollPrev && "opacity-50 cursor-not-allowed"
          )}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4 text-neutral-800" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90",
            !canScrollNext && "opacity-50 cursor-not-allowed"
          )}
          disabled={!canScrollNext}
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4 text-neutral-800" />
        </Button>
      </div>
    </div>
  );
}