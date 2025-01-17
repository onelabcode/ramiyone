import RoleSelector from "./RoleSelector";


export default function SelectRolePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-cente p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Role</h1>
        <p className="text-gray-600">Select how you want to join our platform</p>
      </div>
      <RoleSelector />
    </main>
  );
}