"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "./RequestComp/DashboardHeader";
import { StatusTabs } from "./RequestComp/status_bar";
import { PlayerTable } from "./RequestComp/PlayerTable";
import { ScoutDialog } from "./RequestComp/scout_dialog";
import useFindPlayerStore from "@/app/store/userFindPlayer";
import Loading from "../../Loading";
import { Toaster } from "sonner";



export default function PlayerRequests() {
const {fetchPlayerRequests,playerRequests}= useFindPlayerStore();
const [selectedScout, setSelectedScout] = useState(null);
const [activeTab, setActiveTab] = useState("all");
useEffect(() => {
fetchPlayerRequests();
}, [])

if(!playerRequests){
  return <Loading/>
}
 

  const filteredRequests = activeTab === "all" 
    ? playerRequests 
    : playerRequests.filter(request => request.status === activeTab);

  return (
    <div className="container mx-auto py-10 space-y-8">
      <DashboardHeader requestCount={playerRequests.length} />
      <StatusTabs activeTab={activeTab} onChange={setActiveTab} />
      <div className="mt-4">
        <PlayerTable 
          requests={filteredRequests} 
          onScoutClick={setSelectedScout} 
        />
      </div>
      {selectedScout && (
        <ScoutDialog
          scout={selectedScout}
          open={!!selectedScout}
          onOpenChange={() => setSelectedScout(null)}
        />
      )}
        <Toaster position="bottom-right" theme="light" />
    </div>
  );
}