"use client";
import { useBlogStore } from "@/app/store/BlogState";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading";
import { useForm } from "react-hook-form";
import { BlogDialog } from "./ContentCreation/BlogDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import TutorialVideoForm from "./ContentCreation/TutorForm";
import useTutorStore from "@/app/store/TutorState";
import { TutorGrid } from "./ContentCreation/TutorGrid";
import { Toaster } from "sonner";

function BlogForm() {
  const { createBlog, loading, error } = useBlogStore();
  const { handleSubmit, reset, register } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", imageFile);
    formData.append("body", values.body);
    createBlog(formData);
    setImageFile(null);
    setImagePreview(null);
    reset();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 flex flex-col space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Blog title</label>
        <input
          name="title"
          {...register("title", { required: true })}
          type="text"
          placeholder="Write title"
          className="text-sm pl-5 border-2 border-gray-200 rounded-full p-4 w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Blog Image</label>
        <input
          name="image"
          {...register("image", { required: true })}
          type="file"
          accept="image/*"
          placeholder="Choose player Image"
          onChange={handleImageChange}
          className="text-sm pl-5 border-2 border-gray-200 rounded-full p-4 w-full"
        />
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "100px" }} />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Body</label>
        <textarea
          name="body"
          {...register("body", { required: true })}
          placeholder="Write blog content"
          className="text-sm pl-5 border-2 border-gray-200 rounded-2xl p-4 w-full max-h-32"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-400 text-white py-3 rounded-full font-semibold text-base"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Blog"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

export default function ContentCreation() {
  const { deleteBlog } = useBlogStore();
  const [check, setCheck] = useState(true);
  const [calendar, setCalendar] = useState(4);
  const { blogs, fetchBlogs, loading } = useBlogStore();
  const { tutors, getTutors } = useTutorStore();
  const [editBlog, setEditBlog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    getTutors();
    fetchBlogs();
  }, [fetchBlogs]);

  if (!tutors) {
    return <Loading />;
  }

  const handleToggle = () => setCheck(!check);

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setEditBlog(null);
    setIsDialogOpen(false);
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      deleteBlog(blogToDelete.id);
      setBlogToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-max-h-screen p-6">
      <p className="text-gray-500 text-sm py-3">Overview clubs and player</p>
      <h1 className="text-3xl font-semibold">Content Creation</h1>

      <div className="flex max-sm:flex-col flex-1 space-x-10">
        <section className="flex-1 flex flex-col !w-2/4">
          <div className="flex w-full bg-gray-100 rounded-full shadow-sm p-1 my-10">
            <button
              onClick={handleToggle}
              className={`flex-1 text-center py-4 rounded-full text-sm ${
                check ? "bg-white" : ""
              } font-medium text-gray-700`}
            >
              Blog
            </button>
            <button
              onClick={handleToggle}
              className={`flex-1 text-center py-4 rounded-full text-sm ${
                !check ? "bg-white" : ""
              } font-medium text-gray-700`}
            >
              Tutorial/Vid
            </button>
          </div>

          {check ? (
            <div className="space-y-5 overflow-y-auto h-64">
              {loading ? (
                <Loading />
              ) : blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white shadow rounded-md">
                    <img
                      alt=""
                      src={blog.image || `https://placehold.co/400`}
                      className="w-20 h-20 object-cover bg-gray-200 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-black font-semibold">{blog.title}</p>
                      <p
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: blog.body.length > 150 ? blog.body.slice(0, 150) + "..." : blog.body,
                        }}
                      ></p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(blog)}
                        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center mt-20">No blog found.</div>
              )}
              <BlogDialog initialData={editBlog} onClose={handleClose} isOpen={isDialogOpen} />
            </div>
          ) : tutors ? (
            <div className="container mx-auto py-8">
              <h1 className="text-3xl font-bold mb-6">Tutors</h1>
              <TutorGrid tutors={tutors} />
            </div>
          ) : (
            <></>
          )}
        </section>

        {check ? <BlogForm /> : <TutorialVideoForm />}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster position="bottom-right" theme="light" />
    </div>
  );
}