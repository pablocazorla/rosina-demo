import { AppContext } from "@/context/appContext";
import { TurnContext } from "@/context/turn-context";
import clsx from "clsx";
import { useContext, useMemo } from "react";
import Turn from "./turn";

const Day = ({ data }) => {
  const { today } = useContext(AppContext);
  const { turns, setDateFocus, setView } = useContext(TurnContext);

  const { date, day, weekDay } = data;

  const parsedDay = useMemo(() => parseInt(day, 10), [day]);

  const isToday = today === date;

  const currentTurn = useMemo(() => {
    const currentTurns = turns.filter((turn) => turn.day === date);
    return currentTurns[0] || null;
  }, [date, turns]);

  return (
    <div
      className={clsx(
        " p-1 text-center cursor-pointer font-bold relative hover:bg-primary/20 ",
        {
          "shadow-[inset_0_0_0_1px_#CCC,0_0_0_1px_#CCC]": !isToday,
          "shadow-[inset_0_0_0_1px_#F00,0_0_0_1px_#F00] rounded z-10": isToday,
          "text-primary": isToday,
          "text-red-300": !isToday && weekDay === 0,
        }
      )}
      onClick={() => {
        setView(0);
        setDateFocus(date);
      }}
    >
      {currentTurn ? (
        <Turn currentTurn={currentTurn} day={parsedDay} />
      ) : (
        <div className="p-1">{parsedDay}</div>
      )}
    </div>
  );
};

const DayMonthView = ({ data }) => {
  return data ? <Day data={data} /> : <div />;
};

export default DayMonthView;
