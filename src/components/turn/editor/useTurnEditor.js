import { AppContext } from "@/context/appContext";
import { TurnContext } from "@/context/turn-context";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useStore } from "@/store";
import moneyString from "@/utils/money";
import useFetch from "@/hooks/useFetch";

const useTurnEditor = (turn, dataForNewTurn, onClose) => {
  const { user } = useStore((state) => state.data);

  const initialStatusRef = useRef((turn || dataForNewTurn || {})?.status);

  const [cost, setCost] = useState(turn ? parseFloat(turn.cost) : 0);

  /* CLIENT **************************/
  const [defaultClient, setDefaultClient] = useState(
    turn
      ? {
          id: turn.client_id,
          name: turn.client_name,
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

  /* ITEMS **************************/
  const { items } = useContext(AppContext);
  const itemOptions = useMemo(() => {
    if (!items) return [];
    return Object.entries(items).map(([key, obj]) => {
      return {
        value: key,
        text: `${obj.name}${
          obj.cost !== "0" ? ` - ${moneyString(obj.cost)}` : ""
        }`,
      };
    });
  }, [items]);

  const onChangeItems = useCallback(
    (a) => {
      const list = a.split(",");
      if (list.length > 0) {
        const newCost = list.reduce((ob, item) => {
          return ob + parseFloat(items[item].cost);
        }, 0);
        setCost(Math.round(newCost * 100) / 100);
      } else {
        setCost(0);
      }
    },
    [items]
  );

  /* end ITEMS **************************/

  /* Client Historial **************************/
  const [showClientHistorial, setShowClientHistorial] = useState(false);
  const [historialTurn, setHistorialTurn] = useState({});

  const toggleClientHistorial = useCallback(() => {
    setShowClientHistorial((v) => !v);
  }, []);

  const afterCopyHistorial = useCallback(
    (previousTurn) => {
      setHistorialTurn(previousTurn);
      onChangeItems(previousTurn.item_ids);
    },
    [onChangeItems]
  );
  /* end Client Historial **************************/

  /* API **************************/

  const { reloadTurns } = useContext(TurnContext);

  // CHARGE POST
  const afterLoadChargePost = useCallback(() => {
    reloadTurns();
    if (onClose) onClose();
  }, [onClose, reloadTurns]);

  const [createCharge, , loadingCreateCharge, errorCreateCharge] = useFetch({
    endpoint: "CHARGE_POST",
    method: "POST",
    afterLoad: afterLoadChargePost,
  });

  // end CHARGE POST

  // TURN
  const afterLoad = useCallback(
    (turnToReturn) => {
      if (
        initialStatusRef.current !== "completed" &&
        turnToReturn?.data?.status === "completed"
      ) {
        const {
          client_id,
          client_name,
          id: turn_id,
          cost,
          description,
          day: date_created,
        } = turnToReturn.data;
        const params = {
          client_id,
          client_name,
          turn_id,
          cost,
          description,
          status: "completed",
          date_created,
        };
        createCharge({ params });
      } else {
        reloadTurns();
        if (onClose) onClose();
      }
    },
    [onClose, reloadTurns, createCharge]
  );

  const [createTurn, , loadingCreate, errorCreate] = useFetch({
    endpoint: "TURN_POST",
    method: "POST",
    afterLoad,
  });

  const [updateTurn, , loadingUpdate, errorUpdate] = useFetch({
    endpoint: "TURN_PUT",
    method: "PUT",
    afterLoad,
  });

  const afterDelete = useCallback(() => {
    reloadTurns();
    if (onClose) onClose();
  }, [onClose, reloadTurns]);


  // end TURN

  const onSubmit = useCallback(
    (params) => {
      if (turn) {
        updateTurn({
          params: {
            id: turn.id,
            ...params,
            editedBy: user?.id || "",
          },
        });
      } else {
        createTurn({
          params: {
            ...params,
            editedBy: user?.id || "",
          },
        });
      }
    },
    [turn, updateTurn, createTurn, user]
  );



  /* end API **************************/

  /* Data **************************/
  const dataInitial = useMemo(() => {
    return {
      ...(turn || {}),
      ...(dataForNewTurn ? { ...dataForNewTurn, duration: "30",location: "1" } : {}),
      ...historialTurn,
    };
  }, [turn, dataForNewTurn, historialTurn]);
  /* end Data **************************/

  return {
    dataInitial,
    //
    onSubmit,
    itemOptions,
    defaultClient,
    setDefaultClient,
    cost,
    setCost,
    onChangeItems,
    loading: loadingCreate || loadingUpdate || loadingCreateCharge,
    error: errorCreate || errorUpdate || errorCreateCharge,
    validations: {
      client_id: ["required"],
      item_ids: ["required"],
      cost: ["required"],
      location: ["required"],
      status: ["required"],
    },
    //
    showNewClient,
    toggleNewClient,
    afterNewClient,
    //
    showClientHistorial,
    toggleClientHistorial,
    afterCopyHistorial,
    afterDelete
  };
};

export default useTurnEditor;
