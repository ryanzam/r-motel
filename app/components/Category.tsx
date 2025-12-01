'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { useCallback } from "react";

interface CategoryProps {
  text: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ text, icon: Icon, selected }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    if (selected) {
      params.delete("category");
    } else {
      params.set("category", text);
    }
    router.push(`/?${params.toString()}`);
  }, [selected, text, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3
        border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
        }
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{text}</div>
    </div>
  );
};

export default Category;