'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { SearchInput } from './components/search-input';
import { FeaturedPosts } from './components/featured-post';
import { BlogCard } from './components/blog-card';
import { useBlogStore } from '@/app/store/BlogState';
import { useSearch } from './components/use-search';

export default function BlogPage() {
  const POSTS_PER_PAGE =6;
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
const {fetchBlogs,blogs}=useBlogStore();
useEffect(() => {
fetchBlogs();
}, [fetchBlogs,blogs])


  const filteredPosts = useSearch(blogs, searchQuery);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto px-4 sm:px-14 py-5">
        <div className="mb-8 space-y-4 ">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(0, visiblePosts).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {visiblePosts < filteredPosts.length && (
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleLoadMore}
              className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              Load More
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}