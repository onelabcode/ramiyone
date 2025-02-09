"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import usePlayerStore from "services/PlayerStore";
import Loading from "@/components/feature/Loading";

const teamColors = [
  "border-red-500",
  "border-[#670E36]",
  "border-blue-500",
  "border-black",
];

export default function Page() {
  const { getTeams, teams } = usePlayerStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        await getTeams();
      } catch (err) {
        setError("Failed to load teams data");
        console.error("Error fetching teams:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [getTeams]);

  const getRandomColor = () => {
    return teamColors[Math.floor(Math.random() * teamColors.length)];
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !teams) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-xl font-semibold text-red-500">
          {error || "No teams data available"}
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-xl font-semibold">No teams found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">
            Teams in <span className="text-blue-600">RAMIYONE</span> Scouting
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={team.coach_name}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  className={`bg-white rounded-lg shadow-sm p-6 relative group border-b-4 ${getRandomColor()} hover:shadow-md transition-all duration-300`}
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={team.image}
                      alt={`${team.team_name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-center text-[#2D2D2D] mb-2">
                    {team.team_name}
                  </h2>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
