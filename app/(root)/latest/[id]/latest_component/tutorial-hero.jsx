"use client";

import { PlayCircle, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TutorialHero({currentTutor }) {
  return (
    <div className="relative h-[500px] group cursor-pointer">
      <Link 
        href={currentTutor.video}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Image
          src={currentTutor.thumbnail}
          alt={currentTutor.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <div className="bg-red-600 rounded-2xl px-6 py-3 flex items-center gap-2 text-white font-medium shadow-xl">
            <PlayCircle className="h-6 w-6" />
            Watch on YouTube
          </div>
        </div>
      </Link>
    </div>
  );
}