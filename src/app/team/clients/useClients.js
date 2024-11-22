import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";

const useClients = () => {
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

  const [fetchClients, data, loading, error] = useFetch({
    endpoint: "CLIENT_LIST",
    initialState: {
      elementsTotal: 0,
      elementsInPage: 0,
      page: 0,
      pagination: 10,
      orderBy: "created",
      orderTo: "DESC",
      data: [],
    },
  });

  useEffect(() => {
    fetchClients({
      params: filter,
    });
  }, [fetchClients, filter]);

  // CLIENT EDITOR
  const [clientToEdit, setClientToEdit] = useState(null);
  const [showClientEditor, setShowClientEditor] = useState(false);

  const closeClientEditor = useCallback(() => {
    setShowClientEditor(false);
  }, []);

  const onEditClient = useCallback((newClient) => {
    setClientToEdit(newClient);
    setShowClientEditor(true);
  }, []);
  const onCreateClient = useCallback(() => {
    setClientToEdit(null);
    setShowClientEditor(true);
  }, []);

  const afterEdited = useCallback(() => {
    set_filter({});
    setShowClientEditor(false);
  }, []);

  return {
    data,
    filter,
    setFilter,
    loading,
    error,
    //
    clientToEdit,
    showClientEditor,
    closeClientEditor,
    onEditClient,
    onCreateClient,
    afterEdited,
  };
};

export default useClients;
