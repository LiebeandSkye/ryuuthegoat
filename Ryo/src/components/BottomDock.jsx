import { GlassEffect } from "./ui/liquid-glass";

const dockIcons = [
  {
    name: "Start",
    svg: (
      <svg viewBox="0 0 24 24" fill="#0078d4" className="w-10 h-10">
        <path d="M0 0h11.4v11.4H0V0zm12.6 0H24v11.4H12.6V0zM0 12.6h11.4V24H0V12.6zm12.6 0H24V24H12.6V12.6z"/>
      </svg>
    )
  },
  {
    name: "Spotify",
    svg: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <circle cx="12" cy="12" r="12" fill="#1DB954" />
        <path d="M17.356 16.593c-.2.327-.626.432-.953.232-2.617-1.6-5.913-1.962-9.794-1.075-.37.085-.745-.148-.83-.518-.085-.37.148-.745.518-.83 4.24-.97 7.89-.56 10.825 1.233.327.2.433.627.234.958zm1.503-3.13c-.25.408-.787.54-1.196.29-3.003-1.847-7.58-2.382-11.12-1.306-.458.14-.94-.114-1.08-.57-.14-.458.113-.94.57-1.08 4.04-1.226 9.098-.623 12.536 1.492.408.25.54.787.29 1.196zm.13-3.238c-3.6-2.138-9.525-2.336-12.96-1.292-.553.167-1.128-.15-1.296-.704-.168-.553.15-1.127.703-1.295 3.96-1.2 10.5-1 14.64 1.458.498.295.66.932.365 1.43-.296.498-.933.66-1.43.365z" fill="#000000"/>
      </svg>
    )
  },
  {
    name: "Photoshop",
    svg: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <rect width="24" height="24" rx="5" fill="#001829" stroke="#00c8ff" strokeWidth="1.5" />
        <text x="4.5" y="16.5" fill="#00c8ff" fontFamily="sans-serif" fontSize="12" fontWeight="900">Ps</text>
      </svg>
    )
  },
  {
    name: "Chrome",
    svg: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path d="M12 0C8.21 0 4.89 2.11 3.2 5.23l4.38 7.59c.28-.85.87-1.56 1.65-2.01.78-.45 1.69-.59 2.57-.4L12 10.41l7.8 7.8c.2-.5.3-1.02.3-1.56 0-3.31-2.69-6-6-6z" fill="#DB4437"/>
        <path d="M7.58 12.82l-4.38-7.59C1.3 7.82.2 10.79.2 14c0 4.29 2.27 8.05 5.67 10.15l4.38-7.59c-.44-.78-.58-1.69-.4-2.57.18-.88.7-1.63 1.45-2.09l-3.72-.08z" fill="#0F9D58"/>
        <path d="M16.42 12.82l3.72.08c-.46.75-.98 1.27-1.45 2.09-.44.78-.58 1.69-.4 2.57.18.88.7 1.63 1.45 2.09l-4.38 7.59C18.73 25.07 21 21.31 21 17c0-3.21-1.1-6.18-3-8.77z" fill="#F4B400"/>
        <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
        <circle cx="12" cy="12" r="4" fill="#4285F4"/>
      </svg>
    )
  },
  {
    name: "AfterEffects",
    svg: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <rect width="24" height="24" rx="5" fill="#140026" stroke="#d68fff" strokeWidth="1.5" />
        <text x="3.5" y="16.5" fill="#d68fff" fontFamily="sans-serif" fontSize="12" fontWeight="900">Ae</text>
      </svg>
    )
  },
  {
    name: "Discord",
    svg: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <circle cx="12" cy="12" r="12" fill="#5865F2" />
        <path d="M17.84 6.84a12.02 12.02 0 00-3.08-1c-.05.1-.11.23-.15.34a11.08 11.08 0 00-3.22 0 4.13 4.13 0 00-.16-.34 12.02 12.02 0 00-3.08 1 12.28 12.28 0 00-1.92 7.73c1.29.98 2.5 1.57 3.7 1.95a8.77 8.77 0 00.77-1.28c-.44-.17-.86-.38-1.25-.63.1-.08.2-.16.3-.25 2.4 1.15 5 1.15 7.37 0 .1.09.2.17.3.25-.39.25-.81.46-1.25.63a8.88 8.88 0 00.77 1.28c1.2-.38 2.41-.97 3.7-1.95a12.28 12.28 0 00-1.92-7.73zM9.73 12.05c-.7 0-1.28-.67-1.28-1.48 0-.82.56-1.48 1.28-1.48.73 0 1.3.67 1.28 1.48 0 .81-.56 1.48-1.28 1.48zm4.54 0c-.7 0-1.28-.67-1.28-1.48 0-.82.56-1.48 1.28-1.48.73 0 1.3.67 1.28 1.48 0 .81-.56 1.48-1.28 1.48z" fill="#FFFFFF" />
      </svg>
    )
  }
];

export default function BottomDock() {
  return (
    <nav
      className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2"
      aria-label="App dock"
    >
      <GlassEffect className="rounded-[28px] p-2.5 shadow-2xl">
        <div className="flex items-center justify-center gap-3.5 px-2 overflow-hidden">
          {dockIcons.map((icon) => (
            <button
              key={icon.name}
              type="button"
              aria-label={icon.name}
              className="w-12 h-12 transition-all duration-300 hover:scale-115 cursor-pointer flex items-center justify-center rounded-[14px] hover:bg-white/5 active:scale-95"
            >
              {icon.svg}
            </button>
          ))}
        </div>
      </GlassEffect>
    </nav>
  );
}
