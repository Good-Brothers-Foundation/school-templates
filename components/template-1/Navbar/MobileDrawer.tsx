import FacebookIcon from "@/components/icons/Facebook";
import InstagramIcon from "@/components/icons/Instagram";
import TwitterIcon from "@/components/icons/Twitter";
import NavMenuItem, { NavItem } from "./NavMenuItem";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useFormContext } from "@/components/template-1/context/FormContext";
import { useSiteConfig } from "@/components/context/SiteConfigContext";

const NAV_ITEMS_DATA: NavItem[] = [
  {
    title: "Home",
    expandable: true,
    subItems: [
      { title: "Nursery", href: "/nursery" },
      { title: "Kindergarten", href: "/kindergarten" },
      { title: "Play School", href: "/play-school" },
    ],
  },
  { title: "About Us", href: "/about" },
  { title: "Programs", href: "/programs" },
  {
    title: "Pages",
    expandable: true,
    subItems: [
      { title: "Our Teachers", href: "/teachers" },
      { title: "Pricing", href: "/pricing" },
      { title: "FAQ", href: "/faq" },
    ],
  },
  { title: "Blog", href: "/blog" },
];

export default function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const formContext = useFormContext();
  const { config } = useSiteConfig();

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

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    formContext.openForm();
  };

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
            className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col justify-between min-h-[calc(100vh-80px)]">
          <nav className="flex flex-col gap-1 mb-12">
            {NAV_ITEMS_DATA.map((item, index) => (
              <NavMenuItem key={index} item={item} onClose={onClose} />
            ))}

            <Link
              href="/contact"
              onClick={handleContactClick}
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
                <p>{config.mobile}</p>
              </div>
              <div>
                <p className="font-bold text-white mb-0.5">Email</p>
                <p>{config.email}</p>
              </div>
              <div>
                <p className="font-bold text-white mb-0.5">Location</p>
                <p>{config.address}</p>
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