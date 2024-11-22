
import { useCallback, useState } from "react";

const useTurn = (turn,isPastDay) => {
  const [isOpen, setIsOpen] = useState(false);


  const onClose = useCallback(()=>{
    setIsOpen(false);
  },[])

  const onClickBox = useCallback(()=>{
    setIsOpen(true);
  },[])

  return {
    isOpen,
    onClose,
    onClickBox
  };
};

export default useTurn;