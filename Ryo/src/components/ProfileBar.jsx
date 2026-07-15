import profile from "../assets/ryo/profile.webp";
import { FaFigma } from "react-icons/fa";
import { GlassEffect } from "./ui/liquid-glass";

export default function ProfileBar() {
  return (
    <div className="flex items-center justify-between w-full">
      <button
        type="button"
        aria-label="Figma"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:scale-105 transition-transform shadow-md"
      >
        <FaFigma size={18} />
      </button>

      <GlassEffect className="rounded-full py-1.5 pl-4 pr-1.5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-800 tracking-wide">
            Ryōリョウ
          </span>
          <img
            src={profile}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover ring-2 ring-purple-300/40"
            draggable={false}
          />
        </div>
      </GlassEffect>
    </div>
  );
}
