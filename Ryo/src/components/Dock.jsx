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
  { key: "tiktok", Icon: FaTiktok, label: "TikTok", url: "https://www.tiktok.com/@sproutsgone?_r=1&_t=ZS-983Daih1TjF" },
  { key: "youtube", Icon: FaYoutube, label: "YouTube", url: "https://www.youtube.com/channel/UC37GU6V4f9KRQpPP7Rw178g" },
  { key: "facebook", Icon: FaFacebookF, label: "Facebook", url: "https://www.facebook.com/seth.fang.150332" },
  { key: "instagram", Icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/sethsgonet_t" },
  { key: "x", Icon: FaXTwitter, label: "X", url: "https://x.com/ryuuzz06" },
];

export default function Dock() {
  return (
    <nav
      className="fixed z-30 left-1/2 top-3 -translate-x-1/2 md:left-6 md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
      aria-label="Social dock"
    >
      <GlassEffect className="flex-row items-center rounded-3xl px-3 py-2 gap-0 md:w-16 md:flex-col md:px-0 md:py-6 hover:rounded-4xl">
        <div className="flex flex-row items-center gap-3 md:flex-col md:gap-6">
          {icons.map(({ key, Icon, label, url }) => {
            const Component = url ? "a" : "button";
            return (
              <Component
                key={key}
                href={url}
                target={url ? "_blank" : undefined}
                rel={url ? "noopener noreferrer" : undefined}
                type={url ? undefined : "button"}
                aria-label={label}
                className="rounded-full bg-black/70 p-2.5 md:p-3 text-white transition-transform hover:scale-105 shrink-0 flex items-center justify-center"
              >
                <Icon size={16} className="md:hidden" strokeWidth={key === "search" ? 2 : undefined} />
                <Icon size={18} className="hidden md:block" strokeWidth={key === "search" ? 2 : undefined} />
              </Component>
            );
          })}
        </div>
      </GlassEffect>
    </nav>
  );
}