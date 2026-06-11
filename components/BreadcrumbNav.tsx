import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

function ChevronRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="#404040"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 2.5L8 6L4.5 9.5" />
    </svg>
  );
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="面包屑导航" className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="text-text-muted hover:text-text-primary transition-colors duration-150"
      >
        首页
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            <ChevronRight />
            {isLast ? (
              <span className="text-text-primary">{item.label}</span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-text-muted hover:text-text-primary transition-colors duration-150"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
