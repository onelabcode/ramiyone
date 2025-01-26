"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import useFindPlayerStore from "@/app/store/userFindPlayer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function PlayerTable({ requests, onScoutClick }) {
  const { updatePlayerRequestStatus, deletePlayerRequest } = useFindPlayerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    requestId: null,
  });
  const itemsPerPage = 10;

  const filteredRequests = requests.filter(
    (request) =>
      request.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatus = (e, requestId, status) => {
    e.stopPropagation();
    updatePlayerRequestStatus(requestId, status);
  };

  const handleDeleteConfirmation = (e, requestId) => {
    e.stopPropagation();
    setDeleteConfirmation({
      isOpen: true,
      requestId,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.requestId) {
      deletePlayerRequest(deleteConfirmation.requestId);
    }
    setDeleteConfirmation({ isOpen: false, requestId: null });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name or position..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th scope="col" className="p-4 text-left font-medium">
                  Position
                </th>
                <th scope="col" className="p-4 text-left font-medium">
                  Age
                </th>
                <th scope="col" className="p-4 text-left font-medium">
                  Qualities
                </th>
                <th scope="col" className="p-4 text-left font-medium">
                  Status
                </th>
                <th scope="col" className="p-4 text-left font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b hover:bg-muted/50 cursor-pointer"
                  onClick={() => onScoutClick(request.scout_id)}
                >
                  <td className="p-4 max-w-40">
                    <Badge variant="secondary">{request.position}</Badge>
                  </td>
                  <td className="p-4">{request.age}</td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(request.qualities).map(([key, value]) => (
                        <Badge key={key} variant="outline">
                          {key}: {value}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={Check}>
                      {request.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {request.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={(e) => handleStatus(e, request.id, "accepted")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => handleStatus(e, request.id, "declined")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => handleDeleteConfirmation(e, request.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={deleteConfirmation.isOpen} 
        onOpenChange={(isOpen) => !isOpen && setDeleteConfirmation({ isOpen: false, requestId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this request. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}