import { useContext, useMemo, useCallback } from "react";
import { TurnContext } from "@/context/turn-context";
import { getYearSequence, navigateYear } from "@/utils/dateUtils";

const useYear = () => {
  const { dateFocus, setDateFocus } = useContext(TurnContext);

  const yearSequence = useMemo(() => {
    return getYearSequence(dateFocus);
  }, [dateFocus]);

  // NAVIGATION *********************/

  const navigate = useCallback(
    (dir) => {
      const newDate = navigateYear(dateFocus, dir);
      setDateFocus(newDate);
    },
    [dateFocus, setDateFocus]
  );

  return { yearSequence, titleNavigation: yearSequence.title, navigate };
};

export default useYear;
