"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import { useEffect } from "react";
import useProfileStore from "@app/store/coachAndScout";
import usePlayerStore from "@app/store/PlayerStore";
import Image from "next/image";
import Loading from "@app/component/Loading";

export default function ScoutDetails({ scout }) {
  const { fetchScoutById, singleScout } = useProfileStore();
  const { getPlayerById, singlePlayer } = usePlayerStore();
  useEffect(() => {
    if (scout) {
      fetchScoutById(scout.scout_id);
      getPlayerById(scout.player_id);
    }
  }, [fetchScoutById, scout?.scout_id, getPlayerById, scout?.player_id]);

  if (!scout) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a scout to view details
      </div>
    );
  }

  if (!singleScout || !singlePlayer) {
    return <Loading />;
  }

  const scoutDetails = [
    { label: "Club Name", value: singleScout.clubName },
    { label: "Age", value: singleScout.age },
    { label: "Address", value: singleScout.address },
    { label: "Year of experience", value: singleScout.yearsOfExperience },
    { label: "Specialization", value: singleScout.specialization },
    { label: "achievements", value: singleScout.achievements },
  ];

  const playerDetails = [
    { label: "Player Name", value: singlePlayer.player_id },
    { label: "Age", value: singlePlayer.age },
    { label: "Height", value: singlePlayer.height },
    { label: "Weight", value: singlePlayer.weight },
    { label: "Nationality", value: singlePlayer.nationality },
    { label: "Position", value: singlePlayer.position },
    { label: "Team", value: singlePlayer.team_name },
  ];

  return (
    <>
      <Card className="p-6">
        <Tabs defaultValue="scout" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="scout" className="flex-1">
              Scout information
            </TabsTrigger>
            <TabsTrigger value="player" className="flex-1">
              Player information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scout" className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <User className="w-8 h-8" />
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  Name : {singleScout.name}
                </h3>
                <p className="text-sm text-gray-500">
                  email : {singleScout.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {scoutDetails.map((detail, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{detail.label}</span>
                    <span>{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="player" className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <Image
                  src={singlePlayer.image}
                  alt={"Img"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  Name : {singlePlayer.player_id}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {playerDetails.map((detail, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{detail.label}</span>
                    <span>{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
