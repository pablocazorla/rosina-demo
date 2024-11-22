import clsx from "clsx";
import { useContext, useMemo } from "react";
import { AppContext } from "@/context/appContext";
import { TurnContext } from "@/context/turn-context";
import Turn from "./turn";

const saturdayNum = 5;

const DayWeekView = ({ data }) => {
  const { today } = useContext(AppContext);
  const { turns, setDateFocus, setView } = useContext(TurnContext);

  const { date, day, weekDay } = data;

  const isToday = today === date;

  const turnList = useMemo(() => {
    return turns
      .filter((turn) => turn.day === date)
      .sort((a, b) => {
        return a.startTime < b.startTime ? -1 : 1;
      });
  }, [date, turns]);

  return (
    <div className="py-2">
      <div
        className={clsx(
          "bg-white rounded-lg flex  items-stretch cursor-pointer hover:opacity-70",
          {
            "shadow-[0_0_0_2px_rgba(255,0,0,1)]": isToday,
            "shadow-md": !isToday,
          }
        )}
        onClick={() => {
          setView(0);
          setDateFocus(date);
        }}
      >
        <div
          className={clsx(
            "p-2 w-16  text-white rounded-l-lg text-center font-bold grid place-content-center",
            {
              "bg-sky-900": weekDay.num === saturdayNum && !isToday,
              "bg-sky-600": weekDay.num !== saturdayNum && !isToday,
              "bg-primary": isToday,
            }
          )}
        >
          <div className="w-16">
            <div className="text-xl">{weekDay.name}</div>
            <div className="text-sm">{`${day.num} ${day.month}`}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-2">
          {turnList.map((data) => (
            <Turn key={data.id} data={data} />
          ))}
          {turnList.length === 0 && (
            <div className="p-2 text-sm text-gray-500">Sin turnos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayWeekView;
