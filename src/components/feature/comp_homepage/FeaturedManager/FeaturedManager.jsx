import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { fetchAllClubNews } from "action/club";
import { fetchLatestFeaturedManager } from "action/manager";
import { Vibrant } from "node-vibrant/node";
import { FeaturedManagerCard } from "./featured-manager-card";

function ClubNews({ clubNews }) {
  return (
    <section className="space-y-4" aria-label="Club news section">
      <h2 className="text-[1.75rem] font-bold">Club News</h2>

      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-max"
        role="feed"
      >
        {clubNews.length > 0 ? (
          clubNews.map((news) => <NewsCard key={news.id} news={news} />)
        ) : (
          <div className="bg-primary text-white rounded-lg p-6 text-center">
            No club news available.
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ news }) {
  return (
    <Link
      href={news.link}
      className="block transition-transform hover:-translate-y-0.5"
    >
      <Card className="overflow-hidden h-full">
        <div className="flex md:flex-col items-center h-full gap-4 p-4">
          <div
            className="relative w-16 h-16 flex-shrink-0 rounded-md flex items-center justify-center"
            aria-hidden="true"
          >
            <Image
              src={news.image || "/placeholder.svg"}
              alt=""
              width={48}
              height={48}
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <div
              className="text-xs uppercase tracking-wider mb-1"
              aria-hidden="true"
            >
              Club News
            </div>
            <h3 className="font-semibold text-base line-clamp-2">
              {news.title}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default async function FeaturedManager({ activeTab }) {
  const [clubNewsRes, featuredManagerRes] = await Promise.all([
    fetchAllClubNews(),
    fetchLatestFeaturedManager(),
  ]);

  const clubNews = clubNewsRes.success ? clubNewsRes.data : [];
  const featuredManager = featuredManagerRes.success
    ? featuredManagerRes.data
    : undefined;

  let gradient =
    "linear-gradient(284.38deg, rgba(255, 0, 0, 0.75), rgba(0, 0, 255, 0.75))";

  try {
    if (featuredManager?.image) {
      const palette = await Vibrant.from(featuredManager.image).getPalette();
      if (palette.Vibrant && palette.DarkVibrant) {
        gradient = `linear-gradient(284.38deg, rgba(${palette.Vibrant.rgb.join(
          ","
        )}, 0.75), rgba(${palette.DarkVibrant.rgb.join(",")}, 0.75))`;
      }
    }
  } catch (error) {
    console.log("Error getting color palette", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 p-4 md:p-0 gap-8">
          <div
            className={`lg:col-span-3 ${
              activeTab === "featured" ? "block md:hidden" : "hidden md:block"
            }`}
          >
            <h2 className="text-2xl font-bold text-[#37003c] mb-4">
              Featured Manager
            </h2>
            {featuredManager ? (
              <FeaturedManagerCard
                manager={featuredManager}
                gradient={gradient}
              />
            ) : (
              <Card className="bg-white shadow-sm p-6 text-center text-gray-500">
                No featured manager available.
              </Card>
            )}
          </div>
          <div
            className={`lg:col-span-9 ${
              activeTab === "featured" && "hidden"
            } md:block`}
          >
            <ClubNews clubNews={clubNews} />
          </div>
        </div>
      </div>
    </div>
  );
}
