"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { X, Plus, ArrowRight, Menu, Search } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import NavLinks from "./Navlinks";
import AppButton from "@/components/template-1/AppButton";

// ─── Icons (simplified using lucide-react where possible) ───────────────────
// Keeping custom icons for social media for brand consistency
function FacebookIcon({ size = 18, fill = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ size = 18, fill = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
    </svg>
  );
}

function InstagramIcon({ size = 18, fill = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  );
}

// ─── Mobile Drawer Component ──────────────────────────────────────────────────

interface SubItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  expandable?: boolean;
  subItems?: SubItem[];
}

const NAV_ITEMS_DATA: (NavItem | string)[] = [
  {
    title: "Home",
    expandable: true,
    subItems: [
      { title: "Nursery", href: "/nursery" },
      { title: "Kindergarten", href: "/kindergarten" },
      { title: "Play School", href: "/play-school" },
    ],
  },
  "About Us",
  "Programs",
  {
    title: "Pages",
    expandable: true,
    subItems: [
      { title: "Our Teachers", href: "/teachers" },
      { title: "Pricing", href: "/pricing" },
      { title: "FAQ", href: "/faq" },
    ],
  },
  "Blog",
];

function NavMenuItem({
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

function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none [&::-webkit-scrollbar]:hidden",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-linear-to-br from-secondary-template-1 to-secondary-template-1/90 shadow-2xl transform transition-transform duration-500 ease-out lg:hidden overflow-y-auto [&::-webkit-scrollbar]:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-secondary-template-1/95 backdrop-blur-sm border-b border-white/10 no-scrollbar">
          <Logo /> {/* Ensure Logo supports light variant */}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-4 py-6">
          <nav className="mb-10">
            {NAV_ITEMS_DATA.map((item, index) => (
              <NavMenuItem key={index} item={item} onClose={onClose} />
            ))}

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-between font-semibold text-[1.05rem] p-4 mt-2 hover:bg-primary-template-1/80 transition-colors rounded-lg group"
            >
              <span className="text-white/80">Contact</span>
              <ArrowRight
                size={20}
                className="text-white group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </nav>

          <div className="space-y-6 mb-12">
            <h4 className="text-xl font-bold text-white">Contact Info</h4>
            <div className="space-y-4 text-sm text-white/80">
              <div>
                <p className="font-bold text-white mb-0.5">Phone</p>
                <p>+1 (800) 555-0123</p>
              </div>
              <div>
                <p className="font-bold text-white mb-0.5">Email</p>
                <p>hello@kidzu.com</p>
              </div>
              <div>
                <p className="font-bold text-white mb-0.5">Location</p>
                <p>374 William S Canning Blvd, USA</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Follow us</h4>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, label: "Facebook", href: "#" },
                { Icon: TwitterIcon, label: "Twitter", href: "#" },
                { Icon: InstagramIcon, label: "Instagram", href: "#" },
              ].map(({ Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary-template-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} fill="currentColor" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Main Navbar Component ────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    const shouldBeScrolled = window.scrollY > 30;
    setScrolled(shouldBeScrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Adjust body padding to prevent layout shift when navbar becomes fixed
  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight || 80;
    document.body.style.paddingTop = `${headerHeight}px`;
    return () => {
      document.body.style.paddingTop = "";
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out bg-[#FFF9EA] font-quicksand",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg h-20"
            : "bg-[#FFF9EA] h-24 lg:h-28",
        )}
        style={
          !scrolled
            ? {
                backgroundImage: "url('/template-1/top-bar.png')",
                backgroundSize: "auto 100%",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "bottom",
                backgroundColor:"#FFF9EA"
              }
            : {}
        }
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between",
            !scrolled && "pb-4",
          )}
        >
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            <NavLinks scrolled={scrolled} />
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              aria-label="Search"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/20",
              )}
            >
              <Search size={18} strokeWidth={1.7} />
            </button>

            <div className="hidden md:block">
              <AppButton
                type="primary"
                icon
                href="/contact"
                className="shadow-sm hover:shadow-md transition-all"
              >
                Get In Touch
              </AppButton>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors",
                scrolled
                  ? "text-slate-700 hover:text-primary-template-1"
                  : "text-white hover:text-white/80",
              )}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
