import { useContext, useMemo, useCallback } from "react";
import { TurnContext } from "@/context/turn-context";
import { getWeekSequence, navigateWeek } from "@/utils/dateUtils";

const useWeek = () => {
  const { dateFocus, setDateFocus } = useContext(TurnContext);

  const weekSequence = useMemo(() => {
    return getWeekSequence(dateFocus);
  }, [dateFocus]);

  // NAVIGATION *********************/

  const navigate = useCallback(
    (dir) => {
      const newDate = navigateWeek(dateFocus, dir);
      setDateFocus(newDate);
    },
    [dateFocus, setDateFocus]
  );

  return { weekSequence, navegationTitle: weekSequence.title, navigate };
};

export default useWeek;
