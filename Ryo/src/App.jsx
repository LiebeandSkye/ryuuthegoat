import Background from "./components/Background";
import Dock from "./components/Dock";
import ClockCalendar from "./components/ClockCalendar";
import ProfileBar from "./components/ProfileBar";
import CharacterArt from "./components/CharacterArt";
import ChatCard from "./components/ChatCard";
import MediaPlayer from "./components/MediaPlayer";
import BottomDock from "./components/BottomDock";
import { GlassFilter } from "./components/ui/liquid-glass";

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-0 overflow-y-auto md:overflow-hidden bg-[#0a0a0f] pb-28 md:pb-0">
      {/* Background Image */}
      <Background />

      {/* SVG Liquid Glass Filter */}
      <GlassFilter />

      {/* Left Social Dock */}
      <Dock />

      {/* Main Glass Panel Card */}
      <main className="w-full max-w-[920px] min-h-[540px] md:h-[540px] glass-panel rounded-[42px] px-6 py-8 md:px-9 md:py-7 flex flex-col md:flex-row justify-between items-stretch gap-10 md:gap-0 overflow-visible z-10 my-10 md:my-0">
        {/* Left Column: Clock and Calendar */}
        <div className="w-full md:w-[210px] flex flex-col justify-start items-center md:items-start">
          <ClockCalendar />
        </div>

        {/* Center Column: Character Art with 3D Popout */}
        <div className="w-full md:flex-1 h-[260px] md:h-full relative overflow-visible flex items-center justify-center my-4 md:my-0">
          <CharacterArt />
        </div>

        {/* Right Column: User profile, image grid and player */}
        <div className="w-full md:w-[250px] flex flex-col justify-between items-stretch gap-6 md:gap-0">
          <ProfileBar />
          <ChatCard />
          <MediaPlayer />
        </div>
      </main>

      {/* Bottom App Dock */}
      <BottomDock />
    </div>
  );
}
