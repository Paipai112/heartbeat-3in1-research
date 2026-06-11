"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";

interface MobileNavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: MobileNavLink[];
  externalLink?: { label: string; href: string };
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function MobileNav({ open, onClose, links, externalLink }: MobileNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-72 bg-surface-elevated border-l border-border-subtle animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
          <span className="text-sm font-heading font-semibold text-text-primary">
            导航
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="关闭菜单"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col p-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {externalLink && (
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <a
                href={externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
              >
                {externalLink.label}
              </a>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
