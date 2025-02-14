import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { fetchTransfers } from "action/transfer";
import { fetchTopPlayers } from "action/vote";
import ItemBody from "./item-body";
import { FeaturedPlayerCard } from "./featured-player-card";
import { Vibrant } from "node-vibrant/node";

export default async function FeaturedPlayers({ activeTab }) {
  const [transfersRes, topPlayersRes] = await Promise.all([
    fetchTransfers(),
    fetchTopPlayers(),
  ]);

  const transfers = transfersRes.success ? transfersRes.data : undefined;
  const topPlayers = topPlayersRes.success ? topPlayersRes.data : [];

  let gradient =
    "linear-gradient(284.38deg, rgba(255, 0, 0, 0.75), rgba(0, 0, 255, 0.75))";

  try {
    const palette = await Vibrant.from(topPlayers.image).getPalette();

    if (palette.Vibrant && palette.DarkVibrant) {
      gradient = `linear-gradient(284.38deg, 
          rgba(${palette.Vibrant.rgb.join(",")}, 0.75), 
          rgba(${palette.DarkVibrant.rgb.join(",")}, 0.75))`;
    }
  } catch (error) {
    console.log("Error getting color palette", error);
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[350px,2fr] gap-8">
          <div
            className={`${
              activeTab === "featured" ? "block md:hidden" : "hidden md:block"
            }`}
          >
            <h2 className="text-2xl font-bold text-purple-900 mb-6">
              Featured Player
            </h2>
            {topPlayers ? (
              <div className="px-2">
                <FeaturedPlayerCard player={topPlayers} gradient={gradient} />
              </div>
            ) : (
              <Card className="p-6 text-center text-gray-500">
                No featured player available.
              </Card>
            )}
          </div>

          {/* Latest Transfers */}
          <div className={`${activeTab === "featured" && "hidden"} md:block`}>
            <h2 className="text-2xl font-bold text-purple-900 mb-6">
              Transfer News
            </h2>
            <LatestTransfers transfers={transfers} />
          </div>
        </div>
      </div>
    </main>
  );
}

function TransferCard({ news }) {
  return (
    <div className="block md:hidden transition-transform hover:-translate-y-0.5">
      <Card className="overflow-hidden h-full">
        <div className="flex md:flex-col items-center h-full gap-4 p-4">
          <div
            className="relative w-32 h-32 flex-shrink-0 rounded-md flex items-center justify-center"
            aria-hidden="true"
          >
            <Image
              src={news.image || "/placeholder.svg"}
              alt=""
              width={280}
              height={280}
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <div
              className="text-xs uppercase tracking-wider mb-1"
              aria-hidden="true"
            >
              Transfer
            </div>
            <h3 className="font-semibold text-base line-clamp-2">
              {news.title}
            </h3>
          </div>
        </div>
      </Card>
    </div>
  );
}

function LatestTransfers({ transfers }) {
  return (
    <div className="space-y-6">
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
        <div className="relative">
          <div className="grid grid-cols-3 gap-4 auto-rows-max h-[900px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent hover:scrollbar-thumb-purple-300 pb-8">
            {transfers && transfers.length > 0 ? (
              transfers.map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 text-purple-900 px-3 py-1.5 rounded-md text-sm font-medium">
                        Transfers
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <h3 className="font-semibold text-purple-900 text-xl line-clamp-2 hover:text-purple-700 cursor-pointer">
                      {item.title}
                    </h3>
                    <ItemBody
                      className="text-sm text-gray-600 line-clamp-2 prose prose-sm"
                      body={item.body}
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={item.created_at}>
                        {format(new Date(item.created_at), "MMM d, h:mm a")}
                      </time>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Card className="p-6 text-center text-gray-500 col-span-3">
                No transfer news available.
              </Card>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <ScrollArea className="h-[900px] w-full rounded-md">
          <div className="space-y-4 pr-4">
            {transfers && transfers.length > 0 ? (
              transfers.map((item, i) => <TransferCard key={i} news={item} />)
            ) : (
              <Card className="p-6 text-center text-gray-500">
                No transfer news available.
              </Card>
            )}
          </div>
          <ScrollBar />
          <div className="absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </ScrollArea>
      </div>
    </div>
  );
}
