"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsCarousel({ children, className }) {
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
        <div className="flex gap-6">{children}</div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg",
            !canScrollPrev && "opacity-50 cursor-not-allowed"
          )}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg",
            !canScrollNext && "opacity-50 cursor-not-allowed"
          )}
          disabled={!canScrollNext}
          onClick={scrollNext}
        >
          <ChevronRight className="h-5 w-5 text-gray-800" />
        </Button>
      </div>
    </div>
  );
}
