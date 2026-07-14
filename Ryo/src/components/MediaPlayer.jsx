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
    <div className="glass-panel-dark fixed bottom-28 right-8 z-20 flex w-64 items-center gap-3 rounded-pill px-3 py-2">
      <img
        src={songCover}
        alt="Album cover"
        className={`h-12 w-12 shrink-0 rounded-full object-cover animate-spin-slow ${
          isPlaying ? "" : "paused"
        }`}
        draggable={false}
      />

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-white">
          NEW GENESIS
        </div>
        <div className="mt-1 flex items-center gap-2 text-white/70">
          <button
            type="button"
            aria-label="Shuffle"
            className="transition hover:text-white"
          >
            <Shuffle size={14} />
          </button>
          <button
            type="button"
            aria-label="Previous"
            className="transition hover:text-white"
          >
            <SkipBack size={14} />
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            className="transition hover:text-white"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            type="button"
            aria-label="Next"
            className="transition hover:text-white"
          >
            <SkipForward size={14} />
          </button>
          <button
            type="button"
            aria-label={liked ? "Unlike" : "Like"}
            onClick={() => setLiked((v) => !v)}
            className={`transition hover:text-white ${liked ? "text-pink-400" : ""}`}
          >
            <Heart size={14} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={songSrc} loop preload="auto" />
    </div>
  );
}
