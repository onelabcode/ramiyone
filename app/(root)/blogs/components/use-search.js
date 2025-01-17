'use client';

import { useState, useEffect } from 'react';

export function useSearch(posts, searchQuery) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchQuery]);

  return filteredPosts;
}