"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Badge, Calendar, ChevronRight } from "lucide-react";
import { useTransferNewStore } from "@/app/store/TransferState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import useTopPlayersStore from "@/app/store/VoteState";

const featuredPlayer = {
  player_id: "EH9",
  image: "/biruk.png",
  name: "Erling Haaland",
  date_birth: "2000-07-21",
  age: 23,
  height: "195cm",
  weight: "88kg",
  nationality: "Norway",
  position: "Forward",
  preferred_foods: "Lasagna, Chicken, Fish",
  team_name: "Manchester City",
  team_logo: "/biruk.png",
  youtube_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  coach_perspective:
    "Exceptional striker with incredible positioning and finishing ability",
  playing_history:
    "Red Bull Salzburg (2019-20), Borussia Dortmund (2020-22), Manchester City (2022-present)",
};

export default function Home() {
  const { fetchTransfers, transfers } = useTransferNewStore();

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);


  const { topPlayers, fetchTopPlayers,loading } = useTopPlayersStore();

useEffect(() => {
  fetchTopPlayers();
}, []);

if (loading) {
  return <div>Loading...</div>;
}
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[350px,2fr] gap-8">
        
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-6">
              Featured Player
            </h2>
            {topPlayers ? (
              <FeaturedPlayerCard player={topPlayers} />
            ) : (
              <Card className="p-6 text-center text-gray-500">
                No featured player available.
              </Card>
            )}
          </div>

          {/* Latest Transfers */}
          <div>
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

function FeaturedPlayerCard({ player }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[300px] bg-gradient-to-br from-blue-400 to-purple-500">
        <Image
          src={player.image || "/placeholder.svg"}
          alt={player.player_id}
          fill
          className="object-contain"
        />
        {/* <div className="absolute top-4 left-4">
          <Image
            src={player.team_ || "/placeholder.svg"}
            alt={player.team_name}
            width={60}
            height={60}
            className="bg-white rounded-full p-1"
          />
        </div> */}
      </div>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-purple-900">
          {player.player_id}
        </CardTitle>
        <Badge variant="secondary" className="text-sm">
          {player.position}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
          {[
            { label: "Date of Birth", value: {format(new Date(player.date_birth), 'MMM d, h:mm a')} },
            { label: "Age", value: player.age },
            { label: "Height", value: player.height },
            { label: "Weight", value: player.weight },
            { label: "Nationality", value: player.nationality },
            { label: "Team", value: player.team_name },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-gray-500 mb-1">{item.label}</p>
              <p className="font-medium text-purple-900">{item.value}</p>
            </div>
          ))}
        </div>

        {[
          { label: "Preferred Foods", value: player.preferred_foods },
          { label: "Coach's Perspective", value: player.coach_perspective },
          { label: "Playing History", value: player.playing_history },
        ].map((item) => (
          <div key={item.label} className="mb-4">
            <p className="text-gray-500 mb-1">{item.label}</p>
            <p className="text-sm text-purple-900">{item.value}</p>
          </div>
        ))}

        <Button variant="outline" asChild className="mt-4">
          <a
            href={player.youtube_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Highlights
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
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
                    <div
                      className="text-sm text-gray-600 line-clamp-2 prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: item.body }}
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
              transfers.map((item, i) => (
                <Card
                  key={i}
                  className="overflow-hidden hover:shadow-md transition-all duration-300 hover:translate-x-1 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="inline-block px-2 py-1 bg-purple-100 text-purple-900 text-xs font-medium rounded-full mb-2">
                          Transfers
                        </div>
                        <h3 className="text-white font-semibold text-lg line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-3 bg-white">
                      <div
                        className="text-sm text-gray-600 line-clamp-2 prose prose-sm"
                        dangerouslySetInnerHTML={{ __html: item.body }}
                      />
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={item.created_at} className="text-xs">
                          {format(new Date(item.created_at), "MMM d, h:mm a")}
                        </time>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
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