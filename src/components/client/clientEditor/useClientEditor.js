import { useCallback, useState } from "react";
import useFetch from "@/hooks/useFetch";

const useClientEditor = (client, onClose, afterEdited) => {
  /* API **************************/
  const afterLoad = useCallback(
    (data) => {
      if (afterEdited) afterEdited(data?.data || null);
      if (onClose) onClose();
    },
    [afterEdited, onClose]
  );

  const [createClient, , loadingCreate, errorCreate] = useFetch({
    endpoint: "CLIENT_POST",
    method: "POST",
    afterLoad,
  });

  const [updateClient, , loadingUpdate, errorUpdate] = useFetch({
    endpoint: "CLIENT_PUT",
    method: "PUT",
    afterLoad,
  });

  const onSubmit = useCallback(
    (params) => {
      if (client) {
        updateClient({
          params: {
            id: client.id,
            ...params,
          },
        });
      } else {
        createClient({ params });
      }
    },
    [client, updateClient, createClient]
  );
  /* end API **************************/

  /* Client Historial **************************/
  const [showClientHistorial, setShowClientHistorial] = useState(false);
  const toggleClientHistorial = useCallback(() => {
    setShowClientHistorial((v) => !v);
  }, []);
  /* end Client Historial **************************/

  const afterDelete = useCallback(() => {
    if (afterEdited) afterEdited(null);
    if (onClose) onClose();
  }, [afterEdited, onClose]);

  return {
    data: client || {},
    onSubmit,
    loading: loadingCreate || loadingUpdate,
    error: errorCreate || errorUpdate,
    validations: {
      name: ["required"],
    },
    //
    showClientHistorial,
    toggleClientHistorial,
    afterDelete,
  };
};

export default useClientEditor;
