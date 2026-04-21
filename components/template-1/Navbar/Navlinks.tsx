'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    children: [
      { label: 'Welcome',  href: '/' },
      { label: 'Features', href: '/#features' },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Story',   href: '/about' },
      { label: 'Our Team',    href: '/about/team' },
      { label: 'Careers',     href: '/about/careers' },
    ],
  },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Early Explorers',    href: '/programs/early-explorers' },
      { label: 'Creative Arts',      href: '/programs/creative-arts' },
      { label: 'Science & Discovery',href: '/programs/science' },
    ],
  },
  {
    label: 'Pages',
    href: '/pages',
    children: [
      { label: 'Gallery',  href: '/gallery' },
      { label: 'Events',   href: '/events' },
      { label: 'FAQ',      href: '/faq' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      { label: 'Latest Posts', href: '/blog' },
      { label: 'Categories',  href: '/blog/categories' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [],
  },
] as const

// ─── Chevron ──────────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn(
        'ml-0.5 shrink-0 transition-transform duration-200',
        open && 'rotate-180',
      )}
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function Dropdown({ items }: { items: readonly { label: string; href: string }[] }) {
  return (
    <div
      className={cn(
        'absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2',
        'min-w-[170px] rounded-xl bg-white shadow-dropdown',
        'p-1.5 z-50 animate-dropdown-fade',
      )}
      role="menu"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          role="menuitem"
          className={cn(
            'block px-3.5 py-2 rounded-lg text-[0.875rem] font-medium text-secondary',
            'transition-colors duration-150',
            'hover:bg-primary/10 hover:text-primary',
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

// ─── NavLinks ─────────────────────────────────────────────────────────────────

interface NavLinksProps {
  scrolled: boolean
}

export default function NavLinks({ scrolled }: NavLinksProps) {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-0.5">
        {NAV_ITEMS.map(({ label, href, children }) => {
          const hasDropdown = children.length > 0
          const isOpen = openItem === label

          return (
            <li
              key={label}
              className="relative"
              onMouseEnter={() => hasDropdown && setOpenItem(label)}
              onMouseLeave={() => setOpenItem(null)}
            >
              <Link
                href={href}
                aria-haspopup={hasDropdown ? 'true' : undefined}
                aria-expanded={isOpen}
                className={cn(
                  'inline-flex items-center gap-1 px-3.5 py-2 rounded-lg',
                  'text-[0.9rem] font-medium text-secondary whitespace-nowrap',
                  'transition-colors duration-150',
                  scrolled
                    ? 'hover:bg-primary/8 hover:text-primary'
                    : 'hover:bg-white/25 hover:text-primary',
                )}
              >
                {label}
                {hasDropdown && <Chevron open={isOpen} />}
              </Link>

              {hasDropdown && isOpen && <Dropdown items={children} />}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}