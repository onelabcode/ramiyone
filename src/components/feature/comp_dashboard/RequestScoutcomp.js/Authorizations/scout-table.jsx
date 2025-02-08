"use client";

import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Eye, UserCheck, UserX } from "lucide-react";
export function ScoutTable({ scouts, onViewDetails, onStatusChange }) {
  return (
    <div className="rounded-md border h-[calc(100vh-300px)] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Request</TableHead>
            <TableHead>Club</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scouts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                There are currently no requests to display.
              </TableCell>
            </TableRow>
          ) : (
            scouts.map((scout) => (
              <TableRow key={scout.id}>
                <TableCell className="font-medium">{scout.name}</TableCell>
                <TableCell className="font-semibold">{scout.profile}</TableCell>
                <TableCell>{scout.clubName}</TableCell>
                <TableCell>{scout.specialization}</TableCell>
                <TableCell>{scout.yearsOfExperience} years</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${
              scout.status === "approved"
                ? "bg-green-100 text-green-800"
                : scout.status === "declined"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
                  >
                    {scout.status.charAt(0).toUpperCase() +
                      scout.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(scout.updatedAt), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(scout)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                      onClick={() =>
                        onStatusChange(scout.id, "accepted", scout.profile)
                      }
                    >
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => onStatusChange(scout.id, "declined")}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
