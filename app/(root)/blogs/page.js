"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { SearchInput } from './components/search-input';
import { FeaturedPosts } from './components/featured-post';
import { BlogCard } from './components/blog-card';
import { useBlogStore } from '@/app/store/BlogState';
import { useSearch } from './components/use-search';
import { Pagination } from './components/pagination';

export default function BlogPage() {
  const POSTS_PER_PAGE = 6;
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchBlogs, blogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    // Reset to first page when search query changes
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredPosts = useSearch(blogs, searchQuery);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Calculate the current page's posts
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto px-4 sm:px-14 py-5">
        <div className="mb-8 space-y-4">
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Discover Amazing Sport stories
          </h1>
          <p className="text-xl text-gray-600">
            Explore our collection of thought-provoking articles and insights
          </p>
          <div className="max-w-md">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {currentPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              No posts found matching your search criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}