"use client";

import { Calendar } from "lucide-react";

import useTutorStore from "services/TutorState";
import Loading from "@components/feature/Loading";
import { RecommendedTutorials } from "./latest_component/RecommendedTutorials";
import { TutorialHero } from "./latest_component/tutorial-hero";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { format } from "date-fns";

export default function Home() {
  const { getTutorById, getFeaturedTutors, currentTutor, featuredTutors } =
    useTutorStore();
  const { id } = useParams();
  useEffect(() => {
    getTutorById(id);
    getFeaturedTutors();
  }, []);

  const filteredFeaturedTutors = featuredTutors.filter(
    (tutor) => tutor.id !== id
  );

  return (
    <>
      {currentTutor && featuredTutors ? (
        <div className="min-h-screen bg-gray-50">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <TutorialHero currentTutor={currentTutor} />
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={currentTutor.created_at}>
                    {format(new Date(currentTutor.created_at), "MMM d, h:mm a")}
                  </time>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {currentTutor.title}
                </h1>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentTutor.body }}
                />
              </div>
            </article>

            <RecommendedTutorials posts={filteredFeaturedTutors} />
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
