import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { fetchAllClubNews } from "action/club";
import { fetchLatestFeaturedManager } from "action/manager";

export default async function FeaturedManager() {
  const [clubNewsRes, featuredManagerRes] = await Promise.all([
    fetchAllClubNews(),
    fetchLatestFeaturedManager(),
  ]);

  const clubNews = clubNewsRes.success ? clubNewsRes.data : [];
  const featuredManager = featuredManagerRes.success
    ? featuredManagerRes.data
    : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-[1.75rem] font-bold text-[#37003c] mb-4">
              Featured Manager
            </h2>
            {featuredManager ? (
              <Card className="bg-white shadow-sm overflow-hidden">
                <div className="relative bg-gradient-to-br from-white to-gray-100">
                  <div className="pt-16 px-4">
                    <div className="grid grid-cols-1 gap-y-2 text-[#37003c]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Academy Size</span>
                        <span className="font-bold">
                          {featuredManager.academy_size}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Scouted Players</span>
                        <span className="font-bold">
                          {featuredManager.scouted_players}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pro Promotions</span>
                        <span className="font-bold">
                          {featuredManager.pro_player_promotions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Certifications</span>
                        <span className="font-bold">
                          {featuredManager.certifications}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Focus Areas</span>
                        <span className="font-bold">
                          {featuredManager.focus_areas}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Digital Scouting</span>
                        <span className="font-bold">
                          {featuredManager.digital_scouting_participation}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <Image
                      src={featuredManager.image}
                      alt="Manager"
                      width={400}
                      height={300}
                      className="w-full h-[300px] object-cover object-center"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-2xl font-bold text-[#37003c] mb-2">
                      {featuredManager.name}
                    </h3>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white shadow-sm p-6 text-center text-gray-500">
                No featured manager available.
              </Card>
            )}
          </div>

          <div className="lg:col-span-9">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[1.75rem] font-bold text-[#37003c]">
                  Club News
                </h2>
              </div>
              {clubNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[calc(3*280px)] md:max-h-[calc(3*210px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                  {clubNews.map((news) => (
                    <Link
                      key={news.id}
                      href={news.link}
                      className="block group"
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                        <div
                          className={`aspect-[1.91/1] relative flex items-center justify-center`}
                        >
                          <div className="absolute inset-0"></div>
                          <Image
                            src={news.image}
                            alt="Club Logo"
                            fill
                            className="w-20 h-20 object-contain relative z-10"
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-xs uppercase tracking-wider text-gray-600 mb-2">
                            Club News
                          </div>
                          <h3 className="font-semibold text-[#37003c] text-sm line-clamp-2 group-hover:text-purple-700 transition-colors hover:underline">
                            {news.title}
                          </h3>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="bg-white shadow-sm p-6 text-center text-gray-500">
                  No club news available.
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
