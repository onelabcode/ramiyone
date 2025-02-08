import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { useClubNewsStore } from "@app/store/ClubNewsState";
import Image from "next/image";

export default function ClubNewsDashboard() {
  const {
    clubNews,
    fetchAllClubNews,
    createClubNews,
    updateClubNews,
    deleteClubNews,
    loading,
  } = useClubNewsStore();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  useEffect(() => {
    fetchAllClubNews();
  }, [fetchAllClubNews]);

  const handleCreateNews = async (e) => {
    e.preventDefault();
    if (!title || !link || !image) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", image);

    await createClubNews(formData);
    setIsDialogOpen(false);
    setTitle("");
    setLink("");
    setImage(null);
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    if (!title || !link) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    if (image) formData.append("image", image);

    await updateClubNews(editingNews.id, formData);
    setIsDialogOpen(false);
    setEditingNews(null);
    setTitle("");
    setLink("");
    setImage(null);
  };

  const handleDeleteNews = async () => {
    if (newsToDelete) {
      await deleteClubNews(newsToDelete);
      setIsDeleteDialogOpen(false);
      setNewsToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Club News Dashboard</CardTitle>
          <CardDescription>Manage your club news here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Club News</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingNews ? "Edit Club News" : "Create Club News"}
                </DialogTitle>
                <DialogDescription>
                  {editingNews
                    ? "Update the club news details."
                    : "Fill in the details to create a new club news."}
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={editingNews ? handleUpdateNews : handleCreateNews}
                className="space-y-4"
              >
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Input
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
                <Input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required={!editingNews}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {editingNews ? "Update News" : "Create News"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Club News</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover"
                      width={64}
                      height={64}
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditingNews(item);
                        setTitle(item.title);
                        setLink(item.link);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setNewsToDelete(item.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              club news.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteNews}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
