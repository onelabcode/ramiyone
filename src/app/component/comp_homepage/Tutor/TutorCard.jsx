"use client";

import { format } from "date-fns";
import { Calendar, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function TutorCard({ id, title, thumbnail, body, created_at }) {
  return (
    <Link href={`/latest/${id}`} className="block h-full">
      <article className="group relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">

        <div className="absolute inset-0">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
        
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-90" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="h-4 w-4" />
              <time dateTime={created_at} className="text-white">{format(new Date(created_at), 'MMM d, h:mm a')}</time>
            </div>

            <h3 className="text-2xl font-bold leading-tight tracking-tight transition-transform duration-300 group-hover:translate-y-[-4px]">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-200 line-clamp-3 max-w-[90%]"  dangerouslySetInnerHTML={{
                          __html:
                            body.length > 150
                              ? body.slice(0, 150) + "..."
                              : body,
                        }}>
          
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              Learn more
              <svg 
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
            <PlayCircle className="h-10 w-10 transform transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400" />
          </div>
        </div>
      </article>
    </Link>
  );
}