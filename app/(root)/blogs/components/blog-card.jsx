'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {Calendar, ArrowRight } from "lucide-react";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { format } from "date-fns";
import Image from 'next/image';
import { useState } from "react";


export function BlogCard({ post }) {
    const [hoveredCard, setHoveredCard] = useState(null);
  return (
  
    <TooltipProvider>
        <Card
          key={post.id}
          className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
          onMouseEnter={() => setHoveredCard(post.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {post.title}
              {hoveredCard === post.id && (
              <Link  href={`/blogs/${post.id}`}>
                <ArrowRight className="h-5 w-5 text-primary animate-in slide-in-from-left" />
              </Link>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600"   dangerouslySetInnerHTML={{
                  __html:
                    post.body.length > 150
                      ? post.body.slice(0, 150) + "..."
                      : post.body,
                }}></p>
            <div className="flex gap-4 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                  <span>Published at {format(new Date(post.created_at), 'MMM d, h:mm a')}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/blogs/${post.id}`}
              className="w-full transition-all duration-300 hover:scale-105"
              variant={hoveredCard === post.id ? "default" : "secondary"}
            >
             Read More
            </Link>
          </CardFooter>
        </Card>
  
    </TooltipProvider>
 
  );
}