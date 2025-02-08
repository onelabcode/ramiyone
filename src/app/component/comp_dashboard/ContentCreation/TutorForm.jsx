"use client";
import useTutorStore from "@app/store/TutorState";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function TutorialVideoForm() {
  const { createTutor, loading } = useTutorStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("thumbnail", imageFile);
    formData.append("body", values.body);
    formData.append("video", values.video);
    await createTutor(formData);
    reset();
    setImageFile(null);
    setImagePreview(null);
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
    <section className="w-1/3 flex flex-col space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Head title</label>
          <input
            type="text"
            placeholder="Write title"
            {...register("title", { required: "Title is required" })}
            className="text-sm pl-5 border-2 border-gray-200 rounded-full p-4 w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Thumbnail URL</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Choose Thumbnail Image"
            onChange={handleImageChange}
            className="text-sm pl-5 border-2 border-gray-200 rounded-full p-4 w-full"
          />
          {imagePreview && (
            <div>
              <Image
                src={imagePreview}
                alt="Preview"
                width={100}
                height={100}
              />
            </div>
          )}
          {errors.thumbnail && (
            <p className="text-red-500 text-xs">{errors.thumbnail.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Body</label>
          <textarea
            placeholder="Write video description"
            {...register("body", { required: "Body is required" })}
            className="text-sm pl-5 border-2 border-gray-200 rounded-2xl p-4 w-full max-h-32"
          />
          {errors.body && (
            <p className="text-red-500 text-xs">{errors.body.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold">
            YouTube Video URL
          </label>
          <input
            type="url"
            placeholder="Paste YouTube Video URL"
            {...register("video", { required: "YouTube URL is required" })}
            className="text-sm pl-5 border-2 border-gray-200 rounded-full p-4 w-full"
          />
          {errors.video && (
            <p className="text-red-500 text-xs">{errors.video.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white py-3 rounded-full font-semibold text-base px-4"
        >
          {loading ? "Loading..." : "Submit Tutor"}
        </button>
      </form>
    </section>
  );
}

export default TutorialVideoForm;
