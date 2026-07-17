import React from "react";
import blueRose from "../assets/blue-rose.png"; // adjust this path if you move the image (e.g. "../assets/blue-rose.png")

/**
 * BlueRoseBackground
 * Full-bleed dark background with the blue rose spinning in tilted 3D space.
 * Pure CSS 3D transforms — no extra libraries needed.
 *
 * Usage:
 *   <BlueRoseBackground>
 *     <YourPageContent />
 *   </BlueRoseBackground>
 */
export default function BlueRoseBackground({
    children,
    size = 420,          // rose diameter in px (also accepts vw via CSS clamp below)
    duration = 9,         // seconds per full rotation
    tiltX = 18,            // forward/back lean, in degrees
    tiltZ = -10,           // sideways lean, in degrees (this is the "tilted sideways" look)
    bgColor = "#1c1310",   // sampled from the source image
    glowColor = "0,140,200", // rgb triplet, sampled from the rose
}) {
    return (
        <div
            className="relative w-full min-h-screen overflow-x-hidden"
            style={{ backgroundColor: bgColor }}
        >
            <style>{`
        @keyframes rose-spin-y {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        @keyframes rose-glow-pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.8; transform: translate(-50%, -50%) scale(1.08); }
        }
        .rose-scene {
          perspective: 1400px;
        }
        .rose-tilt {
          transform-style: preserve-3d;
        }
        .rose-spin {
          transform-style: preserve-3d;
          animation: rose-spin-y var(--rose-duration, 9s) linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .rose-spin { animation-duration: 45s; }
        }
      `}</style>

            {/* ambient glow behind the rose */}
            <div
                className="pointer-events-none fixed left-1/2 top-1/2 rounded-full blur-3xl"
                style={{
                    width: "min(75vw, 760px)",
                    height: "min(75vw, 760px)",
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle, rgba(${glowColor},0.35) 0%, rgba(${glowColor},0.15) 45%, transparent 70%)`,
                    animation: "rose-glow-pulse 6s ease-in-out infinite",
                }}
            />

            {/* spinning rose, tilted sideways on a fixed axis */}
            <div className="rose-scene pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
                <div
                    className="rose-tilt"
                    style={{ transform: `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)` }}
                >
                    <div
                        className="rose-spin"
                        style={{
                            width: `min(48vw, ${size}px)`,
                            height: `min(48vw, ${size}px)`,
                            "--rose-duration": `${duration}s`,
                        }}
                    >
                        <img
                            src={blueRose}
                            alt=""
                            draggable={false}
                            className="w-full h-full object-contain select-none"
                            style={{
                                filter: `drop-shadow(0 0 40px rgba(${glowColor},0.45))`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* your page content sits above the background */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}