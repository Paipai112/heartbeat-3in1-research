"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getGlossaryTermById } from "@/lib/data-access";

interface GlossaryPopupProps {
  termId: string;
  children: React.ReactNode;
}

export function GlossaryPopup({ termId, children }: GlossaryPopupProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const term = getGlossaryTermById(termId);

  function show() {
    if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
    setVisible(true);
  }

  function hide() {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  }

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 200 ? "bottom" : "top");
    }
  }, []);

  useEffect(() => {
    if (visible) {
      updatePosition();
      function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") setVisible(false);
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [visible, updatePosition]);

  if (!term) return <>{children}</>;

  return (
    <span
      ref={triggerRef}
      className="relative inline"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          ref={popupRef}
          role="tooltip"
          className={`absolute left-1/2 -translate-x-1/2 z-50 w-64 pointer-events-none ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className="glass-elevated rounded-xl p-4 shadow-card-hover animate-scale-in pointer-events-auto">
            <p className="text-sm font-heading font-semibold text-text-primary">
              {term.term}
            </p>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed line-clamp-3">
              {term.definition}
            </p>
            <Link
              href={`/glossary/${term.id}`}
              className="mt-2 inline-flex items-center gap-1 text-xs text-[#60A5FA] hover:text-[#93C5FD] transition-colors"
            >
              查看详情
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 2h5v5M9 1L4 6" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </span>
  );
}

interface TermLinkProps {
  termId: string;
  children?: React.ReactNode;
}

export function TermLink({ termId, children }: TermLinkProps) {
  const term = getGlossaryTermById(termId);
  const displayText = children ?? term?.term ?? termId;

  return (
    <GlossaryPopup termId={termId}>
      <Link
        href={`/glossary/${termId}`}
        className="inline border-b border-dashed border-[#60A5FA]/40 text-[#60A5FA] hover:text-[#93C5FD] hover:border-[#93C5FD] transition-colors cursor-help"
        onClick={(e) => e.stopPropagation()}
      >
        {displayText}
      </Link>
    </GlossaryPopup>
  );
}

interface CitationLinkProps {
  refId: string;
}

export function CitationLink({ refId }: CitationLinkProps) {
  const displayId = refId.replace(/^ref-/, "");
  return (
    <Link
      href={`/references#${refId}`}
      className="inline-flex items-center text-xs text-[#C084FC] hover:text-[#A78BFA] transition-colors ml-0.5"
      aria-label={`引用: ${displayId}`}
    >
      [{displayId}]
    </Link>
  );
}
