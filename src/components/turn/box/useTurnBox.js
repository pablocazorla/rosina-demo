import { useContext, useMemo } from "react";
import { AppContext } from "@/context/appContext";
import locations from "@/config/locations";

const useTurnBox = (turn) => {
  const {
    position,
    startTime,
    client_name,
    location: locationTurn,
    status,
  } = turn;

  const { items } = useContext(AppContext);

  const styleValue = useMemo(() => {
    const { column, quantity, style } = position;
    const width = 90 / quantity;
    const left = column * width;

    return {
      ...style,
      width: `${width}%`,
      left: `${left}%`,
    };
  }, [position]);

  const itemService = useMemo(() => {
    const itms = (turn?.item_ids || "")
      .split(",")
      .map((id) => {
        if (items[id]) {
          return items[id].name;
        }
        return null;
      })
      .filter((item) => item);

    return itms[0] || null;
  }, [items, turn]);

  return {
    startTime,
    styleValue,
    client_name,
    itemService,
    location: locations[locationTurn] || locations["1"],
    status,
  };
};

export default useTurnBox;
