import { Link } from "react-router-dom";

export function BroomMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      {/* sparkles */}
      <path
        d="M9 8.5l1.05 2.9L13 12.45l-2.95 1.05L9 16.4l-1.05-2.9L5 12.45l2.95-1.05Z"
        fill="currentColor"
      />
      <path
        d="M18.5 4l.75 2.05L21.3 6.8l-2.05.75L18.5 9.6l-.75-2.05L15.7 6.8l2.05-.75Z"
        fill="currentColor"
      />
      <path
        d="M5.5 20.5l.6 1.65 1.65.6-1.65.6-.6 1.65-.6-1.65-1.65-.6 1.65-.6Z"
        fill="currentColor"
      />
      {/* handle */}
      <path d="M35.5 4.5 23 20.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* brush head */}
      <path
        d="M26.2 15.3c3.5-3.1 9.2-2.3 10.8 2l3.3 10.6c.9 2.8-1.2 5.8-4.2 5.3l-12.5-2.1c-2.9-.5-4.2-3.9-2.3-6.3l4.9-9.5Z"
        fill="currentColor"
      />
      {/* bristle lines */}
      <path
        d="M24.7 23.6 20.6 29M28 27.2l-4.1 5.4M31.4 30.8 27.5 35.5"
        stroke="var(--color-cream)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M23.4 18.4l8.7 5.6" stroke="var(--color-cream)" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export default function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Abelia Städ & Service – Startsida">
      <BroomMark
        className={`${compact ? "h-9 w-9" : "h-11 w-11"} ${light ? "text-sage" : "text-ink"} transition-transform duration-500 group-hover:rotate-[-8deg]`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-script ${compact ? "text-[1.6rem]" : "text-[2.1rem]"} ${light ? "text-cream" : "text-ink"}`}
        >
          Abelia
        </span>
        <span
          className={`text-[0.52rem] font-semibold uppercase tracking-[0.42em] ${light ? "text-cream/70" : "text-ink-soft"}`}
        >
          Städ &amp; Service
        </span>
      </span>
    </Link>
  );
}
