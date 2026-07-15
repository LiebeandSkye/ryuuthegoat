import image1 from "../assets/ryo/image1.jpg";
import image2 from "../assets/ryo/image2.jpg";
import image3 from "../assets/ryo/image3.jpg";
import { GlassEffect } from "./ui/liquid-glass";

export default function ChatCard() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <h2 className="text-[17px] font-bold text-white drop-shadow-md tracking-wider">
        Hi Ryōリョウ!!
      </h2>

      <div className="grid h-[195px] grid-cols-2 grid-rows-2 gap-2.5">
        <div className="row-span-2 min-h-0 h-full">
          <GlassEffect className="h-full w-full overflow-hidden rounded-[20px]">
            <img
              src={image1}
              alt=""
              className="block h-full w-full object-cover"
              draggable={false}
            />
          </GlassEffect>
        </div>

        <div className="min-h-0 h-full">
          <GlassEffect className="h-full w-full overflow-hidden rounded-[20px]">
            <img
              src={image2}
              alt=""
              className="block h-full w-full object-cover"
              draggable={false}
            />
          </GlassEffect>
        </div>

        <div className="min-h-0 h-full">
          <GlassEffect className="h-full w-full overflow-hidden rounded-[20px] p-1.5">
            <div className="h-full w-full overflow-hidden rounded-[14px] bg-[#fadadd] flex items-center justify-center">
              <img
                src={image3}
                alt=""
                className="block h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </GlassEffect>
        </div>
      </div>
    </div>
  );
}
