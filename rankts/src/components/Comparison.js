import React from 'react';

export default function Comparison({ songA, songB, onSelect }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <button
        onClick={() => onSelect('current')}
        className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600"
      >
        {songA.title}
      </button>
      <span className="text-lg font-semibold">vs</span>
      <button
        onClick={() => onSelect('ranked')}
        className="bg-purple-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-purple-600"
      >
        {songB.title}
      </button>
    </div>
  );
}
