"use client"

import { useEffect, useState } from "react"

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/visitor/increment`, {
      method: "POST",
    })
      .then(() => {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/visitor/count`);
      })
      .then(res => res.json())
      .then(data => {
        setVisitorCount(data.count);
      })
      .catch(() => setVisitorCount("N/A"));
  }, []);

  return (
    <footer className="bg-white/50 z-10 backdrop-blur">
      <div className="mx-auto max-w-4xl text-center py-2 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Indian Audit & Accounts Department, Karnataka</p>
        <p>
          Total Visitors: {visitorCount === null ? "Loading..." : visitorCount}
        </p>
      </div>
    </footer>
  );
}