"use client";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { BlogCard } from "../components/blog-card";
import { useParams } from "next/navigation";
import { useBlogStore } from "services/BlogState";
import Loading from "@components/feature/Loading";
import { useEffect } from "react";
import { format } from "date-fns";

export default function BlogPostEach() {
  const { id } = useParams();
  const { singleblog, fetchBlogById, fetchRecommendedBlogs, recommendedBlogs } =
    useBlogStore();
  useEffect(() => {
    fetchBlogById(id);
    fetchRecommendedBlogs();
  }, [fetchBlogById, id, fetchRecommendedBlogs]);

  const filteredRecommendedBlogs = recommendedBlogs.filter(
    (relatedPost) => relatedPost.id !== id
  );
  return (
    <>
      {singleblog ? (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
          <div className="relative h-[60vh] w-full">
            <Image
              src={singleblog.image}
              alt={singleblog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-600/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className=" px-4 text-center">
                <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {singleblog.title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg">
                    {format(new Date(singleblog.created_at), "MMM d, h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <main className=" mx-auto sm:px-4 py-12">
            <div className="mx-auto w-full sm:max-w-4xl shadow-lg p-5 sm:px-14 sm:pb-14 rounded-md">
              <div dangerouslySetInnerHTML={{ __html: singleblog.body }}></div>
            </div>
            {filteredRecommendedBlogs.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 text-center text-3xl font-bold text-purple-800">
                  Recommended Posts
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredRecommendedBlogs.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
