"use client";

import { Calendar } from "lucide-react";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { cn } from "@lib/utils";
import { format } from "date-fns";
import Image from "next/image";

export function NewsCard({ id, title, body, image, created_at, className }) {
  return (
    <div
      className={cn(
        "group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-6 p-6">
        <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            width={640}
            height={360}
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
              <Calendar className="h-4 w-4" />
              <time dateTime={created_at}>
                {format(new Date(created_at), "MMM d, h:mm a")}
              </time>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h3>
            <p
              className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: body.length > 150 ? body.slice(0, 150) + "..." : body,
              }}
            />
          </div>
          <Link href={`/blogs/${id}`}>
            <Button className="w-fit bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
