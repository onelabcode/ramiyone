"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { UserSearch } from "./admin/user-search";
import { RoleFilter } from "./admin/user-filter";
import { UserTable } from "./admin/user-table";
import { UserDetailsDialog } from "./admin/user-details-dialog";
import useAuthStore from "@/app/store/AuthState";
import Loading from "../Loading";
import { Toaster } from "sonner";

export default function Home() {
  const { users, getNonAdminUsers,deleteUser,setUsers,updateUser } = useAuthStore();
  useEffect(() => {
    getNonAdminUsers();
  }, []);
  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleSearch = (query) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.username.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredUsers(filtered);
  };

  const handleRoleFilter = (role) => {
    if (role === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.role === role);
      setFilteredUsers(filtered);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    updateUser(userId,newRole);
 
  };

  const handleDeleteUser = (userId) => {
 deleteUser(userId);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  return (
    <>
      {filteredUsers ? (
        <div className="container mx-auto py-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <CardTitle>User Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <UserSearch onSearch={handleSearch} />
                  <RoleFilter onRoleFilter={handleRoleFilter} />
                </div>
                <UserTable
                  users={filteredUsers}
                  onUserSelect={handleUserSelect}
                  onDeleteUser={handleDeleteUser}
                />
              </div>
            </CardContent>
          </Card>

          <UserDetailsDialog
            user={selectedUser}
            open={showUserDetails}
            onOpenChange={setShowUserDetails}
            onRoleChange={handleRoleChange}
          />
          <Toaster position="bottom-right" theme="light" />
        </div>
      ) :(
        <Loading />
      ) }
    </>
  );
}
