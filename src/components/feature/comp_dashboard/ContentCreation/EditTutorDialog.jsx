"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditTutorForm } from "./EditTutorForm";

export function EditTutorDialog({ tutor, open, onOpenChange, onSave }) {
  if (!tutor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tutor</DialogTitle>
        </DialogHeader>
        <EditTutorForm tutor={tutor} onSave={onSave} onCancel={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
