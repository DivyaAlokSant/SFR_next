"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LanguageSwitcher({ currentLocale }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Get current query parameters
  const locales = ["en", "kn-IN"]; // Define your supported locales

  const changeLanguage = (newLocale) => {
    // Handle paths without a locale (e.g., `/` instead of `/en`)
    const segments = pathname.split("/").filter(Boolean); // Split path into segments
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

  return (
    <div className="flex items-center gap-x-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => changeLanguage(loc)}
          className={`px-2 py-1 rounded ${
            currentLocale === loc
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          aria-label={`Switch to ${loc.toUpperCase()}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}