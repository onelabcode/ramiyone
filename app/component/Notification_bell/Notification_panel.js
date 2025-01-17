"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { NotificationBell } from "./Notification_bell";
import { NotificationItem } from "./Notification_item";
import useNotificationStore, { initializeSocketListeners } from "@/app/store/NotificationState";
import useAuthStore from "@/app/store/AuthState";
import Loading from "../Loading";
import {  Toaster } from "sonner";

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchNotificationById, notifications ,MarkAsRead,deleteNotification} = useNotificationStore();
  const { user } = useAuthStore();
  const socketInitialized = useRef(false);
  
  useEffect(() => {
    if (user?.user_id) {
      fetchNotificationById(user.user_id);
    

      if (!socketInitialized.current) {
        initializeSocketListeners(user.user_id); 
        socketInitialized.current = true; 
      }
      
      setLoading(false);
    }
  }, [fetchNotificationById, user?.user_id]);
 
  if (loading || !user) {
    return (
     <Loading/>
    );
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const markAsRead = (id) => {
    MarkAsRead(id);
  };
const deletNot=(id)=>{
  deleteNotification(id);
}
  return (
    <div className="relative">
      <NotificationBell
        unreadCount={unreadCount}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex flex-col bg-white m-4 rounded-lg shadow-2xl">
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between rounded-t-lg">
              <div>
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <p className="text-blue-100 text-sm mt-2">
                  {unreadCount} unread notifications
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-b-lg">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-500">
                  <Bell className="h-16 w-16 text-gray-400 mb-6" />
                  <p className="text-xl font-medium mb-3">
                    No notifications yet
                  </p>
                  <p className="text-gray-400">
                    We'll notify you when something arrives
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 px-4">
                  {notifications.map((notification,index) => (
                    <NotificationItem
                      key={index}
                      notification={notification}
                      onRead={markAsRead}
                      onDelete={deletNot}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
           <Toaster position="bottom-right" theme="light" />
    </div>
  );
}
