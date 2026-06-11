"use client";

import { getAllGlossaryTerms } from "@/lib/data-access";
import { GlossaryTerm } from "@/lib/types";
import { TermLink, CitationLink } from "@/components/TermLink";

// Build term index once at module level — sorted longest-first
function buildTermIndex(): { pattern: string; id: string }[] {
  const terms = getAllGlossaryTerms();
  const entries: { pattern: string; id: string }[] = [];

  for (const term of terms) {
    // Split on "/" for synonyms: "ECG/EKG" → ["ECG", "EKG"]
    const synonyms = term.term.split("/");
    for (const syn of synonyms) {
      const trimmed = syn.trim();
      if (trimmed.length > 0) {
        entries.push({ pattern: trimmed, id: term.id });
      }
    }
    // Also add the Chinese part if the term contains "/"
    // e.g. "心电信号/ECG" → add both "心电信号" and "ECG"
  }

  // Sort by pattern length descending (longest-first to prevent partial matches)
  entries.sort((a, b) => b.pattern.length - a.pattern.length);
  return entries;
}

const termIndex = buildTermIndex();

// Citation regex: [ref-xxx]
const CITATION_RE = /\[ref-([a-z0-9-]+)\]/g;

interface TextSegment {
  type: "text";
  text: string;
}

interface TermSegment {
  type: "term";
  termId: string;
  text: string;
}

interface CitationSegment {
  type: "citation";
  refId: string;
}

type Segment = TextSegment | TermSegment | CitationSegment;

function parseParagraph(text: string): Segment[] {
  const segments: Segment[] = [];
  const consumed = new Set<number>(); // character indices already matched

  // First pass: find all citation markers
  let citMatch: RegExpExecArray | null;
  CITATION_RE.lastIndex = 0;
  while ((citMatch = CITATION_RE.exec(text)) !== null) {
    const start = citMatch.index;
    const end = start + citMatch[0].length;
    // Mark citation range as consumed
    for (let i = start; i < end; i++) consumed.add(i);
  }

  // Second pass: find glossary terms (longest-first, skip consumed positions)
  const termMatches: { start: number; end: number; termId: string; text: string }[] = [];
  for (const entry of termIndex) {
    let pos = 0;
    while ((pos = text.indexOf(entry.pattern, pos)) !== -1) {
      const end = pos + entry.pattern.length;
      // Check if this span overlaps with already consumed positions
      let overlaps = false;
      for (let i = pos; i < end; i++) {
        if (consumed.has(i)) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        termMatches.push({ start: pos, end, termId: entry.id, text: entry.pattern });
        // Mark as consumed
        for (let i = pos; i < end; i++) consumed.add(i);
      }
      pos = end;
    }
  }

  // Third pass: merge all matches and fill text gaps
  type AnyMatch =
    | { start: number; end: number; kind: "term"; termId: string; text: string }
    | { start: number; end: number; kind: "citation"; termId: string; text: string; refId: string };

  const allMatches: AnyMatch[] = [
    ...termMatches.map((m) => ({ start: m.start, end: m.end, kind: "term" as const, termId: m.termId, text: m.text })),
  ];

  // Re-scan for citations
  CITATION_RE.lastIndex = 0;
  while ((citMatch = CITATION_RE.exec(text)) !== null) {
    allMatches.push({
      start: citMatch.index,
      end: citMatch.index + citMatch[0].length,
      kind: "citation" as const,
      termId: "",
      text: citMatch[0],
      refId: citMatch[1],
    });
  }

  // Sort by start position
  allMatches.sort((a, b) => a.start - b.start);

  // Build segments with text gaps
  let cursor = 0;
  for (const match of allMatches) {
    if (match.start > cursor) {
      // Text segment for the gap
      segments.push({ type: "text", text: text.slice(cursor, match.start) });
    }

    if (match.kind === "term") {
      segments.push({ type: "term", termId: match.termId, text: match.text });
    } else if (match.kind === "citation") {
      segments.push({ type: "citation", refId: match.refId });
    }

    cursor = match.end;
  }

  // Remaining text
  if (cursor < text.length) {
    segments.push({ type: "text", text: text.slice(cursor) });
  }

  return segments;
}

interface DescriptionRendererProps {
  text: string;
}

export function DescriptionRenderer({ text }: DescriptionRendererProps) {
  if (!text) return null;

  const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => {
        const segments = parseParagraph(paragraph);
        return (
          <p key={i} className="text-text-body leading-relaxed">
            {segments.map((seg, j) => {
              if (seg.type === "text") {
                return <span key={j}>{seg.text}</span>;
              }
              if (seg.type === "term") {
                return <TermLink key={j} termId={seg.termId}>{seg.text}</TermLink>;
              }
              if (seg.type === "citation") {
                return <CitationLink key={j} refId={seg.refId} />;
              }
              return null;
            })}
          </p>
        );
      })}
    </div>
  );
}
