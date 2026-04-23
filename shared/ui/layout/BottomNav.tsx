"use client";

import Link from "next/link";
import { House, Shirt, ThumbsUp, Plus, Package2 } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈", icon: House },
  { href: "/clothes", label: "옷장", icon: Package2 },
  { href: "/clothes/new", label: "", icon: Plus, isPrimary: true },
  { href: "/coordi", label: "코디", icon: Shirt },
  { href: "/recommend", label: "추천", icon: ThumbsUp },
];
const BottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="mx-auto h-16 max-w-md grid grid-cols-5 items-center px-2">
        {navItems.map(({ href, label, icon: Icon, isPrimary }) => {
          const isActive = pathname === href;
          if (isPrimary) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center"
              >
                <div className="flex h-12 w-12 text-white items-center justify-center rounded-full bg-black shoadow-md">
                  <Icon size={20} />
                </div>
              </Link>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 text-xs ${isActive ? "text-black fonrt-semibold" : "text-gray-500"}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
