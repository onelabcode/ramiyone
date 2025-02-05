"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useProfileStore from "@/app/store/coachAndScout";
import { useRouter } from "next/navigation";

export default function ScoutProfileForm() {
  const router = useRouter();
  const [profile, setProfile] = useState({});
const { createScoutProfile,loading}=useProfileStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
  await createScoutProfile(profile,"scout");
  setProfile({});
  router.push(`/auth/confirmation?role=scout`);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Scout Profile</h2>
        <p className="text-muted-foreground">Complete your profile to get started</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clubName">Club Name</Label>
              <Input
                id="clubName"
                value={profile.clubName || ""}
                onChange={(e) => setProfile({ ...profile, clubName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age || ""}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profile.address || ""}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={profile.yearsOfExperience || ""}
                onChange={(e) => setProfile({ ...profile, yearsOfExperience: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={profile.specialization || ""}
                onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                value={profile.achievements || ""}
                onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
                className="h-32"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">{!loading?"Submit Profile":"Loading..."}</Button>
        </form>
      </CardContent>
    </Card>
  );
}