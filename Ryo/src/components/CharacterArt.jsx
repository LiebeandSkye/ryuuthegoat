import main from "../assets/ryo/main.jpg";

const LABEL = "黒川 あかね";
const BIO = "some nights, even songs can't help";

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

      {/* Neon quote, centered below the character art */}
      <div className="absolute inset-x-0 bottom-3 sm:bottom-4 md:bottom-12 flex items-center justify-center z-20 px-3">
        <div
          className="neon-quote font-jp text-[13px] sm:text-[16px] md:text-[19px] font-extrabold tracking-widest text-center select-none"
          aria-label={BIO}
        >
          {BIO}
        </div>
      </div>
    </div>
  );
}