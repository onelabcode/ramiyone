"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Filter,
  Mail,
  Edit3,
  PieChart,
  Shield,
  ChevronRight,
  MenuIcon,
  CheckCircle,
  UserPlus,
  CalendarDays,
  Layout,
  Newspaper,
  Building,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const navItems = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    page: "Overview",
  },
  { id: 2, icon: <Users size={20} />, label: "Manager", page: "PlayerManager" },
  { id: 3, icon: <Filter size={20} />, label: "Filter", page: "Explorefilter" },
  {
    id: 4,
    icon: <CheckCircle size={20} />,
    label: "Suggested Players",
    page: "PlayerApprove",
  },
  {
    id: 5,
    icon: <UserPlus size={20} />,
    label: "Scout Request",
    page: "PlayerRequests",
  },
  { id: 6, icon: <Mail size={20} />, label: "Request", page: "RequestScoute" },
  {
    id: 7,
    icon: <CalendarDays size={20} />,
    label: "Trial Request",
    page: "trialout",
  },
  {
    id: 8,
    icon: <Edit3 size={20} />,
    label: "Content",
    page: "ContentCreation",
  },
  {
    id: 9,
    icon: <Newspaper size={20} />,
    label: "Transfer News",
    page: "TransferNews",
  },
  {
    id: 10,
    icon: <Building size={20} />,
    label: "Club News",
    page: "ClubNewsDashboard",
  },
  {
    id: 11,
    icon: <UserCog size={20} />,
    label: "Managers",
    page: "ManagerDash",
  },
  {
    id: 12,
    icon: <Layout size={20} />,
    label: "Brand Logo",
    page: "BrandLogo",
  },
  {
    id: 13,
    icon: <PieChart size={20} />,
    label: "Announcements",
    page: "Announcement",
  },
  { id: 14, icon: <Shield size={20} />, label: "Admin", page: "Adminpanel" },
];

export default function SidebarDash({ setPage }) {
  const [active, setActive] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative h-screen bg-background border-r px-4 pb-10 pt-6 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <h2
          className={cn(
            "font-semibold tracking-tight transition-all",
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
          )}
        >
          Dashboard
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-secondary/50 rounded-full"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <MenuIcon size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant={active === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all mb-1 h-10 hover:bg-secondary/50 rounded-lg",
                    isCollapsed ? "px-3" : "px-4",
                    active === item.id && "bg-secondary font-medium",
                    active === item.id && isCollapsed && "px-3"
                  )}
                  onClick={() => {
                    setActive(item.id);
                    setPage(item.page);
                  }}
                  aria-label={item.label}
                >
                  <span
                    className={cn(
                      "transition-transform duration-300",
                      isCollapsed && "transform scale-110"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={cn(
                      "transition-all duration-300 text-sm",
                      isCollapsed
                        ? "opacity-0 invisible w-0"
                        : "opacity-100 visible"
                    )}
                  >
                    {item.label}
                  </span>
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent
                  side="right"
                  className="ml-1 text-sm text-white bg-gray-800 rounded-md"
                >
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </div>
  );
}
