import profile from "../assets/ryo/profile.webp";

export default function ProfileBar() {
  return (
    <div className="fixed right-8 top-8 z-30 flex items-center gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-xs font-bold tracking-tight text-white shadow-lg ring-1 ring-white/20"
        aria-hidden
      >
        あ
      </div>

      <div className="glass-panel flex items-center gap-3 rounded-pill py-2 pl-5 pr-2">
        <span className="font-jp text-sm font-semibold text-white drop-shadow">
          Ryō リョウ
        </span>
        <img
          src={profile}
          alt="Profile"
          className="h-9 w-9 rounded-full object-cover ring-2 ring-purple-300/60"
          draggable={false}
        />
      </div>
    </div>
  );
}
