import { useMemo } from "react";
import { normalizeHour } from "@/utils/dateUtils";

const HourBox = ({ startTime }) => {
  const text = useMemo(() => {
    return normalizeHour(startTime);
  }, [startTime]);

  return (
    <div className="font-bold bg-black/30 xp-1 rounded-full text-[11px] leading-4 px-1">
      {text}
    </div>
  );
};

export default HourBox;
