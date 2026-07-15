import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import songCover from "../assets/ryo/song-cover.jpg";
import songSrc from "../assets/ryo/song.mp3";
import { GlassEffect } from "./ui/liquid-glass";

export default function MediaPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked — fall back to starting on first user interaction
        const resume = () => {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
          window.removeEventListener("click", resume);
        };
        window.addEventListener("click", resume, { once: true });
      }
    };

    tryPlay();
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="w-full">
      <GlassEffect className="w-full rounded-[24px] px-3.5 py-3">
        <div className="flex w-full items-center gap-3">
          <img
            src={songCover}
            alt="Album cover"
            className={`h-12 w-12 shrink-0 rounded-full object-cover border border-white/10 animate-spin-slow ${
              isPlaying ? "" : "paused"
            }`}
            draggable={false}
          />

          <div className="min-w-0 flex-1 pl-1">
            <div className="truncate text-sm font-bold text-white tracking-wide">
              NEW GENESIS
            </div>
            <div className="mt-1.5 flex items-center gap-2.5 text-white/70">
              <button
                type="button"
                aria-label="Shuffle"
                className="transition hover:text-white hover:scale-110"
              >
                <Shuffle size={13} />
              </button>
              <button
                type="button"
                aria-label="Previous"
                className="transition hover:text-white hover:scale-110"
              >
                <SkipBack size={13} />
              </button>
              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlay}
                className="transition hover:text-white hover:scale-110 p-0.5"
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button
                type="button"
                aria-label="Next"
                className="transition hover:text-white hover:scale-110"
              >
                <SkipForward size={13} />
              </button>
              <button
                type="button"
                aria-label={liked ? "Unlike" : "Like"}
                onClick={() => setLiked((v) => !v)}
                className={`transition hover:text-white hover:scale-110 ${liked ? "text-pink-400" : ""}`}
              >
                <Heart size={13} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </GlassEffect>

      <audio ref={audioRef} src={songSrc} loop preload="auto" />
    </div>
  );
}
