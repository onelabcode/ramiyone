"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Link as LinkIcon } from "lucide-react";
import { useBrandStore } from "@app/store/BrandsState";
import Image from "next/image";
import { Toaster } from "sonner";

export default function BrandsPage() {
  const {
    brands,
    fetchBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    loading,
    error,
  } = useBrandStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const validateForm = () => {
    const { name, website, image } = formData;
    if (!name.trim() || !website.trim() || (!editingBrand && !image)) {
      alert("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const form = new FormData();
    form.append("name", formData.name.trim());
    form.append("website", formData.website.trim());
    if (formData.image) form.append("image", formData.image);

    if (editingBrand) {
      await updateBrand(editingBrand.id, form);
    } else {
      await createBrand(form);
    }
    handleClose();
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      website: brand.website,
      image: null,
    });
    setPreview(brand.image);
    setIsOpen(true);
  };

  const handleDeleteClick = (brand) => {
    setBrandToDelete(brand);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (brandToDelete) {
      await deleteBrand(brandToDelete.id);
      setIsDeleteDialogOpen(false);
      setBrandToDelete(null);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingBrand(null);
    setFormData({ name: "", website: "", image: null });
    setPreview(null);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Brand Management</CardTitle>
          <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
              setIsOpen(isOpen);
              if (!isOpen) handleClose();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingBrand ? "Edit Brand" : "Add New Brand"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Brand Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Enter website URL"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  {preview && (
                    <div className="mt-2">
                      <Image
                        src={preview}
                        alt="Image Preview"
                        className="w-20 h-20 object-cover rounded-md"
                        width={80}
                        height={80}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {editingBrand ? "Update" : "Add"} Brand
                  </Button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="relative h-10 w-10">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <LinkIcon className="mr-1 h-4 w-4" />
                      Visit Site
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(brand)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(brand)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              brand
              {brandToDelete && ` "${brandToDelete.name}"`} and remove it from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster position="bottom-right" theme="light" />
    </div>
  );
}
