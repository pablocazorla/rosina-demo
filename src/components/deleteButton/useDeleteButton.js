import { useCallback, useState } from "react";
import useFetch from "@/hooks/useFetch";

const useDeleteButton = (type, id, afterDelete) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  /* API **************************/
  const afterLoad = useCallback(() => {
    if (afterDelete) afterDelete();
  }, [afterDelete]);

  const [onDelete, , loading, error] = useFetch({
    endpoint: `${type}_DELETE`,
    method: "DELETE",
    afterLoad,
  });

  const onDeleteButton = useCallback(() => {
    onDelete({ params: { id } });
  }, [onDelete, id]);
  /* end API **************************/

  return { isOpen, toggleOpen, onDeleteButton, loading, error };
};

export default useDeleteButton;
