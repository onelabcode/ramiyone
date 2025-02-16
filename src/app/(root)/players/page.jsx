import PlayersView from "@/components/player/players-view";
import { getTeams } from "action/player";

export default async function PlayersViewPage() {
  const res = await getTeams();
  return <PlayersView teams={res.success ? res.data?.teams : []} />;
}
