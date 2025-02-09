"use client";

import React, { useEffect, useState } from "react";
import { CreateClub } from "./playerClub/PlayerClub";
import { AddPlayerModal } from "./playerClub/Playeradd";
import usePlayerStore from "services/PlayerStore";
import { PlayerStatsModal } from "./Playerdetails/PlayerDetails";
import { cn } from "@/lib/utils";
import { EditPlayerForm } from "./Playerdetails/EditPlayer";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PlayerManager() {
  const {
    getAllPlayers,
    getTeams,
    deletePlayer,
    teamloading,
    teams,
    deleteTeam,
    players,
  } = usePlayerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);
  const [isShowStatOpen, setIsShowStatOpen] = useState(false);
  const [showStats, setShowStats] = useState(null);
  const [editPlayer, setEditPlayer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    type: null, // 'team' or 'player'
    item: null,
  });

  const handleEdit = (player) => {
    setEditPlayer(player);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirmation = (type, item) => {
    setDeleteConfirmation({
      isOpen: true,
      type,
      item,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.type === "team") {
      deleteTeam(deleteConfirmation.item.team_name);
    } else if (deleteConfirmation.type === "player") {
      deletePlayer(deleteConfirmation.item.id);
    }
    setDeleteConfirmation({ isOpen: false, type: null, item: null });
  };

  const handleClose = () => {
    setEditPlayer(null);
    setIsDialogOpen(false);
  };

  const handleStats = (player) => {
    setShowStats(player);
    setIsShowStatOpen(true);
  };

  const handleStatsClose = () => {
    setShowStats(null);
    setIsShowStatOpen(false);
  };

  useEffect(() => {
    getAllPlayers();
    getTeams();
  }, []);

  return (
    <div className="px-10 max-h-screen">
      <div className="flex justify-between items-center mb-5">
        <div className="py-5">
          <p className="text-gray-500">Overview clubs and players</p>
          <h1 className="text-4xl font-bold">Player Management</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 text-white px-8 py-4 rounded-full text-sm"
          >
            Add a Player
          </button>
          <button
            onClick={() => setIsClubOpen(true)}
            className="border border-gray-900 text-black px-8 py-4 rounded-full text-sm"
          >
            Create a Club
          </button>
        </div>
        {isClubOpen && <CreateClub onClose={() => setIsClubOpen(false)} />}
        {isModalOpen && (
          <AddPlayerModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>

      <div className="relative max-w-[1000px] overflow-x-auto py-4 px-5 rounded-lg">
        <div className="flex space-x-5">
          {teamloading ? (
            <p className="text-gray-500 text-center">Loading clubs...</p>
          ) : teams?.length > 0 ? (
            teams.map((team) => (
              <div className="relative group" key={team.id}>
                <button
                  className={`text-sm flex-shrink-0 w-[100px] h-[100px] rounded-full bg-cover bg-center text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                  style={{
                    backgroundImage: `url(${team.image})`,
                  }}
                >
                  <span className="bg-gray-500 bg-opacity-50 p-1 rounded-lg w-full">
                    {team.team_name}
                  </span>
                </button>
                <button
                  className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md hover:bg-red-600 hover:shadow-lg transform transition-all duration-300`}
                  onClick={() => handleDeleteConfirmation("team", team)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No clubs found.</p>
          )}
        </div>
      </div>

      <div className="overflow-y-auto max-h-80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Player Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Age
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Weight
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Height
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Position
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {players.length > 0 ? (
              players.map((player, index) => (
                <tr
                  key={player.id}
                  className={cn(
                    "group transition-colors hover:bg-muted/50",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  )}
                >
                  <td
                    onClick={() => handleStats(player)}
                    className="px-4 py-4 whitespace-nowrap cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        {player.player_id}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">{player.age}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">{player.weight} kg</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">{player.height} cm</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(player)}
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          handleDeleteConfirmation("player", player)
                        }
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-600">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="text-lg font-medium text-gray-700">
                      No players found.
                    </p>
                    <p className="text-sm text-gray-500">
                      It seems no players have been created yet. Add new players
                      to see them listed here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) =>
          !isOpen &&
          setDeleteConfirmation({ isOpen: false, type: null, item: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirmation.type === "team"
                ? `This will permanently delete the team "${deleteConfirmation.item?.team_name}".`
                : `This will permanently delete the player "${deleteConfirmation.item?.player_id}".`}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isShowStatOpen ? (
        <PlayerStatsModal player={showStats} onCancel={handleStatsClose} />
      ) : null}
      {isDialogOpen ? (
        <EditPlayerForm player={editPlayer} onCancel={handleClose} />
      ) : null}
      <Toaster position="bottom-right" theme="light" />
    </div>
  );
}
