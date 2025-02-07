"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export function ScoutDetails({ scout, open, onClose }) {
  if (!scout) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Scout Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-500">
                Personal Information
              </h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {scout.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {scout.email}
                </p>
                <p>
                  <span className="font-medium">Age:</span> {scout.age}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {scout.address}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">
                Professional Details
              </h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Club:</span> {scout.clubName}
                </p>
                <p>
                  <span className="font-medium">Experience:</span>{" "}
                  {scout.yearsOfExperience} years
                </p>
                <p>
                  <span className="font-medium">Specialization:</span>{" "}
                  {scout.specialization}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-500">Achievements</h3>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {scout.achievements}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Status Information</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Status:</span> {scout.status}
                </p>
                <p>
                  <span className="font-medium">Created:</span>{" "}
                  {format(new Date(scout.createdAt), "PPP")}
                </p>
                <p>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {format(new Date(scout.updatedAt), "PPP")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
