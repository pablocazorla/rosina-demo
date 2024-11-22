"use client";
import useFetch from "@/hooks/useFetch";
import { getDateFocus } from "@/utils/dateUtils";
import { createContext, useCallback, useMemo, useState, useRef } from "react";

export const AppContext = createContext({
  today: null,
  items: {},
  setItems: () => {},
  gotoTop: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [items, setItems] = useState({});

  const afterLoad = useCallback(({ data }) => {
    const newItems = data.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});

    setItems(newItems);
  }, []);

  const params = useMemo(() => {
    return { pagination: 9999 };
  }, []);

  const today = useMemo(() => {
    return getDateFocus();
  }, []);

  useFetch({
    endpoint: "ITEM_LIST",
    afterLoad,
    autoLoad: true,
    params,
  });

  // GOTO TOP
  const topRef = useRef(null);

  const gotoTop = useCallback(() => {
    if (window && topRef && topRef.current) {
      const rect = topRef.current.getBoundingClientRect();

      const top = (window?.scrollY || 0) + (rect?.y || 0) - 44;

      window.scrollTo({ top, left: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div ref={topRef} className="goto-top" />
      <AppContext.Provider value={{ today, items, setItems, gotoTop }}>
        {children}
      </AppContext.Provider>
    </>
  );
};
