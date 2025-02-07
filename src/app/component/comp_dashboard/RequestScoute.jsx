"use client";

import { useState } from "react";
import Authorization from "./RequestScoutcomp.js/Authorization";
import PlayerDetail from "./RequestScoutcomp.js/PlayerDetials/Playerdetail";
import ArrangeMatch from "./RequestScoutcomp.js/ArrrangeMatch/ArrangeMatch";

export default function ScoutRequests() {
  const [activeTab, setActiveTab] = useState('player-details');
  
  const tabs = [
    { id: 'player-details', label: "Player detailrequest" },
    { id: 'arrange-match', label: "Arrange match" },
    { id: 'authorization', label: "Authorization" }
  ] ;

  return (
    <div className="px-10 max-h-screen">
      <div className="py-5">
        <p className="text-gray-500">Overview clubs and player</p>
        <h1 className="text-4xl font-bold">Request from scouts</h1>
      </div>

      <div className="flex gap-7">
        <div className="flex-1">
          <div className="flex bg-gray-100 rounded-full shadow-sm p-1 my-3 space-x-3 w-1/2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-center py-4 rounded-full ${
                  activeTab === tab.id ? "bg-white" : ""
                } font-medium text-gray-700 text-sm transition-colors`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'player-details' && <PlayerDetail />}
          {activeTab === 'arrange-match' && <ArrangeMatch/>}
          {activeTab === 'authorization' && <Authorization/>}
        </div>
      </div>
    
    </div>
  );
}