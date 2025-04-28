"use client";

import { useState } from "react";

export default function SearchBar({ data, filterKeys, placeholder, onResults }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter the data based on the search query and filterKeys
    const filteredData = data.filter((item) =>
      filterKeys.some((key) =>
        item[key]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    // Pass the filtered results to the parent component
    onResults(filteredData);
  };

  return (
    <div className="my-3">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}