import { parseDay } from "@/utils/dateUtils";
import { useContext, useMemo } from "react";
import { AppContext } from "@/context/appContext";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import locations from "@/config/locations";

const TurnHistorial = ({ turn, onClose, afterCopyHistorial }) => {
  const { items } = useContext(AppContext);

  const { day, item_ids, description, location: locationTurn } = turn;

  const location = locations[locationTurn] || locations["1"];

  const dayTitle = useMemo(() => {
    const d = parseDay(day);
    return {
      day: `${d.day} ${d.month.short}`,
      year: d.year,
    };
  }, [day]);

  const itemServices = useMemo(() => {
    return (turn?.item_ids || "")
      .split(",")
      .map((id) => {
        if (items[id]) {
          return items[id].name;
        }
        return null;
      })
      .filter((item) => item)
      .join(", ");
  }, [items, turn]);

  return (
    <div className="mb-4 flex relative">
      <div
        className="w-3 h-3 absolute top-0 right-0 rounded-tr rounded-bl-xl"
        style={{ backgroundColor: location.color }}
        title={location.name}
      />
      <div className="bg-secondary/80 text-white text-center font-bold w-16 py-2 rounded-l-md">
        <div className="">{dayTitle.day}</div>
        <div className=""> {dayTitle.year}</div>
      </div>
      <div className="grow border border-gray-400 rounded-r-md">
        <div className="flex gap-3 justify-between bg-gray-200 rounded-tr-md text-gray-700 text-sm font-semibold py-1 px-3">
          <div className="">{itemServices}</div>
          {afterCopyHistorial ? (
            <div
              className="text-xs rounded-md cursor-pointer py-1 px-2 font-bold flex items-center gap-1 transition-colors bg-slate-500 text-white hover:bg-slate-800"
              onClick={() => {
                afterCopyHistorial({
                  item_ids,
                  description,
                  location: locationTurn,
                });
                onClose();
              }}
            >
              <Icon type="copy" />
              <I18N id="turn.historial.copy" />
            </div>
          ) : null}
        </div>
        <div className="py-1 px-3 text-sm text-gray-700">{description}</div>
      </div>
    </div>
  );
};

export default TurnHistorial;
