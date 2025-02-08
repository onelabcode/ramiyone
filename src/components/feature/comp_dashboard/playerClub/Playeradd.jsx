"use client";
import usePlayerStore from "services/PlayerStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";

const positions = {
  goalkeeper: [{ value: "gk", label: "Goalkeeper (GK)" }],
  defenders: [
    { value: "cb", label: "Center Back (CB)" },
    { value: "rb", label: "Right Back (RB)" },
    { value: "lb", label: "Left Back (LB)" },
    { value: "rwb", label: "Right Wing Back (RWB)" },
    { value: "lwb", label: "Left Wing Back (LWB)" },
  ],
  midfielders: [
    { value: "cdm", label: "Defensive Midfielder (CDM)" },
    { value: "cm", label: "Central Midfielder (CM)" },
    { value: "cam", label: "Attacking Midfielder (CAM)" },
    { value: "rm", label: "Right Midfielder (RM)" },
    { value: "lm", label: "Left Midfielder (LM)" },
  ],
  forwards: [
    { value: "rw", label: "Right Winger (RW)" },
    { value: "lw", label: "Left Winger (LW)" },
    { value: "cf", label: "Center Forward (CF)" },
    { value: "st", label: "Striker (ST)" },
  ],
};

export const AddPlayerModal = ({ onClose }) => {
  const { createPlayer, uploading, getTeams, teams } = usePlayerStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const { handleSubmit, reset, register } = useForm();

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  const onSubmit = async (data) => {
    if (!imageFile) {
      setImageError(true);
      return;
    }

    setImageError(false);
    const formData = new FormData();
    formData.append("player_id", data.player_id);
    formData.append("image", imageFile);
    formData.append("date_birth", data.date_birth);
    formData.append("age", data.age);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("nationality", data.nationality);
    formData.append(
      "position",
      selectedPositions.map((pos) => pos.value).join("/")
    );
    formData.append("preferred_foods", data.preferred_foods);
    formData.append("team_name", data.team_name);
    formData.append("youtube_link", data.youtube_link);
    formData.append("coach_perspective", data.coach_perspective);
    formData.append("playing_history", data.playing_history);

    await createPlayer(formData);
    reset();
    setImageFile(null);
    setImagePreview(null);
    onClose();
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

  const handlePositionChange = (e) => {
    const value = e.target.value;
    if (!value) return;

    const [category, positionValue] = value.split(":");
    const position = Object.values(positions[category]).find(
      (pos) => pos.value === positionValue
    );

    if (
      position &&
      !selectedPositions.some((pos) => pos.value === position.value)
    ) {
      if (selectedPositions.length < 3) {
        setSelectedPositions((prev) => [...prev, position]);
      }
    }
  };

  const handleRemovePosition = (positionValue) => {
    setSelectedPositions((prev) =>
      prev.filter((pos) => pos.value !== positionValue)
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md h-3/4 overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:scale-105 transition-transform focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Player</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Player Name
            </label>
            <input
              {...register("player_id", {
                required: true,
              })}
              type="text"
              id="id"
              placeholder="Enter player Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              placeholder="Enter player Image"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date Of birth
            </label>
            <input
              {...register("date_birth", {
                required: true,
              })}
              type="date"
              id="date"
              placeholder="Enter Date of birth"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              {...register("age", {
                required: true,
              })}
              type="number"
              id="age"
              placeholder="Enter age"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height (cm)
            </label>
            <input
              {...register("height", {
                required: true,
              })}
              type="number"
              id="height"
              placeholder="Enter height"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <input
              {...register("weight", {
                required: true,
              })}
              type="number"
              id="weight"
              placeholder="Enter weight"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality
            </label>
            <select
              {...register("nationality", { required: true })}
              id="nationality"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Ethiopia">Ethiopia</option>
              <option value="Kenya">Kenya</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Somalia">Somalia</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Sudan">Sudan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <select
              id="position"
              onChange={handlePositionChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Position</option>
              <optgroup label="Goalkeeper">
                {positions.goalkeeper.map((pos) => (
                  <option key={pos.value} value={`goalkeeper:${pos.value}`}>
                    {pos.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Defenders">
                {positions.defenders.map((pos) => (
                  <option key={pos.value} value={`defenders:${pos.value}`}>
                    {pos.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Midfielders">
                {positions.midfielders.map((pos) => (
                  <option key={pos.value} value={`midfielders:${pos.value}`}>
                    {pos.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Forwards">
                {positions.forwards.map((pos) => (
                  <option key={pos.value} value={`forwards:${pos.value}`}>
                    {pos.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {selectedPositions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">
                Selected Positions:
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedPositions.map((position) => (
                  <div
                    key={position.value}
                    className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{position.label}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePosition(position.value)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="preferred_foot"
              className="block text-sm font-medium text-gray-700"
            >
              Preferred Foot
            </label>
            <select
              {...register("preferred_foods", { required: true })}
              id="preferred_foot"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="team"
              className="block text-sm font-medium text-gray-700"
            >
              Team
            </label>
            <select
              {...register("team_name", { required: true })}
              id="team"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {teams && teams.length > 0 ? (
                teams.map((team) => (
                  <option key={team.id} value={team.team_name}>
                    {team.team_name}
                  </option>
                ))
              ) : (
                <option value="">No teams available</option>
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Youtube Link
            </label>
            <input
              {...register("youtube_link", {
                required: true,
              })}
              type="url"
              id="youtube_link"
              placeholder="Enter a YouTube Link"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Physical Attributes
            </label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label
                  htmlFor="coach_perspective"
                  className="block text-xs font-medium text-gray-600"
                >
                  Coach&apos;s Perspective
                </label>
                <input
                  {...register("coach_perspective", {
                    required: true,
                  })}
                  type="text"
                  id="coach_perspective"
                  placeholder="Enter Coach's perspective"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="playing_history"
                  className="block text-xs font-medium text-gray-600"
                >
                  Playing History
                </label>
                <input
                  {...register("playing_history", {
                    required: true,
                  })}
                  type="text"
                  id="playing_history"
                  placeholder="Enter Playing History"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
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
              disabled={uploading}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {uploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="bottom-right" theme="light" />
    </div>
  );
};
