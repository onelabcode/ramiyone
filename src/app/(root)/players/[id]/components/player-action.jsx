"use client";

import { User, Calendar, ChevronDown, Users } from "lucide-react";
import { Button } from "@components/ui/button";
import useAuthStore from "services/AuthState";
import Loading from "@components/feature/Loading";
import { useRequests } from "services/RequestState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useTrialouts } from "services/TrialStore";

export function PlayerActions({ SinglePlayerId }) {
  const { user } = useAuthStore();
  const { createRequests } = useRequests();
  const { createTrialout } = useTrialouts();
  const handleDetailsRequest = (player_id, scout_id, request_type) => {
    const requestObject = {
      player_id,
      scout_id,
      request_type,
    };
    createRequests(requestObject);
  };

  const handleMatchRequest = (player_id, scout_id, request_type) => {
    const requestObject = {
      player_id,
      scout_id,
      request_type,
    };
    createRequests(requestObject);
  };
  const handleTrial = (player_id, scout_id) => {
    const requestObject = {
      player_id,
      scout_id,
    };
    createTrialout(requestObject);
  };
  return (
    <>
      {user ? (
        <div className="flex gap-4 mt-8 max-sm:flex-col">
          <Button
            size="lg"
            className="sm:flex-1"
            onClick={() =>
              handleDetailsRequest(SinglePlayerId, user.user_id, "details")
            }
          >
            <User className="mr-2 h-5 w-5" />
            Request Details
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="sm:flex-1"
            onClick={() =>
              handleMatchRequest(SinglePlayerId, user.user_id, "match")
            }
          >
            <Calendar className="mr-2 h-5 w-5" />
            Arrange Match
          </Button>
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="px-8">
                  Try a Trial Out <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[200px]">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleTrial(SinglePlayerId, user.user_id)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>14 Days Trial</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
