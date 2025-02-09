"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { BlogForm } from "./ContentEdit";

export function BlogDialog({ isOpen, onClose, initialData }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Blog" : "Create New Blog"}
          </DialogTitle>
        </DialogHeader>
        <BlogForm initialData={initialData} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
