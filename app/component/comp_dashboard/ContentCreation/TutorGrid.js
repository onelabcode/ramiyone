'use client';


import { ScrollArea } from "@/components/ui/scroll-area";
import { TutorCard } from "./TutorCard";
import { useState } from "react";
import { EditTutorDialog } from "./EditTutorDialog";
import useTutorStore from "@/app/store/TutorState";


export function TutorGrid({ tutors}) {
  const {updateTutor}=useTutorStore();
  const [editingTutor,setEditingTutor]=useState(null);
  const [isEditDialogOpen,setIsEditDialogOpen]=useState(false);
  const onOpenchange=()=>{
    setIsEditDialogOpen(false);
    setEditingTutor(null);
  }
  const handleEdit = (tutor) => {
      setEditingTutor(tutor);
      setIsEditDialogOpen(true);
  };
  const handlesave =async(tutor)=>{
       await updateTutor(tutor.id,tutor);
       setIsEditDialogOpen(false);
  }
  if (!tutors.length) return (<>
  <div className="flex justify-center mt-20">No tutor video avaliable.</div>
  </>);

  return (
    <ScrollArea className="h-[500px] w-full rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {tutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            tutor={tutor}
            onEdit={handleEdit}
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
  );
}