import React from 'react'

const Arrangematch = () => {
  return (
    <div className="overflow-y-auto max-h-72">
    <table className="w-full text-left border-collapse">
      <thead className="sticky top-0 z-10 bg-white">
        <tr>
          <th className="text-gray-500 p-4 border-b text-sm font-medium">Scoute name</th>
          <th className="text-gray-500 p-4 border-b text-sm font-medium">Player name</th>
          <th className="text-gray-500 p-4 border-b text-sm font-medium">Decline</th>
          <th className="text-gray-500 p-4 border-b text-sm font-medium">Accept</th>
        </tr>
      </thead>
      <tbody className="">
        {[
          { name: "Bereket Daniel", nationality: "Ethiopia", club: "Club one"},
          { name: "Benjamin Endale", nationality: "Ethiopia", club: "Club one"},
          { name: "Aman Markos", nationality: "Ethiopia", club: "Club one"},
        ].map((player, index) => (
          <tr key={index}>
            <td className="text-sm p-1 text-gray-900">{player.name}</td>
            <td className="text-sm p-1 text-gray-900">{player.nationality}</td>
            <td >
              <button className="text-red-500 border border-red-500 rounded-lg py-1 px-3">Decline</button>
            </td>
            <td className="text-sm p-1 text-gray-900 space-x-2">
            <button className="text-blue-500 border border-blue-500 rounded-lg py-1 px-3">Accept</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Arrangematch