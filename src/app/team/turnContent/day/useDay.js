import { minHour, maxHour } from "@/config/turnConfig";
import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { TurnContext } from "@/context/turn-context";
import { getTopCurrentHour, formatTurns } from "./utils";
import { getDayTitle, navigateDay } from "@/utils/dateUtils";
import { AppContext } from "@/context/appContext";

const useDay = () => {
  const { today } = useContext(AppContext);
  /* TURN LIST */
  const { turns, dateFocus, setDateFocus } = useContext(TurnContext);

  const turnList = useMemo(() => {
    return formatTurns(turns);
  }, [turns]);

  /* end TURN LIST */

  /* CURRENT HOUR*/
  const [topCurrentHour, setTopCurrentHour] = useState(-1);

  useEffect(() => {
    let timer = null;
    if (dateFocus === today) {
      setTopCurrentHour(getTopCurrentHour());
      timer = setInterval(() => {
        setTopCurrentHour(getTopCurrentHour());
      }, 600000); // Every 10 minutes
    } else {
      setTopCurrentHour(-1);
    }

    return () => {
      clearInterval(timer);
    };
  }, [dateFocus, today]);
  /* end CURRENT HOUR*/

  /* hour List */
  const hourList = useMemo(() => {
    const li = [];

    let hour = minHour;
    while (hour <= maxHour) {
      li.push({ hour, day: dateFocus });

      hour++;
    }
    return li;
  }, [dateFocus]);
  /* end hour List */

  /* DAY NAVIGATION*/
  const { navigationTitle, isToday, isPastDay } = useMemo(() => {
    return {
      navigationTitle: getDayTitle(dateFocus, dateFocus === today),
      isToday: dateFocus === today,
      isPastDay: dateFocus < today,
    };
  }, [dateFocus, today]);

  const navigate = useCallback(
    (dir) => {
      const newDate = navigateDay(dateFocus, dir);
      setDateFocus(newDate);
    },
    [dateFocus, setDateFocus]
  );

  /* end DAY NAVIGATION*/

  return {
    topCurrentHour,
    hourList,
    turnList,
    navigationTitle,
    navigate,
    isPastDay,
    isToday,
  };
};

export default useDay;
