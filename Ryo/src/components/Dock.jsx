import { Search } from "lucide-react";
import {
  FaTiktok,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GlassEffect } from "./ui/liquid-glass";

const icons = [
  { key: "search", Icon: Search, label: "Search" },
  { key: "tiktok", Icon: FaTiktok, label: "TikTok" },
  { key: "youtube", Icon: FaYoutube, label: "YouTube" },
  { key: "facebook", Icon: FaFacebookF, label: "Facebook" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram" },
  { key: "x", Icon: FaXTwitter, label: "X" },
];

export default function Dock() {
  return (
    <nav
      className="fixed z-30 left-1/2 top-3 -translate-x-1/2 md:left-6 md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
      aria-label="Social dock"
    >
      <GlassEffect className="flex-row items-center rounded-3xl px-3 py-2 gap-0 md:w-16 md:flex-col md:px-0 md:py-6 hover:rounded-4xl">
        <div className="flex flex-row items-center gap-3 md:flex-col md:gap-6">
          {icons.map(({ key, Icon, label }) => (
            <button
              key={key}
              type="button"
              aria-label={label}
              className="rounded-full bg-black/70 p-2.5 md:p-3 text-white transition-transform hover:scale-105 shrink-0"
            >
              <Icon size={16} className="md:hidden" strokeWidth={key === "search" ? 2 : undefined} />
              <Icon size={18} className="hidden md:block" strokeWidth={key === "search" ? 2 : undefined} />
            </button>
          ))}
        </div>
      </GlassEffect>
    </nav>
  );
}