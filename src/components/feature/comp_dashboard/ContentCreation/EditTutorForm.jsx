"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function EditTutorForm({ tutor, onSave, onCancel }) {
  const [body, setBody] = useState(tutor.body);
  const form = useForm({
    defaultValues: {
      title: tutor.title,
      thumbnail: tutor.thumbnail,
      videoUrl: tutor.video,
    },
  });

  const onSubmit = (values) => {
    onSave({
      ...tutor,
      ...values,
      body,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2 max-w-2xl">
          <Label>Content</Label>
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            className="bg-white"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="py-2 rounded-lg hover:opacity-80 text-sm  px-4 text-white bg-gray-900"
            onClick={onCancel}
          >
            Cancel
          </button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
