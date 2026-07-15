import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import songCover from "../assets/ryo/song-cover.jpg";
import songSrc from "../assets/ryo/song.mp3";
import { GlassEffect } from "./ui/liquid-glass";

export default function MediaPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(0.1); // Default volume 10%
  const [prevVolume, setPrevVolume] = useState(0.1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume to 10%
    audio.volume = volume;

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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    } else {
      const restoreVolume = prevVolume > 0 ? prevVolume : 0.1;
      setVolume(restoreVolume);
      if (audioRef.current) {
        audioRef.current.volume = restoreVolume;
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Volume Controller (Above Player) */}
      <div className="flex items-center justify-between px-2 text-white/70 text-xs">
        <span className="font-semibold tracking-wider text-[10px] uppercase opacity-75">Volume</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={volume === 0 ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className="transition hover:text-white hover:scale-110"
          >
            {volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 rounded-lg bg-white/20 accent-white cursor-pointer appearance-none outline-none"
            style={{
              background: `linear-gradient(to right, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%, rgba(255, 255, 255, 0.2) 100%)`
            }}
          />
          <span className="w-8 text-right font-mono text-[10px]">{Math.round(volume * 100)}%</span>
        </div>
      </div>

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
