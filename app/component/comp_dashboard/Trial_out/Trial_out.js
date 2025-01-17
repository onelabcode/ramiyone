"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { useTrialouts } from "@/app/store/TrialStore";
import usePlayerStore from "@/app/store/PlayerStore";
import useProfileStore from "@/app/store/coachAndScout";
import ScoutDetails from "../RequestScoutcomp.js/PlayerDetials/Scoutinfo";
export default function TrialOut() {

    const {fetchTrialouts,updateTrialout,deleteTrialout,trialouts} = useTrialouts();
  const { fetchScoutById } = useProfileStore();
  const { getPlayerById } = usePlayerStore();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [scoutNames, setScoutNames] = useState({});
  const [playerNames, setPlayerNames] = useState({});

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  const handleStatusUpdate = (scoutId, status) => {
    updateTrialout(scoutId, status);
  };
  const handleDelete = (scoutId) => {
    deleteTrialout(scoutId);
    setSelectedPlayer(null);
  };
  useEffect(() => {
    fetchTrialouts();
  }, [fetchTrialouts]);
  useEffect(() => {
    const fetchNames = async () => {
      const scoutMap = {};
      const playerMap = {};
      try {
        for (const request of trialouts) {
          if (!scoutMap[request.scout_id]) {
            const scout = await fetchScoutById(request.scout_id);

            scoutMap[request.scout_id] = scout?.name || "Unknown";
          }
          if (!playerMap[request.player_id]) {
            const player = await getPlayerById(request.player_id);
            playerMap[request.player_id] = player?.player_id || "Unknown";
          }
        }

        setScoutNames(scoutMap);
        setPlayerNames(playerMap);
      } catch (error) {
        console.error("Error fetching scout or player details:", error);
      }
    };

    if (trialouts.length > 0) {
      fetchNames();
    }
  }, [trialouts, fetchScoutById, getPlayerById]);

  return (
<div className="">
<div className="py-5">
          <h1 className="text-4xl font-bold">Trial Out Requests.</h1>
        </div>
<div className="flex gap-8">
      <div className="flex-1">
        <div className="overflow-y-auto max-h-[600px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                <th className="text-gray-500 p-4 border-b text-sm font-medium">
                  Scout name
                </th>
                <th className="text-gray-500 p-4 border-b text-sm font-medium">
                  Player name
                </th>
                <th className="text-gray-500 p-4 border-b text-sm font-medium">
                  Request Type
                </th>
                <th className="text-gray-500 p-4 border-b text-sm font-medium">
                  Status
                </th>
                <th className="text-gray-500 p-4 border-b text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {trialouts.length > 0 ? (
                trialouts
                  .map((request,index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedPlayer?.id === request.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() => handlePlayerSelect(request)}
                    >
                      <td className="text-sm p-4 text-gray-900">
                        {scoutNames[request.scout_id] || "Loading..."}
                      </td>
                      <td className="text-sm p-4 text-gray-900">
                        {playerNames[request.player_id] || "Loading..."}
                      </td>
                      <td className="text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}
                        >
                          Trial Out
                        </span>
                      </td>
                      <td className="text-sm p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : request.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {request.status.toLowerCase()}
                        </span>
                      </td>
                      <td className="p-4 space-x-1">
                        {request.status === "pending" ? (
                          <>
                           <div className="flex">
                           <button
                              className="text-orange-500 border border-orange-500 rounded-lg py-1 px-3 hover:bg-orange-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(request.id, "rejected");
                              }}
                            >
                              Decline
                            </button>
                            <button
                              className="text-blue-500 border border-blue-500 rounded-lg py-1 px-3 hover:bg-blue-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(request.id, "approved");
                              }}
                            >
                              Accept
                            </button>
                           </div>
                          </>
                        ) : (
                          <button
                            className="text-red-500 border border-red-500 rounded-lg py-1 px-3 hover:bg-red-50 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(request.id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-[400px]">
        <ScoutDetails scout={selectedPlayer} />
      </div>
      <Toaster position="bottom-right" theme="light" />
    </div>

</div>
  );
}
