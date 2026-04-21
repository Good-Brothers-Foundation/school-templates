"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./Navlinks";
import AppButton from "@/components/template-1/AppButton";
import MobileDrawer from "./MobileDrawer";
import Wrapper from "@/components/ui/Wrapper";

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
    document.body.style.background = `${"#FFF9EA"}`;
    return () => {
      document.body.style.paddingTop = "";
      document.body.style.background = "";
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out font-quicksand ",
          scrolled
            ? " backdrop-blur-md shadow-lg h-20"
            : " h-24 lg:h-28",
        )}
        style={
          !scrolled
            ? {
                backgroundImage: "url('/template-1/top-bar.png')",
                backgroundSize: "auto 100%",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "bottom",
                backgroundColor: "transparent",
              }
            : {}
        }
      >
        <Wrapper
          className={cn(
            "px-4 sm:px-6 h-full flex items-center justify-between",
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
            {/* <button
              aria-label="Search"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/20",
              )}
            >
              <Search size={18} strokeWidth={1.7} />
            </button> */}

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
        </Wrapper>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
