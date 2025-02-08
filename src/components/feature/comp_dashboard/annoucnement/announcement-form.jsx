"use client";

import { useState } from "react";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { Select } from "@components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";
import ConfirmationDialog from "./confirmdialog";
import useNotificationStore from "services/NotificationState";

export default function NotificationForm({ selectedUsers }) {
  const [message, setMessage] = useState("");
  const [deliveryType, setDeliveryType] = useState("both");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { createNotification } = useNotificationStore();
  const handleSubmit = () => {
    if (!message.trim()) {
      toast.message({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (selectedUsers.length === 0) {
      toast.message({
        title: "Error",
        description: "Please select at least one user",
        variant: "destructive",
      });
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmedSubmit = async () => {
    const notificationData = {
      user_id: selectedUsers.join(","),
      type: "message",
      title: "RAMIYONES",
      body: message,
    };

    try {
      await createNotification(notificationData);
      setMessage("");
      setShowConfirmation(false);
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Compose Notification</CardTitle>
          <CardDescription>
            Send notifications to selected users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Select
              value={deliveryType}
              onValueChange={setDeliveryType}
            ></Select>
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full gap-2"
            onClick={handleSubmit}
            disabled={!message.trim() || selectedUsers.length === 0}
          >
            <Send className="h-4 w-4" />
            Send Notification
          </Button>
        </CardFooter>
      </Card>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleConfirmedSubmit}
        message={message}
        selectedUsers={selectedUsers}
        deliveryType={deliveryType}
      />
    </>
  );
}
