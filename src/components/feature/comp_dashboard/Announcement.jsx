"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Input } from "@components/ui/input";
import { Search, Users } from "lucide-react";
import NotificationForm from "./annoucnement/announcement-form";
import UserList from "./annoucnement/user-list";
import { Toaster } from "sonner";

export default function Announcement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const roles = ["player", "scout", "coach"];

  return (
    <>
      {" "}
      <div className="container mx-auto p-6 space-y-8 max-w-7xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Notification Management
            </h1>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {selectedUsers.length} users selected
              </span>
            </div>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <Tabs defaultValue="player" className="w-full">
              <TabsList className="w-full justify-start">
                {roles.map((role) => (
                  <TabsTrigger key={role} value={role} className="capitalize">
                    {role}
                  </TabsTrigger>
                ))}
              </TabsList>
              {roles.map((role) => (
                <TabsContent key={role} value={role}>
                  <UserList
                    role={role}
                    searchQuery={searchQuery}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="md:col-span-4">
            <NotificationForm selectedUsers={selectedUsers} />
          </div>
        </div>
        <Toaster position="bottom-right" theme="light" />
      </div>
    </>
  );
}
