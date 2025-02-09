import Image from "next/image";

import { Toaster } from "sonner";
import { ChevronRight, Trophy, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TextTypeAnime } from "./text-type-anime";
import { getTeams } from "action/player";
import TutorialSection from "../TutorPage";
import { FeaturedSection } from "../Blogsection";
import FeaturedPlayers from "../featuredPlayers/FeaturedPlayers";
import FeaturedManager from "../FeaturedManager/FeaturedManager";
import { SponsorCarousel } from "../BrandFooter/sponsor-carousel";

const Frontpage = async () => {
  let teams = [];
  const res = await getTeams();
  if (res.success) {
    teams = res.data.teams;
  }

  return (
    <>
      <div className="relative flex overflow-hidden py-3">
        <div className="flex min-w-full items-center justify-center animate-scroll-right">
          {teams && teams.length > 0
            ? teams.map((logo, idx) => (
                <div className="flex items-center gap-3 px-4 group" key={idx}>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600">
                    <Image
                      src={logo.image}
                      alt={"Team Logo"}
                      fill
                      className="object-cover"
                      sizes="35px"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                    {logo.team_name}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="relative min-h-screen bg-white px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-100px)]">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-5xl sm:text-6xl md:text-[109px] font-extrabold tracking-tight text-gray-900">
                  RAMIYONE
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-purple-600 mt-2">
                    DIGITAL SCOUTING
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                  Discover the next generation of football talent with our{" "}
                  <TextTypeAnime />
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <Link href="/players">
                    <Button className="px-6 py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-md rounded-lg transition-transform transform hover:scale-105">
                      Start Scouting
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-4 rounded-lg shadow-lg border border-gray-200">
                  <CardHeader>
                    <Trophy className="w-8 h-8 text-blue-500" />
                    <CardTitle className="text-lg font-semibold mt-4">
                      Elite Talent Pool
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    Access to a curated database of promising young football
                    talents.
                  </CardContent>
                </Card>

                <Card className="p-4 rounded-lg shadow-lg border border-gray-200">
                  <CardHeader>
                    <Star className="w-8 h-8 text-green-500" />
                    <CardTitle className="text-lg font-semibold mt-4">
                      Advanced Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    In-depth performance metrics to enhance decision-making.
                  </CardContent>
                </Card>

                <Card className="p-4 rounded-lg shadow-lg border border-gray-200">
                  <CardHeader>
                    <Users className="w-8 h-8 text-purple-500" />
                    <CardTitle className="text-lg font-semibold mt-4">
                      Scout Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    Collaborate with scouts for expert recommendations.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TutorialSection />
      <FeaturedSection />
      <FeaturedPlayers />

      <FeaturedManager />
      <SponsorCarousel />
      {/* <VotePage /> */}

      <Toaster position="bottom-right" theme="light" />
    </>
  );
};

export default Frontpage;
