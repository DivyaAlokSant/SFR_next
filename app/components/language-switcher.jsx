"use client";

import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LanguageSwitcher({ currentLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(currentLocale === "kn-IN");

  useEffect(() => {
    setIsChecked(currentLocale === "kn-IN");
  }, [currentLocale]);

  const changeLanguage = (newLocale) => {
    const segments = pathname.split("/").filter(Boolean);
    const locales = ["en", "kn-IN"];

    if (locales.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = `/${segments.join("/")}`;
    const params = searchParams.toString();
    router.push(params ? `${newPath}?${params}` : newPath);
  };

  const handleSwitchChange = (checked) => {
    const newLocale = checked ? "kn-IN" : "en";
    setIsChecked(checked);
    changeLanguage(newLocale);
  };

  return (
    <div className="flex items-center gap-x-4">
      <span className={`text-sm ${!isChecked ? "font-bold" : "text-gray-500"}`}>
        English
      </span>
      <Switch
        checked={isChecked}
        onChange={handleSwitchChange}
        onColor="#77842C"
        offColor="#d1d5db"
        checkedIcon={false}
        uncheckedIcon={false}
        handleDiameter={20}
        height={24}
        width={48}
      />
      <span className={`text-sm ${isChecked ? "font-bold" : "text-gray-500"}`}>
        ಕನ್ನಡ
      </span>
    </div>
  );
}