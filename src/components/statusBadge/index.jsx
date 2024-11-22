import statusTypes from "@/config/status";
import statusTypesCharges from "@/config/statusCharge";
import clsx from "clsx";
import { useMemo } from "react";

const StatusBadge = ({ status, isCharge }) => {
  const type = useMemo(() => {
    if (isCharge) {
      return statusTypesCharges.find(({ value }) => value === status);
    }
    return statusTypes.find(({ value }) => value === status);
  }, [status, isCharge]);

  return (
    <div
      className={clsx(
        "text-xs font-bold text-white inline-block py-1 px-2 rounded-md",
        {
          "bg-status-ended": (type?.value || "pending") === "ended",
          "bg-status-completed": (type?.value || "pending") === "completed",
          "bg-status-cancelled": (type?.value || "pending") === "cancelled",
          "bg-status-pending": (type?.value || "pending") === "pending",
        }
      )}
    >
      {type?.text}
    </div>
  );
};

export default StatusBadge;
