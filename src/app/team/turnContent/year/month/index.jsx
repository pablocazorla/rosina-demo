import clsx from "clsx";
import { toArray } from "@/utils/dateUtils";
import { useContext, useMemo } from "react";
import { AppContext } from "@/context/appContext";
import { TurnContext } from "@/context/turn-context";
import Turn from "./turn";

const MontYearView = ({ data }) => {
  const { today } = useContext(AppContext);
  const { turns, setDateFocus, setView } = useContext(TurnContext);

  const { name, year, month } = data;

  const isToday = useMemo(() => {
    const [yearToday, monthToday] = toArray(today);
    const { year, month } = data;
    return yearToday === year && monthToday === month;
  }, [data, today]);

  const currentTurn = useMemo(() => {
    const { year, month } = data;

    const currentTurns = turns.filter(({ day }) => {
      const [yearToday, monthToday] = day.split("-");
      return yearToday === year && monthToday === month;
    });
    return currentTurns[0] || null;
  }, [data, turns]);

  return (
    <div
      className={clsx(
        "text-center cursor-pointer font-bold relative hover:bg-primary/20 ",
        {
          "shadow-[inset_0_0_0_1px_#CCC,0_0_0_1px_#CCC]": !isToday,
          "shadow-[inset_0_0_0_1px_#F00,0_0_0_1px_#F00] rounded z-10 bg-primary/10":
            isToday,
        }
      )}
      onClick={() => {
        setView(2);
        setDateFocus(`${year}-${month}-01`);
      }}
    >
      <div className="p-1">
        {currentTurn ? (
          <Turn currentTurn={currentTurn} data={data} />
        ) : (
          <>
            <div className="text-sm">{name}</div>
            <div className="h-10"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default MontYearView;
