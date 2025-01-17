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

const playerFormSchema = z.object({
  player_id: z.string().min(1, "Player ID is required"),
  date_birth: z.string("Date of birth is required"),
  age: z.string().min(1, "age is required"),
  height: z.number().min(1, "Height must be at least 50cm"),
  weight: z.number().min(1, "Weight must be at least 25kg"),
  nationality: z.string().min(1, "Nationality is required"),
  position: z.enum([
    "center-back",
    "winger",
    "goalkeeper",
    "midfielder",
    "forward",
    "defender",
  ]),
  preferred_foods: z.string().min(1, ""),
  youtube_link: z.string().url("Must be a valid URL").optional(),
  coach_perspective: z
    .string()
    .min(1, "Coach's perspective can't be empty."),
    playing_history: z
    .string()
    .min(1, "Player's history  can't be empty.")
});
export function PlayerSuggestionDialog({ open, onOpenChange }) {
  const { user } = useAuthStore();
  const [imageFile, setImageFile] = useState(null);
  const { createPlayerSuggestion, loading } = usePlayerSuggestionsStore();
  const [imageError, setImageError] = useState(null);
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
                    <FormLabel>Player ID</FormLabel>
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
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="center-back">Center Back</SelectItem>
                        <SelectItem value="winger">Winger</SelectItem>
                        <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                        <SelectItem value="midfielder">Midfielder</SelectItem>
                        <SelectItem value="forward">Forward</SelectItem>
                        <SelectItem value="defender">Defender</SelectItem>
                      </SelectContent>
                    </Select>
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
