import { useContext, useMemo, useCallback } from "react";
import { TurnContext } from "@/context/turn-context";
import { getMonthSequence, navigateMonth } from "@/utils/dateUtils";

const useMonth = () => {
  const { dateFocus, setDateFocus } = useContext(TurnContext);

  const monthSequence = useMemo(() => {
    return getMonthSequence(dateFocus);
  }, [dateFocus]);

  // NAVIGATION *********************/

  const navigate = useCallback(
    (dir) => {
      const newDate = navigateMonth(dateFocus, dir);
      setDateFocus(newDate);
    },
    [dateFocus, setDateFocus]
  );

  return { monthSequence, titleNavigation: monthSequence.title, navigate };
};
export default useMonth;
