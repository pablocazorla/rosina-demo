import { useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";

const useChargeEditor = (charge, onClose, afterEdited) => {
  /* API **************************/
  const afterLoad = useCallback(
    (data) => {
      if (afterEdited) afterEdited(data?.data || null);
      if (onClose) onClose();
    },
    [afterEdited, onClose]
  );

  const [createCharge, , loadingCreate, errorCreate] = useFetch({
    endpoint: "CHARGE_POST",
    method: "POST",
    afterLoad,
  });

  const [updateCharge, , loadingUpdate, errorUpdate] = useFetch({
    endpoint: "CHARGE_PUT",
    method: "PUT",
    afterLoad,
  });

  const onSubmit = useCallback(
    (params) => {
      if (charge) {
        updateCharge({
          params: {
            id: charge.id,
            ...params,
          },
        });
      } else {
        createCharge({ params });
      }
    },
    [charge, updateCharge, createCharge]
  );
  /* end API **************************/

  const afterDelete = useCallback(() => {
    if (afterEdited) afterEdited(null);
    if (onClose) onClose();
  }, [afterEdited, onClose]);

  /* CLIENT **************************/
  const [defaultClient, setDefaultClient] = useState(
    charge
      ? {
          id: charge.client_id,
          name: charge.client_name,
        }
      : null
  );

  /* New Client **************************/
  const [showNewClient, setShowNewClient] = useState(false);
  const toggleNewClient = useCallback(() => {
    setShowNewClient((v) => !v);
  }, []);

  const afterNewClient = useCallback((newClient) => {
    setDefaultClient({
      id: newClient.id,
      name: newClient.name,
    });
  }, []);

  /* end CLIENT **************************/

  return {
    defaultClient,
    setDefaultClient,
    toggleNewClient,
    showNewClient,
    afterNewClient,
    //
    data: charge || {},
    onSubmit,
    loading: loadingCreate || loadingUpdate,
    error: errorCreate || errorUpdate,
    validations: {
      client_id: ["required"],
      cost: ["required"],
      status: ["required"],
    },
    afterDelete,
  };
};

export default useChargeEditor;
