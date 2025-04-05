"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props) {
  const pathname = usePathname();
  const active = pathname === props.path;

  return (
    <Link
      className={`px-2 py-2 rounded transition duration-200 ${
        active
          ? "bg-gray-300 opacity-200"
          : "opacity-50 hover:bg-gray-300 hover:opacity-100"
      }`}
      href={props.path}
    >
      {props.text}
    </Link>
  );
}