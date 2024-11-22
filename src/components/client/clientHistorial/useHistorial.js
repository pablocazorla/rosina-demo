import { useCallback, useContext, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { AppContext } from "@/context/appContext";
import { getYearIntervalHistorial } from "@/utils/dateUtils";

const useHistorial = (client) => {
  const { today } = useContext(AppContext);

  const [turns, setTurns] = useState([]);
  const [notFound, setNotFound] = useState(false);

  /* GET TURNS *************************************/
  const afterLoad = useCallback((d) => {
    setNotFound(d.data.length === 0);
    setTurns(d.data);
  }, []);

  const [getTurns, , loading, error] = useFetch({
    endpoint: "TURN_LIST",
    afterLoad,
  });

  useEffect(() => {
    if (client) {
      getTurns({
        params: { search: client.id, ...getYearIntervalHistorial(today) },
      });
    }
  }, [getTurns, client, today]);

  return { turns, loading, error, notFound };
};

export default useHistorial;
