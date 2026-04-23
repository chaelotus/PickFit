"use client";
import { Calendar, Bell, CircleUser } from "lucide-react";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "안녕하세요, Lotus",
  "/clothes": "아이템",
  "/clothes/new": "아이템 등록",
  "/coordi": "코디",
  "/recommend": "추천",
};
const AppHeader = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 border-b px-4 h-14 bg-white">
      <div className="mx-auto flex h-full max-w-md items-center justify-between">
        <h1 className="text-lg font-semibold">{titles[pathname]}</h1>

        <div className="flex gap-5">
          <div>
            <Calendar size={20} />
          </div>
          <div>
            <Bell size={20} />
          </div>
          <div>
            <CircleUser size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
