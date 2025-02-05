"use client";

import { useBlogStore } from "@/app/store/BlogState";
import { useEffect } from "react";
import { NewsHeader } from "./Tutor/Newsheader";
import { NewsCarousel } from "./Tutor/NewsCarousel";
import { NewsCard } from "./Tutor/NewsCard";


export function FeaturedSection() {

  const { blogs, fetchBlogs, isLoading, error } = useBlogStore();

useEffect(() => {
  fetchBlogs();
}, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
      <div className="px-4">
        <NewsHeader />
        <div className="max-w-[1400px] mx-auto">
          <NewsCarousel>
            {blogs.slice(0,8).map((blog) => (
              <div key={blog.id} className="flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_80%] min-w-0 px-2">
                <NewsCard {...blog} />
              </div>
            ))}
          </NewsCarousel>
        </div>
      </div>
    </section>
  );
}