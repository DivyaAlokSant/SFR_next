"use client";

import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LanguageSwitcher({ currentLocale }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Get current query parameters
  const [isChecked, setIsChecked] = useState(currentLocale === "kn-IN");

  useEffect(() => {
    // Sync the switch state with the current locale
    setIsChecked(currentLocale === "kn-IN");
  }, [currentLocale]);

  const changeLanguage = (newLocale) => {
    // Handle paths without a locale (e.g., `/` instead of `/en`)
    const segments = pathname.split("/").filter(Boolean); // Split path into segments
    const locales = ["en", "kn-IN"]; // Define supported locales

    if (locales.includes(segments[0])) {
      segments[0] = newLocale; // Replace the locale in the path
    } else {
      segments.unshift(newLocale); // Prepend the locale to the path
    }

    // Reconstruct the path with the new locale
    const newPath = `/${segments.join("/")}`;

    // Preserve query parameters
    const params = searchParams.toString();
    router.push(params ? `${newPath}?${params}` : newPath);
  };

  const handleSwitchChange = (checked) => {
    const newLocale = checked ? "kn-IN" : "en"; // Toggle between "en" and "kn-IN"
    setIsChecked(checked); // Update the switch state
    changeLanguage(newLocale); // Change the language
  };

  return (
    <div className="flex items-center gap-x-4">
      <span className={`text-sm ${!isChecked ? "font-bold" : "text-gray-500"}`}>
        EN
      </span>
      <Switch
        checked={isChecked}
        onChange={handleSwitchChange}
        onColor="#3b82f6" // Blue for checked state
        offColor="#d1d5db" // Gray for unchecked state
        checkedIcon={false} // No icon for checked state
        uncheckedIcon={false} // No icon for unchecked state
        handleDiameter={20} // Diameter of the thumb
        height={24} // Height of the switch
        width={48} // Width of the switch
      />
      <span className={`text-sm ${isChecked ? "font-bold" : "text-gray-500"}`}>
        KN-IN
      </span>
    </div>
  );
}