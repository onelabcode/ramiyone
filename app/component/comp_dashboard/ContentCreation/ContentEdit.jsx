'use client';

import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { useBlogStore } from '@/app/store/BlogState';

export function BlogForm({ initialData, onSuccess }) {
  const { createBlog, updateBlog, loading, error } = useBlogStore();
  const [content, setContent] = useState(initialData?.body || '');
  
  const { handleSubmit, reset, register, setValue } = useForm({
    defaultValues: initialData || {
      title: '',
      image: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('image', initialData.image);
      setContent(initialData.body);
    }
  }, [initialData, setValue]);

  const onSubmit = async (values) => {
    const blogData = {
      ...values,
      body: content,
    };

    if (initialData) {
      await updateBlog(initialData.id, blogData);
    } else {
      await createBlog(blogData);
      reset();
      setContent('');
    }
    
    onSuccess?.();
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Blog Title</Label>
        <Input
          {...register("title", { required: true })}
          placeholder="Enter blog title"
        />
      </div>

      <div className="space-y-2">
        <Label>Featured Image URL</Label>
        <Input
          {...register("image", { required: true })}
          placeholder="Enter image URL"
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <div className="min-h-[200px]">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-64"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Saving..." : initialData ? "Update Blog" : "Create Blog"}
      </Button>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </form>
  );
}