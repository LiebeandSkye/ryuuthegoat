import image1 from "../assets/ryo/image1.jpg";
import image2 from "../assets/ryo/image2.jpg";
import image3 from "../assets/ryo/image3.jpg";

export default function ChatCard() {
  return (
    <div className="fixed right-8 top-28 z-20 flex w-64 flex-col gap-3">
      <h2 className="text-2xl font-bold text-white drop-shadow-lg">Hi Ryō!!</h2>

      <div className="grid h-56 grid-cols-2 gap-2">
        <div className="glass-panel row-span-2 overflow-hidden rounded-3xl">
          <img
            src={image1}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <div className="glass-panel overflow-hidden rounded-3xl">
          <img
            src={image2}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <div className="glass-panel overflow-hidden rounded-3xl bg-pink-100 p-2">
          <img
            src={image3}
            alt=""
            className="h-full w-full rounded-2xl object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
