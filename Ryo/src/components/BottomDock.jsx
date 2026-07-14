import { LayoutGrid } from "lucide-react";
import { SiDiscord, SiGooglechrome, SiSpotify } from "react-icons/si";

function Badge({ children }) {
  return <span className="text-sm font-bold tracking-tight">{children}</span>;
}

const apps = [
  {
    key: "start",
    label: "Start",
    bg: "bg-slate-800",
    color: "text-white",
    render: () => <LayoutGrid size={22} />,
  },
  {
    key: "spotify",
    label: "Spotify",
    bg: "bg-[#1DB954]",
    color: "text-white",
    render: () => <SiSpotify size={22} />,
  },
  {
    key: "ps",
    label: "Photoshop",
    bg: "bg-[#31A8FF]",
    color: "text-white",
    render: () => <Badge>Ps</Badge>,
  },
  {
    key: "chrome",
    label: "Chrome",
    bg: "bg-white",
    color: "text-[#4285F4]",
    render: () => <SiGooglechrome size={22} />,
  },
  {
    key: "ae",
    label: "After Effects",
    bg: "bg-[#9999FF]",
    color: "text-[#1F0740]",
    render: () => <Badge>Ae</Badge>,
  },
  {
    key: "discord",
    label: "Discord",
    bg: "bg-[#5865F2]",
    color: "text-white",
    render: () => <SiDiscord size={22} />,
  },
];

export default function BottomDock() {
  return (
    <nav
      className="glass-panel fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded-pill px-6 py-3"
      aria-label="App dock"
    >
      {apps.map(({ key, label, bg, color, render }) => (
        <button
          key={key}
          type="button"
          aria-label={label}
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${bg} ${color} shadow-md transition-transform hover:-translate-y-1`}
        >
          {render()}
        </button>
      ))}
    </nav>
  );
}
