import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StatusTabs({ activeTab, onChange }) {
  return (
    <Tabs value={activeTab} onValueChange={onChange} className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All Requests</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="accepted">Accepted</TabsTrigger>
        <TabsTrigger value="declined">Declined</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
