import { LucideIcon } from "lucide-react";



export function AuthHeader({ icon: Icon, title, description }) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-8 w-8 mb-2 text-primary" />
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}