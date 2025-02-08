"use client";

import { ScrollArea } from "@components/ui/scroll-area";
import { TutorCard } from "./TutorCard";
import { useState } from "react";
import { EditTutorDialog } from "./EditTutorDialog";
import useTutorStore from "services/TutorState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";

export function TutorGrid({ tutors }) {
  const { updateTutor, deleteTutor } = useTutorStore();
  const [editingTutor, setEditingTutor] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tutorToDelete, setTutorToDelete] = useState(null);

  const onOpenchange = () => {
    setIsEditDialogOpen(false);
    setEditingTutor(null);
  };

  const handleEdit = (tutor) => {
    setEditingTutor(tutor);
    setIsEditDialogOpen(true);
  };

  const handlesave = async (tutor) => {
    await updateTutor(tutor.id, tutor);
    setIsEditDialogOpen(false);
  };

  const handleDeleteClick = (tutor) => {
    setTutorToDelete(tutor);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (tutorToDelete) {
      await deleteTutor(tutorToDelete.id);
      setTutorToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  if (!tutors.length)
    return (
      <div className="flex justify-center mt-20">No tutor video available.</div>
    );

  return (
    <>
      <ScrollArea className="h-[500px] w-full rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
          <EditTutorDialog
            onSave={handlesave}
            tutor={editingTutor}
            open={isEditDialogOpen}
            onOpenChange={onOpenchange}
          />
        </div>
      </ScrollArea>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tutorial Video</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tutorial video? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
