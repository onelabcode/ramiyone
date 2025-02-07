"use client";

import Image from "next/image";
import Link from "next/link";

export function FeaturedPosts({ posts }) {
  const featuredPosts = posts.slice(0, 3);
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-3">
      {featuredPosts.map((post, index) => (
        <Link
          key={post.id}
          href={`/blogs/${post.id}`}
          className={`group relative overflow-hidden rounded-xl ${
            index === 0 ? "md:col-span-2 md:row-span-2" : ""
          }`}
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                {post.title}
              </h3>
              <p
                className="text-sm text-gray-200"
                dangerouslySetInnerHTML={{
                  __html:
                    post.body.length > 150
                      ? post.body.slice(0, 150) + "..."
                      : post.body,
                }}
              ></p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
