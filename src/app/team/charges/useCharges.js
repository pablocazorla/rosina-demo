import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";

const useCharges = () => {
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

  const [fetchCharges, data, loading, error] = useFetch({
    endpoint: "CHARGE_LIST",
    initialState: {
      elementsTotal: 0,
      elementsInPage: 0,
      page: 0,
      pagination: 10,
      orderBy: "date_created",
      orderTo: "DESC",
      data: [],
    },
  });

  useEffect(() => {
    fetchCharges({
      params: filter,
    });
  }, [fetchCharges, filter]);

  // CHARGES EDITOR
  const [chargeToEdit, setChargeToEdit] = useState(null);
  const [showChargeEditor, setShowChargeEditor] = useState(false);

  const closeChargeEditor = useCallback(() => {
    setShowChargeEditor(false);
  }, []);

  const onEditCharge = useCallback((newCharge) => {
    setChargeToEdit(newCharge);
    setShowChargeEditor(true);
  }, []);
  const onCreateCharge = useCallback(() => {
    setChargeToEdit(null);
    setShowChargeEditor(true);
  }, []);

  const afterEdited = useCallback(() => {
    set_filter({});
    setShowChargeEditor(false);
  }, []);

  return {
    data,
    filter,
    setFilter,
    loading,
    error,
    //
    chargeToEdit,
    showChargeEditor,
    closeChargeEditor,
    onEditCharge,
    onCreateCharge,
    afterEdited,
  };
};

export default useCharges;
