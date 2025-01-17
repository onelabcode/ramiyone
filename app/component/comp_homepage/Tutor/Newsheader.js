"use client";

export function NewsHeader() {
  return (
    <div className="relative mb-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-6 flex flex-col items-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            Latest Updates
          </h1>
          <div className="mt-2 flex space-x-2">
            <span className="h-1 w-12 bg-indigo-600 rounded-full"></span>
            <span className="h-1 w-6 bg-blue-600 rounded-full"></span>
            <span className="h-1 w-3 bg-blue-400 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}