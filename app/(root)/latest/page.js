"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, Users, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import useTutorStore from "@/app/store/TutorState";
import Loading from "@/app/component/Loading";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 6;

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [hoveredCard, setHoveredCard] = useState(null);
const { getTutors,tutors}=useTutorStore()
useEffect(() => {
 getTutors();
}, []);


if (!tutors){
    return <Loading/>
}
  const filteredTutors = tutors.filter((tutor) =>
    tutor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasMore = visibleItems < filteredTutors.length;

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
      <div className="relative bg-white">
  {/* Background Elements - Football themed */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-10"
    style={{ backgroundImage: 'url("/path-to-football-field-image.jpg")' }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white opacity-90" />

  {/* Main Content */}
  <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        Latest Football Updates
        <span className="relative block mt-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-1/2 h-[0.4em] w-full fill-yellow-500 opacity-50"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative text-yellow-600">Football News</span>
        </span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg sm:text-xl text-gray-700 leading-relaxed">
        Stay up to date with the latest news in the football world! Get updates on players, match results, transfers, and more.
      </p>

      <div className="relative w-full max-w-lg mx-auto mt-6">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search Updates..."
          className="pl-10 py-3 text-lg bg-gray-100 text-gray-800 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  </div>
</div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
          <TooltipProvider>
            {filteredTutors.slice(0, visibleItems).map((tutor) => (
              <Card
                key={tutor.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredCard(tutor.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={tutor.thumbnail}
                    alt={tutor.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {tutor.title}
                    {hoveredCard === tutor.id && (
                    <Link  href={`/latest/${tutor.id}`}>
                      <ArrowRight className="h-5 w-5 text-primary animate-in slide-in-from-left" />
                    </Link>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-gray-600"   dangerouslySetInnerHTML={{
                  __html:
                    tutor.body.length > 150
                      ? tutor.body.slice(0, 150) + "..."
                      : tutor.body,
                }}></p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                        <span>Published at {format(new Date(tutor.created_at), 'MMM d, h:mm a')}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/latest/${tutor.id}`}
                    className="w-full transition-all duration-300 hover:scale-105"
                    variant={hoveredCard === tutor.id ? "default" : "secondary"}
                  >
                   Read More
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </TooltipProvider>
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisibleItems(prev => prev + ITEMS_PER_PAGE)}
              className="group gap-2"
            >
              Load More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}