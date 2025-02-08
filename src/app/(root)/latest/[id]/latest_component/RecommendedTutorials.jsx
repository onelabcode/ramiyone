"use client";

import { Calendar, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@components/ui/card";

export function RecommendedTutorials({ posts }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Recommended posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/latest/${post.id}`} key={post.id} className="group">
            <Card className="border-none bg-transparent shadow-none transition-transform duration-200 hover:-translate-y-1">
              <CardContent className="p-0 space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-black/75 rounded-full p-3">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 px-1">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.body}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.created_at}>{post.created_at}</time>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
