import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Kidzu home">
      {/* Star-figure icon */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <polygon
          points="19,2 23,14 36,14 26,22 30,34 19,27 8,34 12,22 2,14 15,14"
          fill="var(--primary-template-1)"
          opacity="0.18"
        />
        <circle cx="22" cy="10" r="3" fill="var(--primary-template-1)" />
        <line x1="22" y1="13" x2="19" y2="22" stroke="var(--secondary-template-2)" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="22" x2="14" y2="28" stroke="var(--secondary-template-2)" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="22" x2="24" y2="28" stroke="var(--secondary-template-2)" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="16" x2="14" y2="20" stroke="var(--primary-template-1)" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="16" x2="27" y2="18" stroke="var(--primary-template-1)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <span className="font-brand font-black text-[1.6rem] leading-none tracking-tight text-secondary">
        Kidzu
      </span>
    </Link>
  )
}