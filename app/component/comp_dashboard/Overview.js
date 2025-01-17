"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Bell, User, Search, Users, Trophy, UserCheck, FileText } from "lucide-react";
import useDashboardStore from "@/app/store/userDashboard";
import { useEffect } from "react";
import Loading from "../Loading";


const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
];

// const pieChartData = [
//   { name: "Forwards", value: 30 },
//   { name: "Midfielders", value: 35 },
//   { name: "Defenders", value: 25 },
//   { name: "Goalkeepers", value: 10 },
// ];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function Dashboard() {
    const { stats, recentActivities, loading, fetchDashboardData, error,pieChartData,barChartData } = useDashboardStore();

    useEffect(() => {
      fetchDashboardData(); 
    }, [fetchDashboardData]);
  
     if (loading) {
       return <Loading/>;
     }
  
    if (error) {
      return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;
    }
  
  return (
    <div className="min-h-screen bg-background">
  
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Welcome back, John 👋</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Players</p>
                    <h2 className="text-2xl font-bold">{stats.totalPlayers}</h2>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
      
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Scouts</p>
                    <h2 className="text-2xl font-bold">{stats.activeScouts}</h2>
                  </div>
                  <UserCheck className="h-8 w-8 text-primary" />
                </div>
  
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                    <h2 className="text-2xl font-bold">{stats.totalTeams}</h2>
                  </div>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
        
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Blogs Posted</p>
                    <h2 className="text-2xl font-bold">{stats.reportsGenerated}</h2>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
               
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Player Growth Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Position Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.type === "player" ? (
                      <Users className="h-4 w-4 text-primary" />
                    ) : (
                      <Trophy className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity.type === "player" ? "New player added" : "Team updated"}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.name}</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </Card>
          </div>
        </main>
      </div>
  );
}