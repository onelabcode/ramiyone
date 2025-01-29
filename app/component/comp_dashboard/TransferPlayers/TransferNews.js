"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Percent as Soccer, Plus, Trash2, Edit2, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useTransferNewStore } from "@/app/store/TransferState"; // Updated Zustand store import
import { Toaster } from "sonner";
import { format } from "date-fns";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TransferNewsPage() {
  const {
    transfers,
    loading,
    fetchTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer,
  } = useTransferNewStore(); 
  const [newTransfer, setNewTransfer] = useState({
    title: "",
    imageUrl: "",
    body: "",
  });
  const [preview, setPreview] = useState("");
  const [editingTransfer, setEditingTransfer] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    id: null,
  });

  useEffect(() => {
    fetchTransfers(); 
  }, [fetchTransfers]);

  const validateForm = () => {
    const { title, body, imageUrl } = newTransfer;
    if (title.trim() === "" || body.trim() === "" || imageUrl === "") {
      alert("All fields are required.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setNewTransfer({ ...newTransfer, imageUrl: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const form = new FormData();
    form.append("title", newTransfer.title.trim());
    form.append("body", newTransfer.body.trim());
    form.append("image", newTransfer.imageUrl);

    await createTransfer(form);
    setNewTransfer({ title: "", imageUrl: "", body: "" });
    setPreview("");
  };

  const confirmDelete = (id) => {
    setDeleteConfirmation({ open: true, id });
  };

  const handleDelete = async () => {
    await deleteTransfer(deleteConfirmation.id); 
    setDeleteConfirmation({ open: false, id: null });
  };

  const handleEdit = (transfer) => {
    setEditingTransfer(transfer);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTransfer) return;

    const form = new FormData();
    form.append("title", editingTransfer.title.trim());
    form.append("body", editingTransfer.body.trim());
    console.log(form);
    if (editingTransfer.imageUrl) form.append("image", editingTransfer.imageUrl);

    await updateTransfer(editingTransfer.id, form); 
    setIsEditDialogOpen(false);
    setEditingTransfer(null);
  };

  const handleEditImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setEditingTransfer({
        ...editingTransfer,
        imageUrl: file,
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-10 bg-gradient-to-r from-purple-50 to-transparent p-6 rounded-lg">
        <Soccer className="h-10 w-10 text-purple-600" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Transfer News Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6 flex items-center gap-2">
            Latest Transfers
            <span className="text-sm font-normal text-purple-400">
              ({transfers.length} {transfers.length === 1 ? "story" : "stories"})
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {transfers.map((transfer) => (
              <Card
                key={transfer.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-purple-100"
              >
                <div className="aspect-video relative">
                  <img
                    src={transfer.image}
                    alt={transfer.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-0 right-0 p-2 flex gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleEdit(transfer)}
                      className="bg-white/90 hover:bg-white shadow-sm"
                    >
                      <Edit2 className="h-4 w-4 text-purple-600" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => confirmDelete(transfer.id)}
                      className="bg-white/90 hover:bg-white shadow-sm"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-purple-700 hover:text-purple-800 transition-colors">
                      {transfer.title}
                    </h3>
                  </div>
                  <div
                    className="prose prose-sm max-w-none text-gray-600 line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: transfer.body }}
                  />
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              <time dateTime={transfer.created_at}>{format(new Date(transfer.created_at), 'MMM d, h:mm a')}</time>
            </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {transfers.length === 0 && (
            <Card className="p-12 text-center bg-purple-50/50">
              <div className="flex flex-col items-center gap-3">
                <Soccer className="h-12 w-12 text-purple-300" />
                <p className="text-purple-600 font-medium">
                  No transfer news yet.
                </p>
                <p className="text-purple-400">Add your first transfer news item!</p>
              </div>
            </Card>
          )}
        </div>

        <Card className="md:col-span-4 h-fit sticky top-8 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Plus className="h-5 w-5" />
              Create Transfer News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input
                  value={newTransfer.title}
                  onChange={(e) =>
                    setNewTransfer({ ...newTransfer, title: e.target.value })
                  }
                  placeholder="Enter transfer title"
                  className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium text-gray-700">
                  Image
                </label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                {preview && (
                  <div className="mt-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Body</label>
                   <div className="mt-1">
                  <ReactQuill
                    value={newTransfer.body}
                    onChange={(value) =>
                      setNewTransfer({ ...newTransfer, body: value })
                    }
                    className="bg-white"
                    theme="snow"
                    modules={{
                      toolbar: [
                        ["bold", "italic", "underline"],
                        ["blockquote"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        ["clean"],
                      ],
                    }}
                    style={{
                      height: "150px",
                      marginBottom: "100px",
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {loading ? "Submitting..." : "Update News"}
                </Button>
              </DialogFooter>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transfer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editingTransfer?.title || ""}
                onChange={(e) =>
                  setEditingTransfer({
                    ...editingTransfer,
                    title: e.target.value,
                  })
                }
                placeholder="Enter transfer title"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium">Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
              />
              {editingTransfer?.imageUrl && (
                <div className="mt-2">
                  <img
                    src={typeof editingTransfer.imageUrl === 'string' ? editingTransfer.imageUrl : URL.createObjectURL(editingTransfer.imageUrl)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium">Body</label>
              <ReactQuill
                value={editingTransfer?.body || ""}
                onChange={(value) =>
                  setEditingTransfer({
                    ...editingTransfer,
                    body: value,
                  })
                }
                className="bg-white"
                theme="snow"
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    ["blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
                style={{
                  height: "200px",
                  marginBottom: "50px",
                }}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading ? "Updating..." : "Update News"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteConfirmation.open}
        onOpenChange={(open) => setDeleteConfirmation({ open, id: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this transfer news?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setDeleteConfirmation({ open: false, id: null })}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" theme="light" />
    </div>
  );
}