import Background from "./components/Background";
import Dock from "./components/Dock";
import ClockCalendar from "./components/ClockCalendar";
import ProfileBar from "./components/ProfileBar";
import CharacterArt from "./components/CharacterArt";
import ChatCard from "./components/ChatCard";
import MediaPlayer from "./components/MediaPlayer";
import BottomDock from "./components/BottomDock";

export default function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />
      <Dock />
      <ClockCalendar />
      <ProfileBar />
      <ChatCard />
      <MediaPlayer />
      <CharacterArt />
      <BottomDock />
    </div>
  );
}
