"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function TutorCard({ tutor, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative group transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video">
        <a href={tutor.video} target="_blank" rel="noopener noreferrer">
          <Image
            src={tutor.thumbnail || "https://placehold.co/600x400"}
            alt={`tutor image`}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg text-sm text-gray-200"
            layout="fill"
          />
        </a>
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 rounded-t-lg transition-opacity">
            <Button variant="secondary" size="sm" onClick={() => onEdit(tutor)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(tutor)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <CardHeader className="space-y-1 p-4">
        <CardTitle className="text-lg line-clamp-1">{tutor.title}</CardTitle>
        <CardDescription
          className="line-clamp-2"
          dangerouslySetInnerHTML={{ __html: tutor.body }}
        ></CardDescription>
      </CardHeader>
    </Card>
  );
}
