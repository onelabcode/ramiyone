"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePlayerSuggestionsStore from "@/app/store/useSuggest";
import useAuthStore from "@/app/store/AuthState";

const positions = {
  goalkeeper: [
    { value: "gk", label: "Goalkeeper (GK)" },
  ],
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

const playerFormSchema = z.object({
  player_id: z.string().min(1, "Player ID is required"),
  date_birth: z.string("Date of birth is required"),
  age: z.string().min(1, "age is required"),
  height: z.number().min(1, "Height must be at least 50cm"),
  weight: z.number().min(1, "Weight must be at least 25kg"),
  nationality: z.string().min(1, "Nationality is required"),
  position: z.string().min(1, "Position is required"),
  preferred_foods: z.string().min(1, ""),
  youtube_link: z.string().url("Must be a valid URL").optional(),
  coach_perspective: z.string().min(1, "Coach's perspective can't be empty."),
  playing_history: z.string().min(1, "Player's history can't be empty.")
});

export function PlayerSuggestionDialog({ open, onOpenChange }) {
  const { user } = useAuthStore();
  const [imageFile, setImageFile] = useState(null);
  const { createPlayerSuggestion, loading } = usePlayerSuggestionsStore();
  const [imageError, setImageError] = useState(null);
  const [selectedPositions, setSelectedPositions] = useState([]);

  const form = useForm({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      player_id: "",
      date_birth: "",
      height: "",
      weight: "",
      nationality: "",
      position: "",
      preferred_foods: "",
      youtube_link: "",
      coach_perspective: "",
      playing_history: "",
      age: "",
    },
  });

  const handlePositionChange = (e) => {
    const [category, value] = e.target.value.split(':');
    if (!value) return;

    const position = positions[category].find(pos => pos.value === value);
    if (!position) return;

    if (selectedPositions.length >= 3) return;
    if (selectedPositions.some(pos => pos.value === position.value)) return;

    const newPositions = [...selectedPositions, position];
    setSelectedPositions(newPositions);
    
    // Update form value with positions in format "pos1/pos2/pos3"
    const positionString = newPositions.map(pos => pos.value).join('/');
    form.setValue("position", positionString);
  };

  const handleRemovePosition = (positionValue) => {
    const newPositions = selectedPositions.filter(pos => pos.value !== positionValue);
    setSelectedPositions(newPositions);
    
    // Update form value with remaining positions
    const positionString = newPositions.map(pos => pos.value).join('/');
    form.setValue("position", positionString);
  };

  async function onSubmit(values) {
    if (!imageFile) {
      setImageError("Player image is required.");
      return;
    }

    const formData = new FormData();
    if (user?.user_id) {
      formData.append("created_by", user.user_id);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await createPlayerSuggestion(formData);

    form.reset();
    setSelectedPositions([]);
    setImageFile(null);
    setImageError(null);
    onOpenChange();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Suggest a Player</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="player_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter player ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Player Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);
                        setImageError(null);
                      } else {
                        setImageFile(null);
                      }
                    }}
                  />
                </FormControl>
                {imageError && (
                  <p className="text-sm text-red-500">{imageError}</p>
                )}
                {imageFile && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded"
                    />
                    <p className="text-sm text-gray-500">{imageFile.name}</p>
                  </div>
                )}
              </FormItem>

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Eritrea">Eritrea</SelectItem>
                        <SelectItem value="Djibouti">Djibouti</SelectItem>
                        <SelectItem value="Somalia">Somalia</SelectItem>
                        <SelectItem value="South Sudan">South Sudan</SelectItem>
                        <SelectItem value="Sudan">Sudan</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="175"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="70"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
     <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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
                        disabled={selectedPositions.length >= 3}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coach_perspective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coach's perspective</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="playing_history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player's playing history.</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
  control={form.control}
  name="preferred_foods"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Preferred Foot</FormLabel>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select preferred foot" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="right">Right</SelectItem>
          <SelectItem value="left">Left</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>


            <FormField
              control={form.control}
              name="youtube_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player Highlight Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">
                {loading ? "Uplaoding" : "Submit Suggestion"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
