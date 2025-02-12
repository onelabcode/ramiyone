import Image from "next/image";

/**
 * Component to display a featured manager card.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.manager - The manager data.
 * @param {string} props.manager.id - The manager's unique identifier.
 * @param {string} props.manager.name - The manager's name.
 * @param {string} props.manager.image - The URL of the manager's image.
 * @param {number} props.manager.academy_size - The size of the manager's academy.
 * @param {number} props.manager.scouted_players - The number of players scouted by the manager.
 * @param {number} props.manager.pro_player_promotions - The number of professional player promotions by the manager.
 * @param {string} props.manager.certifications - The manager's certifications.
 * @param {string} props.manager.focus_areas - The manager's focus areas.
 * @param {number} props.manager.digital_scouting_participation - The manager's digital scouting participation.
 * @param {number} props.manager.is_featured - Indicates if the manager is featured.
 * @param {string} props.manager.created_at - The date when the manager was created.
 * @param {string} props.gradient - The gradient background style.
 */
export function FeaturedManagerCard({ manager, gradient }) {
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
        <div className="flex flex-col w-2/6 gap-2 p-2">
          <Image
            src={"/ramiyone.png"}
            width={1200}
            height={720}
            alt="Ramiyone"
            className="object-cover bg-black/50 rounded-md mt-4"
          />

          <div className="flex flex-col">
            <span className="text-sm font-mono font-thin text-gray-500">
              Academy size
            </span>
            <span className="text-lg font-bold capitalize">
              {manager.academy_size}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-mono font-thin text-gray-500">
              Digital Scouting
            </span>
            <span className="text-lg font-bold capitalize">
              {manager.academy_size}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-mono font-thin text-gray-500">
              Player Promotions
            </span>
            <span className="text-lg font-bold capitalize">
              {manager.pro_player_promotions}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-mono font-thin text-gray-500">
              Scouted Players
            </span>
            <span className="text-lg font-bold capitalize">
              {manager.scouted_players}
            </span>
          </div>
        </div>

        {/* Image */}
        <div
          className="flex flex-col justify-end pt-5 px-1.5 rounded-tr-lg"
          style={{ background: gradient }}
        >
          <Image
            src={manager.image}
            width={220}
            height={280}
            alt={manager.name}
            className="object-cover"
          />
        </div>
      </div>

      {/* Player  */}
      <div className="bg-slate-100 space-y-2 p-2">
        <div className="flex flex-col">
          <span className="text-3xl font-bold capitalize">{manager.name}</span>
          <span className="text-sm font-mono font-thin text-gray-500">
            {manager.focus_areas}
          </span>
        </div>
      </div>
    </div>
  );
}
