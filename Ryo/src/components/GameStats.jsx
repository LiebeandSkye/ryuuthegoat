import clorindeIcon from "../assets/genshin/clorinde.jpg";
import mavuikaIcon from "../assets/genshin/mavuika.jpg";
import yeShunguangIcon from "../assets/zenless/ye-shunguang.jpg";
import yixuanIcon from "../assets/zenless/yixuan.jpg";

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
    const accentRing = isGenshin ? "ring-[#8FE3E0]/30" : "ring-[#E7FF52]/30";
    const accentDot = isGenshin ? "bg-[#8FE3E0]" : "bg-[#E7FF52]";

    return (
        <div
            className={`glass-panel-dark rounded-xl flex-1 min-w-0 px-2.5 py-2 flex flex-col gap-1.5 border ${accentBorder} shadow-[0_4px_14px_rgba(0,0,0,0.3)]`}
        >
            <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${accentDot} shrink-0`} />
                <span
                    className={`font-orbitron text-[9px] sm:text-[10px] tracking-[0.16em] uppercase ${accentText} select-none truncate`}
                >
                    {title}
                </span>
            </div>

            <div className="flex flex-col gap-1.5">
                {characters.map((char) => (
                    <div key={char.name} className="flex items-center gap-2">
                        <img
                            src={char.icon}
                            alt={char.name}
                            draggable={false}
                            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-8 md:h-8 rounded-full object-cover ring-2 ${accentRing} shrink-0`}
                        />
                        <div className="min-w-0 flex flex-col leading-tight">
                            <span className="text-[10px] sm:text-[11px] md:text-[10px] font-medium text-white/90 truncate select-none">
                                {char.name}
                            </span>
                            <span
                                className={`text-[9px] sm:text-[10px] md:text-[9px] font-orbitron ${accentText} truncate select-none`}
                            >
                                {char.rank} · {char.build}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function GameStats() {
    return (
        <div className="flex flex-row gap-2 w-full md:w-[210px]">
            <GameStatCard game="genshin" title="Genshin" characters={GENSHIN_CHARACTERS} />
            <GameStatCard game="zenless" title="Zenless Zone" characters={ZENLESS_CHARACTERS} />
        </div>
    );
}