import { Button } from "@/components/ui/button";
import { processCountryName } from "@/lib/global";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

/**
 * Component to display a featured player card.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.player - The player object.
 * @param {string} props.player.id - The unique identifier for the player.
 * @param {string} props.player.player_id - The name of the player.
 * @param {string} props.player.image - The URL of the player's image.
 * @param {string} props.player.date_birth - The birth date of the player in ISO format.
 * @param {number} props.player.age - The age of the player.
 * @param {number} props.player.height - The height of the player in centimeters.
 * @param {number} props.player.weight - The weight of the player in kilograms.
 * @param {string} props.player.nationality - The nationality of the player.
 * @param {string} props.player.position - The playing position of the player.
 * @param {string} props.player.preferred_foods - The preferred foot of the player.
 * @param {string} props.player.team_name - The name of the team the player belongs to.
 * @param {string} props.player.youtube_link - The YouTube link to the player's highlights or channel.
 * @param {string} props.player.coach_perspective - The coach's perspective on the player.
 * @param {string} props.player.playing_history - The playing history of the player.
 * @param {string} props.player.created_at - The creation timestamp of the player record in ISO format.
 * @param {string} props.player.updated_at - The last update timestamp of the player record in ISO format.
 */
export function FeaturedPlayerCard({ player, gradient }) {
  return (
    <div className="relative rounded-xl">
      {/* Background */}
      <Image
        className="absolute inset-0 w-full h-full -z-10"
        alt="background"
        width={1887}
        height={892}
        src="/patterns/bg-player.svg"
      />
      {/* Image and logo */}
      <div className="flex">
        {/* Logo with some data*/}
        <div className="flex flex-col w-2/6 p-2">
          <Image
            src={"/ramiyone.png"}
            width={1200}
            height={720}
            alt="Ramiyone"
            className="object-cover bg-black/50 rounded-md mt-4"
          />

          <div className="flex flex-col">
            <span className="text-sm font-mono font-thin text-gray-500">
              Team
            </span>
            <span className="text-lg font-bold capitalize">
              {player.team_name}
            </span>
          </div>
        </div>

        {/* Image */}
        <div
          className="pt-5 px-1.5 rounded-tr-lg"
          style={{ background: gradient }}
        >
          <Image
            src={player.image}
            width={220}
            height={280}
            alt={player.team_name}
            className="object-cover"
          />
        </div>
      </div>

      {/* Player  */}
      <div className="bg-slate-100 space-y-2 p-2">
        <div className="flex flex-col">
          <span className="text-3xl font-bold capitalize">
            {player.player_id}
          </span>
          <span className="text-sm font-mono font-thin text-gray-500">
            {player.position}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src={`https://flagcdn.com/w320/${processCountryName(
                player.nationality
              )}.png`}
              alt={player.nationality}
              className="w-6 h-4 rounded shadow-sm"
              width={24}
              height={16}
            />
            <span className="font-mono text-sm">{player.nationality}</span>
          </div>
          <Button variant="link">
            <Link
              className="flex text-sm gap-2 items-center text-blue-500"
              href={`/players/${player.id}`}
            >
              <span className="hidden md:block">View Profile</span>
              <IoArrowForwardOutline />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
