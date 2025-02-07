"use client";

import { useState, useMemo, useEffect } from "react";
import { PlayerTable } from "./ApproveComp/Player_table";
import { StatusFilter } from "./ApproveComp/status-filter";
import usePlayerSuggestionsStore from "@app/store/useSuggest";
import { Toaster } from "sonner";

export default function PlayerApprove() {
  const {
    fetchPlayerSuggestions,
    playerSuggestions,
    updatePlayerSuggestionStatus,
    deletePlayerSuggestion,
  } = usePlayerSuggestionsStore();
  const [statusFilter, setStatusFilter] = useState("all");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayerSuggestions();
  }, []);

  useEffect(() => {
    if (playerSuggestions) {
      setPlayers(playerSuggestions || []);
    }
  }, [playerSuggestions]);

  const filteredPlayers = useMemo(() => {
    return statusFilter === "all"
      ? players
      : players.filter((player) => player.status === statusFilter);
  }, [players, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts = players.reduce(
      (acc, player) => {
        acc[player.status]++;
        acc.all++;
        return acc;
      },
      { all: 0, pending: 0, approved: 0, declined: 0 }
    );
    return counts;
  }, [players]);
  const handleStatusChange = async (playerId, newStatus) => {
    await updatePlayerSuggestionStatus(playerId, newStatus);
    setPlayers(
      players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              status: newStatus,
            }
          : player
      )
    );
  };

  const handleDelete = async (playerId) => {
    await deletePlayerSuggestion(playerId);
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  return (
    <main className="container py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Player Suggestions Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and review player suggestions from coaches
          </p>
        </div>

        <StatusFilter
          currentStatus={statusFilter}
          onStatusChange={setStatusFilter}
          counts={statusCounts}
        />

        <PlayerTable
          players={filteredPlayers}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />

        {filteredPlayers.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No players found with status: {statusFilter}
          </div>
        )}
      </div>
      <Toaster position="bottom-right" theme="light" />
    </main>
  );
}
