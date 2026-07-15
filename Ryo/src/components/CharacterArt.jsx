import main from "../assets/ryo/main.jpg";
// Swap these for your actual character portrait assets
import clorindeIcon from "../assets/genshin/clorinde.jpg";
import mavuikaIcon from "../assets/genshin/mavuika.jpg";
import yeShunguangIcon from "../assets/zenless/ye-shunguang.jpg";
import yixuanIcon from "../assets/zenless/yixuan.jpg";

const LABEL = "黒川 あかね";
const BIO = "some nights, even songs can't help";

const GENSHIN_CHARACTERS = [
  { name: "Clorinde", icon: clorindeIcon, rank: "top 6%", build: "C3R1" },
  { name: "Mavuika", icon: mavuikaIcon, rank: "top 13%", build: "C3R1" },
];

const ZENLESS_CHARACTERS = [
  { name: "Ye Shunguang", icon: yeShunguangIcon, rank: "top 8%", build: "M2W1" },
  { name: "Yixuan", icon: yixuanIcon, rank: "top 11%", build: "M0W1" },
];

function GameStatCard({ game, title, characters }) {
  const isGenshin = game === "genshin";

  const accentText = isGenshin ? "text-[#8FE3E0]" : "text-[#E7FF52]";
  const accentBorder = isGenshin ? "border-[#8FE3E0]/40" : "border-[#E7FF52]/40";
  const accentRing = isGenshin ? "ring-[#8FE3E0]/25" : "ring-[#E7FF52]/25";

  return (
    <div
      className={`glass-panel-dark rounded-xl px-3 py-2 flex flex-col gap-1.5 pointer-events-auto border ${accentBorder}`}
    >
      <span
        className={`font-orbitron text-[10px] tracking-[0.2em] uppercase ${accentText} select-none`}
      >
        {title}
      </span>

      <div className="flex flex-col gap-1">
        {characters.map((char) => (
          <div key={char.name} className="flex items-center gap-2">
            <img
              src={char.icon}
              alt={char.name}
              draggable={false}
              className={`w-6 h-6 rounded-full object-cover ring-1 ${accentRing} shrink-0`}
            />
            <span className="text-[11px] font-medium text-white/90 truncate select-none">
              {char.name}
            </span>
            <span
              className={`ml-auto text-[10px] font-orbitron ${accentText} whitespace-nowrap select-none`}
            >
              {char.rank} · {char.build}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CharacterArt() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
      {/* Vertical name text, upper right */}
      <div
        className="font-jp absolute right-2 md:right-4 top-[36%] text-[15px] font-extrabold tracking-widest text-black/90 select-none z-20"
        style={{ writingMode: "vertical-rl" }}
        aria-label={LABEL}
      >
        {LABEL}
      </div>

      {/* Character art */}
      <img
        src={main}
        alt={LABEL}
        className="absolute bottom-[92px] md:bottom-[110px] h-[90%] md:h-[110%] min-w-[280px] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.35)] select-none z-10"
        draggable={false}
      />

      {/* Bottom content stack: bio + two stat cards, no overlap at any width */}
      <div className="absolute bottom-2 left-0 right-0 px-3 flex flex-col gap-2 z-20">
        <div
          className="font-jp text-[13px] md:text-[15px] font-extrabold tracking-widest text-white select-none text-center"
          aria-label={BIO}
        >
          {BIO}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 ">
          <div className="flex-1 pointer-events-auto">
            <GameStatCard game="genshin" title="Genshin" characters={GENSHIN_CHARACTERS} />
          </div>
          <div className="flex-1 pointer-events-auto">
            <GameStatCard game="zenless" title="Zenless zone" characters={ZENLESS_CHARACTERS} />
          </div>
        </div>
      </div>
    </div>
  );
}