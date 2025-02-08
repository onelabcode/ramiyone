'use client';

import { Bell } from 'lucide-react';


export function NotificationBell({ unreadCount, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-blue-50 rounded-full transition-colors"
    >
      <Bell className="h-6 w-6 text-blue-600" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}