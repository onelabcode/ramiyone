"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useTransferNewStore } from "services/TransferState";

export default function NewsSection() {
  const { fetchTransfers, transfers } = useTransferNewStore();

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Latest Transfers
            </span>
          </div>
        </div>
        <button className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
          More News
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {transfers &&
          transfers.map((item, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-none">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-purple-900 leading-tight">
                    {item.title}
                  </h3>
                  <div className="text-sm text-gray-600">{item.body}</div>
                  <div className="text-xs text-gray-500">{item.created_at}</div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
