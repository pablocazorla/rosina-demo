"use client";
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  getDateFocus,
  getDayInterval,
  getWeekInterval,
  getMonthInterval,
  getYearInterval,
} from "@/utils/dateUtils";
import useFetch from "@/hooks/useFetch";

export const TurnContext = createContext({
  view: 0,
  setView: () => {},
  dateFocus: null,
  setDateFocus: () => {},
  clientId: null,
  setClientId: () => {},
  //
  turns: [],
  loadingTurns: false,
  errorTurns: null,
  //
  location: "0",
  setLocation: () => {},
  //
  reloadTurns: () => {},
});

export const TurnContextProvider = ({ children }) => {
  const [view, setView] = useState(0);
  const [dateFocus, setDateFocus] = useState(getDateFocus());
  const [clientId, setClientId] = useState(null);
  const [turnsRaw, setTurnsRaw] = useState([]);
  const [location, setLocation] = useState("0");

  const [reloadValue, setReloadValue] = useState(1);
  const reloadTurns = useCallback(() => {
    setReloadValue(Date.now());
  }, []);

  /* GET TURNS *************************************/
  const afterLoad = useCallback((d) => {
    setTurnsRaw(d.data);
  }, []);

  const [getTurns, , loadingTurns, errorTurns] = useFetch({
    endpoint: "TURN_LIST",
    initialState: [],
    afterLoad,
  });

  useEffect(() => {
    let interval = null;
    /*
    0 => DayView
    1 => WeekView
    2 => MonthView
    3 => YearView
    */
    switch (view) {
      case 0:
        interval = getDayInterval(dateFocus);
        break;
      case 1:
        interval = getWeekInterval(dateFocus);
        break;
      case 2:
        if (clientId) {
          interval = getMonthInterval(dateFocus);
        }
        break;
      case 3:
        if (clientId) {
          interval = getYearInterval(dateFocus);
        }
        break;
      default:
      //
    }

    if (interval) {
      const params = { ...interval };
      if (clientId) {
        params.search = `${clientId}`;
      }
      getTurns({ params });
    } else {
      setTurnsRaw([]);
    }
  }, [getTurns, view, dateFocus, clientId, reloadValue]);

  /* SET TURNS *************************************/
  const turns = useMemo(() => {
    if (location === "0") return turnsRaw;

    return turnsRaw.filter((turn) => {
      return turn.location === location;
    });
  }, [turnsRaw, location]);

  return (
    <TurnContext.Provider
      value={{
        view,
        setView,
        dateFocus,
        setDateFocus,
        clientId,
        setClientId,
        //
        turns,
        loadingTurns,
        errorTurns,
        //
        location,
        setLocation,
        //
        reloadTurns,
      }}
    >
      {children}
    </TurnContext.Provider>
  );
};
