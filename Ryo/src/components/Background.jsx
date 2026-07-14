import background from "../assets/ryo/background.jpg";

export default function Background() {
  return (
    <img
      src={background}
      alt=""
      className="absolute inset-0 -z-10 h-full w-full object-cover brightness-95"
      draggable={false}
    />
  );
}
