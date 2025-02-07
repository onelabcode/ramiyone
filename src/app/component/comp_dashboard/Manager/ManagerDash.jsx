import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "sonner";
import { useManagerStore } from "@app/store/ManagerState";
import Image from "next/image";

const ManagerDashboard = () => {
  const {
    managers,
    fetchAllManagers,
    createManager,
    updateManager,
    deleteManager,
    updateManagerFeaturedStatus,
  } = useManagerStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [currentManager, setCurrentManager] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    academy_size: 0,
    scouted_players: 0,
    pro_player_promotions: 0,
    certifications: "",
    focus_areas: "",
    digital_scouting_participation: 0,
  });

  useEffect(() => {
    fetchAllManagers();
  }, [fetchAllManagers]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (currentManager) {
      await updateManager(currentManager.id, data);
    } else {
      await createManager(data);
    }
    setIsDialogOpen(false);
    setCurrentManager(null);
    setFormData({
      name: "",
      image: null,
      academy_size: 0,
      scouted_players: 0,
      pro_player_promotions: 0,
      certifications: "",
      focus_areas: "",
      digital_scouting_participation: 0,
    });
  };

  const handleEdit = (manager) => {
    setCurrentManager(manager);
    setFormData({
      name: manager.name,
      image: null,
      academy_size: manager.academy_size,
      scouted_players: manager.scouted_players,
      pro_player_promotions: manager.pro_player_promotions,
      certifications: manager.certifications,
      focus_areas: manager.focus_areas,
      digital_scouting_participation: manager.digital_scouting_participation,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setManagerToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (managerToDelete) {
      await deleteManager(managerToDelete);
      setIsDeleteDialogOpen(false);
      setManagerToDelete(null);
    }
  };

  const handleToggleFeatured = async (id, is_featured) => {
    await updateManagerFeaturedStatus(id, is_featured);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsDialogOpen(true)}>Add Manager</Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Academy Size</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {managers.map((manager) => (
            <TableRow key={manager.id}>
              <TableCell>{manager.name}</TableCell>
              <TableCell>
                {manager.image && (
                  <Image
                    src={manager.image}
                    alt={manager.name}
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                )}
              </TableCell>
              <TableCell>{manager.academy_size}</TableCell>
              <TableCell>
                <Switch
                  checked={Boolean(manager.is_featured)} // Convert 0 or 1 to true/false
                  onCheckedChange={(checked) =>
                    handleToggleFeatured(manager.id, checked ? 1 : 0)
                  } // Convert boolean back to 1 or 0
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(manager)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(manager.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Manager Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <span></span>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentManager ? "Edit Manager" : "Add Manager"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <Label>Image</Label>
              <Input type="file" name="image" onChange={handleInputChange} />

              <Label>Academy Size</Label>
              <Input
                type="number"
                name="academy_size"
                value={formData.academy_size}
                onChange={handleInputChange}
              />

              <Label>Scouted Players</Label>
              <Input
                type="number"
                name="scouted_players"
                value={formData.scouted_players}
                onChange={handleInputChange}
              />

              <Label>Pro Player Promotions</Label>
              <Input
                type="number"
                name="pro_player_promotions"
                value={formData.pro_player_promotions}
                onChange={handleInputChange}
              />

              <Label>Certifications</Label>
              <Input
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
              />

              <Label>Focus Areas</Label>
              <Input
                name="focus_areas"
                value={formData.focus_areas}
                onChange={handleInputChange}
              />

              <Label>Digital Scouting Participation</Label>
              <Input
                type="number"
                name="digital_scouting_participation"
                value={formData.digital_scouting_participation}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="mt-4">
              {currentManager ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this manager?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" theme="light" />
    </div>
  );
};

export default ManagerDashboard;
