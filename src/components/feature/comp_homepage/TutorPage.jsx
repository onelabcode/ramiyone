import { Sparkles } from "lucide-react";
import TutorCard from "./Tutor/TutorCard";
import { CardCarousel } from "./Tutor/CardCarousel";
import { getTutors } from "action/tutor";

export default async function TutorialSection() {
  let tutors = [];
  const res = await getTutors();
  if (res.success) {
    tutors = res.data;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            Latest Vidoes
          </h2>
        </div>
        <div className="max-w-[1400px] mx-auto">
          <CardCarousel>
            {tutors?.map((tutor) => (
              <div
                key={tutor.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <TutorCard {...tutor} />
              </div>
            ))}
          </CardCarousel>
        </div>
      </div>
    </div>
  );
}
