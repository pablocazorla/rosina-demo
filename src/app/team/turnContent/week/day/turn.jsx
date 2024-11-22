import HourBox from "@/components/turnContentComponents/hourBox";
import useTurn from "./useTurn";
import clsx from "clsx";

const Turn = ({ data }) => {
  const { startTime, itemService, client_name, location, status } =
    useTurn(data);

  return (
    <div
      className={clsx("p-2 rounded relative", {
        "bg-status-ended": status === "ended",
        "bg-status-completed": status === "completed",
        "bg-status-pending": status === "pending",
        "bg-status-cancelled": status === "cancelled",
      })}
    >
      <div
        className="w-3 h-3 absolute top-0 right-0 rounded-tr rounded-bl-xl"
        style={{ backgroundColor: location.color }}
        title={location.name}
      />
      <div className="w-full h-full overflow-hidden text-xs text-white leading-none flex items-start gap-2">
        <HourBox startTime={startTime} />
        <div>
          <div className="font-bold">{client_name}</div>
          {itemService ? (
            <div className="opacity-70 italic pt-1">{itemService.name}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Turn;
