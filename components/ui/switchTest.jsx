"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SwitchTest() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-4">
      <h1 className="text-xl font-bold">Switch Test</h1>
      <div className="flex items-center gap-x-4">
        <span className={`text-sm ${!isChecked ? "font-bold" : "text-gray-500"}`}>
          OFF
        </span>
        <Switch
          checked={isChecked}
          onCheckedChange={setIsChecked}
          className="bg-gray-200 border border-gray-300"
        />
        <span className={`text-sm ${isChecked ? "font-bold" : "text-gray-500"}`}>
          ON
        </span>
      </div>
    </div>
  );
}