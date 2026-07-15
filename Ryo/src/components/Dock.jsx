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
      className="hidden md:block fixed left-6 top-1/2 z-30 -translate-y-1/2"
      aria-label="Social dock"
    >
      <GlassEffect className="w-16 flex-col items-center rounded-3xl py-6 hover:rounded-4xl">
        <div className="flex flex-col items-center gap-6">
          {icons.map(({ key, Icon, label }) => (
            <button
              key={key}
              type="button"
              aria-label={label}
              className="rounded-full bg-black/70 p-3 text-white transition-transform hover:scale-105"
            >
              <Icon size={18} strokeWidth={key === "search" ? 2 : undefined} />
            </button>
          ))}
        </div>
      </GlassEffect>
    </nav>
  );
}
