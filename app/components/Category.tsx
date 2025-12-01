'use client';

import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface CategoryProps {
  text: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ text, icon: Icon, selected }) => {
  const router = useRouter();

  const handleClick = () => {
    const url = new URL(window.location.href);
    if (selected) {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", text);
    }
    router.push(url.pathname + url.search);
  }

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