import Icon from "@/components/icon";
import clsx from "clsx";
import { useContext, useMemo } from "react";
import { AppContext } from "@/context/appContext";
import { TurnContext } from "@/context/turn-context";

const DateNavigator = ({ roundTop, title, navigate, isToday }) => {
  const { today } = useContext(AppContext);
  const { dateFocus, view } = useContext(TurnContext);

  const year = useMemo(() => {
    if (view >= 2) {
      return null;
    }
    const [yearToday] = today.split("-");
    const [yearDateFocus] = dateFocus.split("-");
    return yearToday !== yearDateFocus ? yearDateFocus : null;
  }, [today, dateFocus, view]);

  return (
    <div className={clsx({ "border-b border-gray-300": roundTop })}>
      <div className="flex items-center justify-between">
        <button
          className={clsx(
            "text-4xl leading-none h-11 w-11 text-gray-700 hover:text-white hover:bg-primary/80 transition-colors",
            {
              "rounded-tl-xl": roundTop,
              "rounded-l-xl": !roundTop,
            }
          )}
          onClick={() => (navigate ? navigate(-1) : null)}
        >
          <Icon type="chevron-left" />
        </button>
        <div
          className={clsx("font-bold", {
            "text-gray-800 text-xl": !isToday,
            "text-white bg-primary rounded-md px-3 text-lg": isToday,
          })}
        >{`${title} ${year ? ` (${year})` : ""}`}</div>
        <button
          className={clsx(
            "text-4xl leading-none h-11 w-11 text-gray-700 hover:text-white hover:bg-primary/80 transition-colors",
            {
              "rounded-tr-xl": roundTop,
              "rounded-r-xl": !roundTop,
            }
          )}
          onClick={() => (navigate ? navigate(1) : null)}
        >
          <Icon type="chevron-right" />
        </button>
      </div>
    </div>
  );
};
export default DateNavigator;
