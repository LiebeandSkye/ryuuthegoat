import { useEffect, useMemo, useState } from "react";

const TIMEZONE = "Australia/Sydney";

function getSydneyParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-AU", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(
    fmt.formatToParts(date).map(({ type, value }) => [type, value])
  );

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: parts.weekday,
    hour: parts.hour === "24" ? "00" : parts.hour,
    minute: parts.minute,
  };
}

function buildMonthGrid(year, month) {
  // month is 1-based
  const first = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startPad = first.getDay(); // 0 = Sunday
  const cells = [];

  for (let i = 0; i < startPad; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function ClockCalendar() {
  const [now, setNow] = useState(() => getSydneyParts());

  useEffect(() => {
    const id = setInterval(() => setNow(getSydneyParts()), 1000);
    return () => clearInterval(id);
  }, []);

  const monthName = useMemo(() => {
    return new Intl.DateTimeFormat("en-AU", {
      timeZone: TIMEZONE,
      month: "long",
    }).format(new Date());
  }, [now.year, now.month]);

  const grid = useMemo(
    () => buildMonthGrid(now.year, now.month),
    [now.year, now.month]
  );

  const dateLine = `${now.weekday} ${String(now.day).padStart(2, "0")}/${String(now.month).padStart(2, "0")}`;

  return (
    <div className="fixed left-32 top-10 z-20 flex flex-col gap-4 text-white">
      <div>
        <div className="font-mono text-5xl font-bold tracking-wider drop-shadow-lg">
          {now.hour}:{now.minute}
        </div>
        <div className="mt-1 text-sm font-medium tracking-wide text-white/80">
          {dateLine}
        </div>
      </div>

      <div className="glass-panel-dark w-52 rounded-2xl p-4">
        <div className="mb-2 border-b border-white/15 pb-2 text-center text-sm font-semibold tracking-wide">
          {monthName}
        </div>

        <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-purple-300/80">
          {WEEKDAYS.map((d, i) => (
            <span key={`${d}-${i}`}>{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {grid.map((day, i) => {
            if (day == null) {
              return <span key={`e-${i}`} className="h-6" />;
            }
            const isToday = day === now.day;
            return (
              <span
                key={day}
                className={
                  isToday
                    ? "flex h-6 items-center justify-center rounded-full border border-white/70 font-bold text-white"
                    : "flex h-6 items-center justify-center text-white/75"
                }
              >
                {day}
              </span>
            );
          })}
        </div>

        <div className="mt-3 h-1 w-full rounded-full bg-white/15">
          <div className="h-full w-2/5 rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  );
}
