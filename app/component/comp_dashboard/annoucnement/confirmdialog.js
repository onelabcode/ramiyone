'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Bell, Mail } from 'lucide-react';

export default function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  message,
  selectedUsers,
  deliveryType,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Notification</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <span>
              <span className="font-medium">Recipients:</span>
              <span>{selectedUsers.length} users selected</span>
            </span>
            <br/>
            <span>
              <span className="font-medium">Message:</span>
              <span className="mt-1 text-sm">{message}</span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Send Notification</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}