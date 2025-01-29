"use client";

import { Sparkles } from "lucide-react";
import TutorCard from "./Tutor/TutorCard";
import useTutorStore from "@/app/store/TutorState";
import { useEffect } from "react";
import { CardCarousel } from "./Tutor/CardCarousel";

export default function TutorialSection() {
  const { tutors,getTutors } = useTutorStore();

useEffect(() => {
    getTutors();
}, [tutors,getTutors])

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
            <span className="block">Catch the Latest Action</span>
            <span className="block text-blue-600">Player Highlights & News</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          Stay updated with the latest player performances and news. Watch exclusive highlights and explore the stories making waves in the sports world.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              Latest Vidoes
            </h2>
          </div>
          <div className="max-w-[1400px] mx-auto">
          <CardCarousel>
            {tutors.map((tutor) => (
              <div key={tutor.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <TutorCard {...tutor} />
              </div>
            ))}
          </CardCarousel>
        </div>
        </div>
      </div>
    </main>
  );
}