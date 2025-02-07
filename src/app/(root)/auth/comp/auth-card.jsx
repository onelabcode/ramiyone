import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AuthCard({ children, headerContent }) {
  return (
    <Card className={"w-full max-w-[400px] shadow-lg"}>
      {headerContent && (
        <CardHeader className="space-y-1">{headerContent}</CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
