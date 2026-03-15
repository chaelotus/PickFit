"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "안녕하세요, Lotus",
  "/clothes": "아이템",
  "/clothes/new": "",
  "/coordi": "코디",
  "/recommend": "추천",
};
const AppHeader = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 border-b px-4 h-14">
      <div className="mx-auto flex h-full max-w-md items-center justify-between">
        <h1 className="text-lg font-semibold">{titles[pathname]}</h1>

        <div className="flex gap-4">
          <div>달력</div>
          <div>종</div>
          <div>마이페이지</div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
