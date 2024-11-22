import { useCallback } from "react";
import useFetch from "@/hooks/useFetch";

const useItemEditor = (item, onClose, afterEdited) => {
  /* API **************************/
  const afterLoad = useCallback(
    (data) => {
      if (afterEdited) afterEdited(data?.data || null);
      if (onClose) onClose();
    },
    [afterEdited, onClose]
  );

  const [createItem, , loadingCreate, errorCreate] = useFetch({
    endpoint: "ITEM_POST",
    method: "POST",
    afterLoad,
  });

  const [updateItem, , loadingUpdate, errorUpdate] = useFetch({
    endpoint: "ITEM_PUT",
    method: "PUT",
    afterLoad,
  });

  const onSubmit = useCallback(
    (params) => {
      if (item) {
        updateItem({
          params: {
            id: item.id,
            ...params,
          },
        });
      } else {
        createItem({ params });
      }
    },
    [item, updateItem, createItem]
  );
  /* end API **************************/

  const afterDelete = useCallback(() => {
    if (afterEdited) afterEdited(null);
    if (onClose) onClose();
  }, [afterEdited, onClose]);

  return {
    data: item || {},
    onSubmit,
    loading: loadingCreate || loadingUpdate,
    error: errorCreate || errorUpdate,
    validations: {
      name: ["required"],
      categories: ["required"],
      cost: ["required"],
    },
    afterDelete,
  };
};

export default useItemEditor;
