import { FaWindows, FaChrome } from "react-icons/fa";
import { SiSpotify, SiDiscord } from "react-icons/si";
import { GlassEffect } from "./ui/liquid-glass";

function AppBadge({ bg, ring, textColor, label }) {
  return (
    <div
      className="w-full h-full rounded-[11px] flex items-center justify-center font-black text-[15px] tracking-tight"
      style={{ background: bg, boxShadow: `inset 0 0 0 1.5px ${ring}`, color: textColor }}
    >
      {label}
    </div>
  );
}

const dockIcons = [
  {
    name: "Start",
    node: (
      <div className="w-10 h-10 rounded-[11px] bg-[#0078d4] flex items-center justify-center">
        <FaWindows size={19} color="#ffffff" />
      </div>
    ),
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/user/31ryu45j3fg6s2x2jtwe2ot6bvwm?si=861c8b34788a4cad",
    node: (
      <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center">
        <SiSpotify size={22} color="#000000" />
      </div>
    ),
  },
  {
    name: "Photoshop",
    node: (
      <div className="w-10 h-10">
        <AppBadge bg="#001e36" ring="#31a8ff" textColor="#31a8ff" label="Ps" />
      </div>
    ),
  },
  {
    name: "Chrome",
    node: (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
        <FaChrome size={22} color="#4285F4" />
      </div>
    ),
  },
  {
    name: "AfterEffects",
    node: (
      <div className="w-10 h-10">
        <AppBadge bg="#00005b" ring="#9999ff" textColor="#9999ff" label="Ae" />
      </div>
    ),
  },
  {
    name: "Discord",
    url: "https://discord.com/users/712573524111523921",
    node: (
      <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center">
        <SiDiscord size={20} color="#ffffff" />
      </div>
    ),
  },
];

export default function BottomDock() {
  return (
    <nav
      className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2"
      aria-label="App dock"
    >
      <GlassEffect className="rounded-[28px] p-2.5 shadow-2xl">
        <div className="flex items-center justify-center gap-3.5 px-2 overflow-hidden">
          {dockIcons.map((icon) => {
            const Component = icon.url ? "a" : "button";
            return (
              <Component
                key={icon.name}
                href={icon.url}
                target={icon.url ? "_blank" : undefined}
                rel={icon.url ? "noopener noreferrer" : undefined}
                type={icon.url ? undefined : "button"}
                aria-label={icon.name}
                className="w-12 h-12 transition-all duration-300 hover:scale-115 cursor-pointer flex items-center justify-center rounded-[14px] hover:bg-white/5 active:scale-95"
              >
                {icon.node}
              </Component>
            );
          })}
        </div>
      </GlassEffect>
    </nav>
  );
}