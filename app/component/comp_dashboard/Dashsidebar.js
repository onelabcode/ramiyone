'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger,TooltipProvider } from '@/components/ui/tooltip';


const navItems = [
  { id: 1, icon: <LayoutDashboard size={22} />, label: 'Dashboard', page: 'Overview' },
  { id: 2, icon: <Users size={22} />, label: 'Manager', page: 'PlayerManager' },
  { id: 3, icon: <Filter size={22} />, label: 'Filter', page: 'Explorefilter' },
  { id: 4, icon: <CheckCircle size={22} />, label: 'Suggested Players', page: 'PlayerApprove' },
  { id: 5, icon: <UserPlus size={22} />, label: 'Scout Request', page: 'PlayerRequests' },
  { id: 6, icon: <Mail size={22} />, label: 'Request', page: 'RequestScoute' },
  { id: 7, icon: <CalendarDays size={22} />, label: 'Trial Request', page: 'trialout' },
  { id: 8, icon: <Edit3 size={22} />, label: 'Content', page: 'ContentCreation' },
  { id: 9, icon: <PieChart size={22} />, label: 'Announcements', page: 'Announcement' },
  { id: 10, icon: <Shield size={22} />, label: 'Admin', page: 'Adminpanel' },

];


export default function SidebarDash({ setPage }) {
  const [active, setActive] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative h-screen bg-background border-r px-7 pb-10 pt-6 transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className={cn("font-semibold tracking-tight transition-all",
          isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
        )}>
          Dashboard
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-secondary"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <MenuIcon size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      
      <nav className="space-y-2">
      <TooltipProvider>
        {navItems.map((item) => (

          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={active === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-4 transition-all",
                  isCollapsed ? "px-3" : "px-4",
                  active === item.id && "bg-secondary font-medium",
                  active === item.id && isCollapsed && "px-3"
                )}
                onClick={() => {
                  setActive(item.id);
                  setPage(item.page);
                }}
              >
                <span className={cn(
                  "transition-transform duration-300",
                  isCollapsed && "transform scale-110"
                )}>
                  {item.icon}
                </span>
                <span
                  className={cn(
                    "transition-all duration-300",
                    isCollapsed ? "opacity-0 invisible w-0" : "opacity-100 visible"
                  )}
                >
                  {item.label}
                </span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="ml-1 text-white bg-gray-800">
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