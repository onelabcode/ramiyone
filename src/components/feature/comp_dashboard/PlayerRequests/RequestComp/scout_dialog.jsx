import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  Mail,
  MapPin,
  Star,
  Trophy,
  User,
} from "lucide-react";
import Loading from "@/components/feature/Loading";
import { useEffect } from "react";
import useProfileStore from "services/coachAndScout";

export function ScoutDialog({ scout, open, onOpenChange }) {
  const { fetchScoutById, singleScout } = useProfileStore();

  useEffect(() => {
    fetchScoutById(scout);
  }, []);
  if (!singleScout) return <Loading />;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Scout Information</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{singleScout.name}</h2>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{singleScout.profile}</span>
                </div>
              </div>
            </div>
            <Badge variant={"success"}>Age: {singleScout.age}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{singleScout.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{singleScout.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{singleScout.clubName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{singleScout.yearsOfExperience} years experience</span>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Specialization & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>{singleScout.specialization}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Trophy className="h-4 w-4 text-muted-foreground mt-1" />
                  <p className="text-sm">{singleScout.achievements}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
