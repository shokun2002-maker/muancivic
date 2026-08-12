import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-emerald-200/80 font-medium">
      <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5 text-emerald-300" />
        <span>HOME</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.name}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-emerald-400/60 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-white font-bold">{item.name}</span>
            ) : (
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
