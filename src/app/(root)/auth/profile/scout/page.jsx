
import { Toaster } from "sonner";
import ScoutProfileForm from "./ScouteProfileForm";

export default function ScoutProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 py-8">
      <div className="max-w-7xl mx-auto">
        <ScoutProfileForm />
      </div>
      <Toaster position="bottom-right" theme="light" />
    </main>
  );
}