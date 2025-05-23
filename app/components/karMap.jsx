'use client';
import React, { useState } from 'react';

const KarnatakaMap = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Example district path */}
        <path
          d="M100,100 L200,100 L200,200 L100,200 Z"
          fill="#ccc"
          stroke="#999"
          strokeWidth="1"
          onMouseEnter={() => setHoveredDistrict('Bengaluru')}
          onMouseLeave={() => setHoveredDistrict(null)}
          className="transition-transform transform hover:scale-105 hover:fill-purple-400"
        />
        {/* Repeat for other districts */}
      </svg>
      {hoveredDistrict && (
        <div className="absolute top-0 left-0 bg-white p-2 text-sm shadow rounded">
          {hoveredDistrict}
        </div>
      )}
    </div>
  );
};

export default KarnatakaMap;
