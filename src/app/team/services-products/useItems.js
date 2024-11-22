import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";

const useItems = () => {
  const [filter, set_filter] = useState({});

  const setFilter = useCallback((newFilters) => {
    set_filter((oldFilters) => {
      const filtersRaw = {
        ...oldFilters,
        ...newFilters,
      };
      for (const key in filtersRaw) {
        if (typeof filtersRaw[key] === "undefined") {
          delete filtersRaw[key];
        }
      }
      return filtersRaw;
    });
  }, []);

  const [fetchItems, data, loading, error] = useFetch({
    endpoint: "ITEM_LIST",
    initialState: {
      elementsTotal: 0,
      elementsInPage: 0,
      page: 0,
      pagination: 9999,
      orderBy: "created",
      orderTo: "DESC",
      data: [],
    },
  });

  useEffect(() => {
    fetchItems({
      params: {
        pagination: 9999,
        ...filter,
      },
    });
  }, [fetchItems, filter]);

  // ITEM EDITOR
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showItemEditor, setShowItemEditor] = useState(false);

  const closeItemEditor = useCallback(() => {
    setShowItemEditor(false);
  }, []);

  const onEditItem = useCallback((newItem) => {
    setItemToEdit(newItem);
    setShowItemEditor(true);
  }, []);
  const onCreateItem = useCallback(() => {
    setItemToEdit(null);
    setShowItemEditor(true);
  }, []);

  const afterEdited = useCallback(() => {
    set_filter({});
    setShowItemEditor(false);
  }, []);

  return {
    data,
    filter,
    setFilter,
    loading,
    error,
    //
    itemToEdit,
    showItemEditor,
    closeItemEditor,
    onEditItem,
    onCreateItem,
    afterEdited,
  };
};

export default useItems;
