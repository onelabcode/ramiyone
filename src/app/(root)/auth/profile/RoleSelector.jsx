"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserCog, Users, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RoleSelector() {
  const router = useRouter();
  const handleRoleSelect = (role) => {
    router.push(`/auth/profile/${role}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <Card
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => handleRoleSelect("scout")}
      >
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <Users className="h-16 w-16 text-primary" />
          <h3 className="text-2xl font-bold">Scout</h3>
          <p className="text-center text-muted-foreground">
            Join as a scout to discover and evaluate talented players
          </p>
          <Button variant="outline" className="w-full">
            Continue as Scout
          </Button>
        </CardContent>
      </Card>

      <Card
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => handleRoleSelect("coach")}
      >
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <UserCog className="h-16 w-16 text-primary" />
          <h3 className="text-2xl font-bold">Coach</h3>
          <p className="text-center text-muted-foreground">
            Join as a coach to sugguest players.
          </p>
          <Button variant="outline" className="w-full">
            Continue as Coach
          </Button>
        </CardContent>
      </Card>

      <Card
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => router.push(`/auth/confirmation?role=user`)}
      >
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <User className="h-16 w-16 text-primary" />
          <h3 className="text-2xl font-bold">User</h3>
          <p className="text-center text-muted-foreground">
            Join as a user to vote for your favorite clubs and players
          </p>
          <Button variant="outline" className="w-full">
            Continue as User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
