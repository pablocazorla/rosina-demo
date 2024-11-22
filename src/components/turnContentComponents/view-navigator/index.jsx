import I18N from "@/i18n";
import { useContext } from "react";
import { TurnContext } from "@/context/turn-context";
import clsx from "clsx";
import { AppContext } from "@/context/appContext";

const list = [
  {
    title: "viewNavigator.Today",
    value: 0,
    isToday: true,
  },
  {
    title: "viewNavigator.Week",
    value: 1,
    isToday: false,
  },
  {
    title: "viewNavigator.Month",
    value: 2,
    isToday: false,
  },
  {
    title: "viewNavigator.Year",
    value: 3,
    isToday: false,
  },
];

const Button = ({ item }) => {
  const { today } = useContext(AppContext);
  const { view, setView, setDateFocus } = useContext(TurnContext);

  const { isToday } = item;

  return view >= item.value && !isToday ? null : (
    <button
      className={clsx(
        " text-white text-sm px-4 py-1 rounded hover:bg-black transition-colors",
        {
          "bg-secondary": !isToday,
          "bg-primary": isToday,
        }
      )}
      onClick={() => {
        if (isToday) {
          setDateFocus(today);
        }
        setView(item.value);
      }}
    >
      <I18N id={item.title} />
    </button>
  );
};

const ViewNavigator = () => {
  return (
    <div className="flex items-center gap-2">
      {list.map((item, k) => (
        <Button key={k} item={item} />
      ))}
    </div>
  );
};

export default ViewNavigator;
