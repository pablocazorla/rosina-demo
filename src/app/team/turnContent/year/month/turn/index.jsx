import locations from "@/config/locations";
import clsx from "clsx";

const Turn = ({ currentTurn, data }) => {
  const { name } = data;
  const { location, status } = currentTurn;
  const locationTurn = locations[location] || locations["1"];

  return (
    <div
      className={clsx("text-white relative rounded-md", {
        "bg-status-ended": status === "ended",
        "bg-status-completed": status === "completed",
        "bg-status-pending": status === "pending",
        "bg-status-cancelled": status === "cancelled",
      })}
    >
      <div
        className="w-3 h-3 absolute top-0 right-0 rounded-tr rounded-bl-xl"
        style={{ backgroundColor: locationTurn.color }}
        title={locationTurn.name}
      />
      <div className="text-sm">{name}</div>
      <div className="h-10"></div>
    </div>
  );
};

export default Turn;
