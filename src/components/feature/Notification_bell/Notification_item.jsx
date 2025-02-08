"use client";

import { cn } from "@lib/utils";
import { Trash2, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export function NotificationItem({ notification, onRead, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, h:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex gap-4 p-4 transition-all duration-200 ease-in-out rounded-lg",
        notification.is_read
          ? "bg-white hover:bg-gray-50"
          : "bg-blue-50/80 hover:bg-blue-50",
        isHovered && "transform scale-[1.02]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 pt-1">
        {notification.is_read ? (
          <CheckCircle className="h-5 w-5 text-gray-400" />
        ) : (
          <Circle className="h-5 w-5 text-blue-500 fill-blue-500" />
        )}
      </div>

      <div
        className="flex-1 min-w-0"
        onClick={() => !notification.is_read && onRead(notification.id)}
      >
        <div className="flex justify-between items-start mb-1">
          <h3
            className={cn(
              "font-semibold",
              notification.is_read ? "text-gray-700" : "text-gray-900"
            )}
          >
            {notification.title}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
            {formattedDate(notification.created_at)}
          </span>
        </div>
        <p
          className={cn(
            "text-sm",
            notification.is_read ? "text-gray-500" : "text-gray-700"
          )}
        >
          {notification.body}
        </p>
      </div>
      {onDelete && (
        <div
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
            aria-label="Delete notification"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
