"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useClubNewsStore } from "@/app/store/ClubNewsState";
import { useManagerStore } from "@/app/store/ManagerState";

export default function FeaturedManager() {
  const { clubNews, fetchAllClubNews, loading: clubNewsLoading } = useClubNewsStore();
  const { featuredManager, fetchLatestFeaturedManager, loading: managerLoading } = useManagerStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchAllClubNews();
    fetchLatestFeaturedManager();
  }, [fetchAllClubNews, fetchLatestFeaturedManager]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const isAtBottom = scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight;
      if (isAtBottom) {
        scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-3 px-4 sm:px-6">
            <h2 className="text-[1.75rem] font-bold text-[#37003c] mb-4">Featured Manager</h2>
            {managerLoading ? (
              <Card className="bg-white shadow-sm p-6 text-center text-gray-500">
                Loading...
              </Card>
            ) : featuredManager ? (
              <Card className="bg-white shadow-sm overflow-hidden">
                <div className="relative bg-gradient-to-br from-white to-gray-100">
                  <div className="pt-16 px-4">
                    <div className="grid grid-cols-1 gap-y-2 text-[#37003c]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Academy Size</span>
                        <span className="font-bold">{featuredManager.academy_size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Scouted Players</span>
                        <span className="font-bold">{featuredManager.scouted_players}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pro Promotions</span>
                        <span className="font-bold">{featuredManager.pro_player_promotions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Certifications</span>
                        <span className="font-bold">{featuredManager.certifications}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Focus Areas</span>
                        <span className="font-bold">{featuredManager.focus_areas}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Digital Scouting</span>
                        <span className="font-bold">{featuredManager.digital_scouting_participation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <Image
                      src={featuredManager.image}
                      alt="Manager"
                      width={400}
                      height={300}
                      className="w-full h-[300px] object-cover object-center"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-2xl font-bold text-[#37003c]">{featuredManager.name}</h3>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white shadow-sm p-6 text-center text-gray-500">
                No featured manager available.
              </Card>
            )}
          </div>

          <div className="lg:col-span-9">
            <div className="mb-6">
              <div className="flex justify-between items-center px-4 sm:px-6 lg:px-0 mb-2">
                <h2 className="text-[1.75rem] font-bold text-[#37003c]">Club News</h2>
              </div>
              {clubNewsLoading ? (
                <Card className="bg-white shadow-sm p-6 mx-4 sm:mx-6 lg:mx-0 text-center text-gray-500">
                  Loading...
                </Card>
              ) : clubNews.length > 0 ? (
                <>
                  {/* Mobile View */}
                  <div 
                    ref={scrollRef}
                    className="lg:hidden max-h-[calc(4*100px)] overflow-y-auto scroll-smooth scrollbar-thin"
                  >
                    {clubNews.map((news) => (
                      <Link 
                        key={news.id} 
                        href={news.link} 
                        className="flex gap-4 items-start group w-full hover:bg-gray-50 transition-colors duration-200 rounded-lg px-4 sm:px-6 py-2"
                      >
                        <div className="relative w-[140px] h-[80px] flex-shrink-0 bg-[#F5F2F5] overflow-hidden rounded-lg">
                          <Image
                            src={news.image}
                            alt="Club Logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <span className="text-[#0000ee] font-bold text-[10px] mb-1">Club News</span>
                          <span className="font-medium text-[13px] hover:underline text-[#37003c] group-hover:text-[#4D0060] transition-colors line-clamp-3">
                            {news.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[calc(3*280px)] md:max-h-[calc(3*210px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                    {clubNews.map((news) => (
                      <Link key={news.id} href={news.link} className="block group">
                        <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                          <div className={`aspect-[1.91/1] relative flex items-center justify-center`}>
                            <Image
                              src={news.image}
                              alt="Club Logo"
                              fill
                              className="w-20 h-20 object-contain relative z-10"
                            />
                          </div>
                          <div className="p-4">
                            <div className="text-xs uppercase tracking-wider text-gray-600 mb-2">Club News</div>
                            <h3 className="font-semibold text-[#37003c] text-sm line-clamp-2 group-hover:text-purple-700 transition-colors">
                              {news.title}
                            </h3>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="bg-white shadow-sm p-6 mx-4 sm:mx-6 lg:mx-0 text-center text-gray-500">
                  No club news available.
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}