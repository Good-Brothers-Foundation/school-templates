"use client";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Wrapper from "@/components/ui/Wrapper";
import Logo from "../Navbar/Logo";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden pb-10 pt-20">
      {/* wave */}
      {/* <svg
        className="absolute inset-x-0 -top-px h-12 w-full text-background"
        preserveAspectRatio="none"
        viewBox="0 0 1440 60"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
        />
      </svg> */}

      <Wrapper className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            A premium kindergarten where children are nurtured with care,
            creativity, and curiosity for life.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              FacebookLogoIcon,
              InstagramLogoIcon,
              TwitterLogoIcon,
              YoutubeLogoIcon,
            ].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-full bg-card text-primary shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-black">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "About Us",
              "Programs",
              "Teachers",
              "Admission",
              "Events",
              "Contact",
            ].map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-black">Programs</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Play Group (2-3)",
              "Nursery (3-4)",
              "Kindergarten (4-5)",
              "Summer Camp",
              "After School",
              "Parent Workshops",
            ].map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-black">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" /> 123 Sunny
              Avenue, Bloomtown
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +1 (123) 0654 98
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> hello@sunnysprouts.com
            </li>
          </ul>
        </div>
      </Wrapper>

      <Wrapper className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} SunnySprouts School. Made with love for
          little learners.
        </p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-primary">
            Privacy
          </a>
          <a href="#" className="hover:text-primary">
            Terms
          </a>
          <a href="#" className="hover:text-primary">
            Cookies
          </a>
        </div>
      </Wrapper>
    </footer>
  );
}
