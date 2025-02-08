"use client";

import usePlayerStore from "@app/store/PlayerStore";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Toaster } from "sonner";

export const CreateClub = ({ onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { createTeam, teamloading } = usePlayerStore();

  async function onSubmit(values) {
    if (!imageFile) {
      setImageError(true);
      return;
    }

    setImageError(false);
    const formData = new FormData();
    formData.append("team_name", values.team_name);
    formData.append("image", imageFile);
    formData.append("coach_name", values.coach_name);

    await createTeam(formData);
    reset();
    setImageFile(null);
    setImagePreview(null);
    onClose();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(false);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="team_name"
                className="block text-sm font-medium text-gray-700"
              >
                Group (Club) Name
              </label>
              <input
                id="team_name"
                {...register("team_name", {
                  required: true,
                })}
                type="text"
                placeholder="Enter Club name..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="coach_name"
                className="block text-sm font-medium text-gray-700"
              >
                Team Website
              </label>
              <input
                id="coach_name"
                {...register("coach_name", {
                  required: true,
                })}
                type="url"
                placeholder="Enter Website Link.."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Logo Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  imageError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } rounded-md shadow-sm`}
              />
              {imageError && (
                <p className="text-red-500 text-sm mt-1">
                  Please upload a logo image.
                </p>
              )}
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
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={teamloading}
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {teamloading ? <>Uploading...</> : <>Save</>}
              </button>
            </div>
          </form>
        </div>
        <Toaster position="bottom-right" theme="light" />
      </div>
    </>
  );
};
