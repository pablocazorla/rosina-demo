import { useContext, useMemo } from "react";
import { AppContext } from "@/context/appContext";
import locations from "@/config/locations";

const useTurn = (data) => {
  const {
    startTime,
    client_name,
    location: locationTurn,
    item_ids,
    status,
  } = data;

  const { items } = useContext(AppContext);

  const itemService = useMemo(() => {
    return items[item_ids || ""] || null;
  }, [items, item_ids]);

  return {
    startTime,
    itemService,
    client_name,
    location: locations[locationTurn] || locations["1"],
    status,
  };
};

export default useTurn;
