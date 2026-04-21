import { cn } from "@/lib/utils";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";



interface SubItem {
  title: string;
  href: string;
}


export interface NavItem {
  title: string;
  expandable?: boolean;
  subItems?: SubItem[];
}

export default function NavMenuItem({
  item,
  onClose,
}: {
  item: NavItem | string;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isObject = typeof item === "object";
  const title = isObject ? item.title : item;
  const hasSubItems =
    isObject && item.expandable && item.subItems && item.subItems.length > 0;

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => hasSubItems && setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between p-4 group transition-all duration-200 rounded-lg",
          "hover:bg-primary-template-1/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
        )}
        aria-expanded={hasSubItems ? isExpanded : undefined}
      >
        <span className="font-semibold text-[1.05rem] text-white/80">
          {title}
        </span>
        {hasSubItems ? (
          <Plus
            size={30}
            className={cn(
              "text-white/80 transition-all duration-300 cursor-pointer",
              isExpanded &&
                "rotate-45 bg-primary-template-1 rounded-full p-2 text-secondary-template-1",
            )}
          />
        ) : (
          <ArrowRight
            size={18}
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          />
        )}
      </button>

      {hasSubItems && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? "max-h-96 opacity-100 mb-2" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex flex-col py-2 px-4 gap-2">
            {item.subItems!.map((sub, idx) => (
              <Link
                key={idx}
                href={sub.href}
                onClick={onClose}
                className="text-sm text-white hover:text-white transition-colors py-2 flex items-center gap-2 rounded hover:bg-white/5 px-2"
              >
                {/* <span className="h-1.5 w-1.5 bg-white/40 rounded-full" /> */}
                {sub.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
