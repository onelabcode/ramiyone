"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FeaturedSection } from "./Blogsection";
import VotePage from "./TopSearched";
import TutorialSection from "./TutorPage";
import { Toaster } from "sonner";
import { ChevronRight, Trophy, Star, Users, Pause, Play, VolumeX, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import usePlayerStore from "@/app/store/PlayerStore";
import { useTypewriter } from "./components/typeWriter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ShadCN Card component
import { BrandMarquee } from "./BrandFooter/BrandFooter";
import FeaturedPlayer from "./FeaturedPlayers";


const Frontpage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const typedText = useTypewriter(
    "advanced scouting platform.",
    60,
    100,
    4000,
    4000
  );
  const { getTeams, teams } = usePlayerStore();

  useEffect(() => {
    getTeams();
  }, [getTeams]);


  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };



  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="relative flex overflow-hidden py-3">
        <motion.div
          className="flex min-w-full items-center justify-center"
          animate={{
            x: [0, -1035],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {teams && teams.length > 0
            ? teams.map((logo, idx) => (
                <div className="flex items-center gap-3 px-4" key={idx}>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600">
                    <Image
                      src={logo.image}
                      alt={"Team Logo"}
                      fill
                      className="object-cover"
                      sizes="35px"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                    {logo.team_name}
                  </span>
                </div>
              ))
            : null}
        </motion.div>
      </div>

      <div className="relative min-h-screen bg-white px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-100px)]">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-5xl sm:text-6xl md:text-[109px] font-extrabold tracking-tight text-gray-900">
                RAMIYONE 
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-purple-600 mt-2">
                  DIGITAL SCOUTING
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                  Discover the next generation of football talent with our{" "}
                  {typedText}|
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <Link href="/players">
                    <Button className="px-6 py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-md rounded-lg transition-transform transform hover:scale-105">
                      Start Scouting
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-4 rounded-lg shadow-lg border border-gray-200">
                  <CardHeader>
                    <Trophy className="w-8 h-8 text-blue-500" />
                    <CardTitle className="text-lg font-semibold mt-4">
                      Elite Talent Pool
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    Access to a curated database of promising young football
                    talents.
                  </CardContent>
                </Card>

                <Card className="p-4 rounded-lg shadow-lg border border-gray-200">
                  <CardHeader>
                    <Star className="w-8 h-8 text-green-500" />
                    <CardTitle className="text-lg font-semibold mt-4">
                      Advanced Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    In-depth performance metrics to enhance decision-making.
                  </CardContent>
                </Card>

                <Card className="p-4 rounded-lg shadow-lg border border-gray-200">
                  <CardHeader>
                    <Users className="w-8 h-8 text-purple-500" />
                    <CardTitle className="text-lg font-semibold mt-4">
                      Scout Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    Collaborate with scouts for expert recommendations.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10 px-4">
        <div className="mx-auto max-w-6xl overflow-hidden">
          
            <div className="aspect-video relative bg-muted">
              <video
                ref={videoRef}
                playsInline
                loop
                autoPlay
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
          
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex flex-col gap-2">
           
                  <div 
                    className="w-full h-1 bg-gray-600 cursor-pointer rounded-full overflow-hidden"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-blue-500 transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <div className="text-sm">
                        {videoRef.current && (
                          `${formatTime(videoRef.current.currentTime)} / ${formatTime(duration)}`
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2 opacity-40">RAMIYONE</h2>
              </div>
            </div>
         
        </div>
      </section>


      
      <TutorialSection />
      <FeaturedSection />
      {/* <FeaturedPlayer/> */}
      <VotePage />
      <BrandMarquee/>
      <Toaster position="bottom-right" theme="light" />
    </>
  );
};

export default Frontpage;
