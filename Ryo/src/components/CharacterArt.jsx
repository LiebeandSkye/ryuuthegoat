import main from "../assets/ryo/main.jpg";

const LABEL = "黒川あかね";

export default function CharacterArt() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <img
        src={main}
        alt="黒川あかね"
        className="absolute bottom-0 left-1/2 h-[95vh] -translate-x-1/2 object-contain drop-shadow-2xl"
        draggable={false}
      />

      <div
        className="font-jp absolute left-[calc(50%-14rem)] top-[22%] text-xl tracking-widest text-white/90 drop-shadow-lg"
        style={{ writingMode: "vertical-rl" }}
        aria-label={LABEL}
      >
        {LABEL}
      </div>
    </div>
  );
}
