import { Search } from 'lucide-react';

export default function SearchHeader() {
  return (
    <div className="flex flex-col space-y-5 mx-auto items-center text-center max-w-3xl mb-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-gray-900">
        Explore Players
      </h1>
      <p className="w-full sm:w-2/3 text-gray-600 text-base md:text-lg">
        DFT Football Club has organized recruitment for under 17 and 1st division in 2017.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-sm:items-center">
        <div className="relative w-3/4 sm:w-2/3 md:w-1/2">
          <input
            type="text"
            className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-full bg-white px-6 py-3 pl-12"
            placeholder="Search a player"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <button className="rounded-full text-white bg-blue-600 px-8 py-3 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
          Search
        </button>
      </div>
    </div>
  );
}