import { UsersIcon } from "lucide-react";
import { Card, CardContent } from "@components/ui/card";

export function DashboardHeader({ requestCount }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Player Requests</h2>
        <p className="text-muted-foreground">
          Manage and review incoming player requests from scouts
        </p>
      </div>
      <Card className="bg-primary/10">
        <CardContent className="py-4 px-6">
          <div className="flex items-center space-x-4">
            <UsersIcon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Total Requests</p>
              <p className="text-2xl font-bold">{requestCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
