
import { Toaster } from "sonner";
import CoachProfileForm from "./CoachProfileForm";
export default function CoachProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 py-8">
      <div className="max-w-7xl mx-auto">
        <CoachProfileForm />
      </div>
      <Toaster position="bottom-right" theme="light" />
    </main>
  );
} 