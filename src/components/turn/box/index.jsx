import HourBox from "@/components/turnContentComponents/hourBox";
import useTurnBox from "./useTurnBox";
import clsx from "clsx";

const TurnBox = ({ turn, onClick }) => {
  const { styleValue, startTime, client_name, itemService, location, status } =
    useTurnBox(turn);

  return (
    <div className="absolute w-full p-[1px] pt-[2px]" style={styleValue}>
      <div
        className={clsx("w-full h-full p-2 rounded relative cursor-pointer", {
          "bg-status-ended": status === "ended",
          "bg-status-completed": status === "completed",
          "bg-status-pending": status === "pending",
          "bg-status-cancelled": status === "cancelled",
        })}
        title={`${client_name}${itemService ? `, ${itemService}` : ""}`}
        onClick={() => (onClick ? onClick(turn) : null)}
      >
        <div
          className="w-3 h-3 absolute top-0 right-0 rounded-tr rounded-bl-xl"
          style={{ backgroundColor: location.color }}
          title={location.name}
        />
        <div className="w-full h-full overflow-hidden text-xs text-white leading-none">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <HourBox startTime={startTime} />
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="font-bold">{client_name}</div>
              {itemService ? (
                <div className="opacity-70 italic">{itemService}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnBox;
