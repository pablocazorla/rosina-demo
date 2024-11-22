import I18N from "@/i18n";
import Icon from "@/components/icon";
import PadSearch from "./pad";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

const ClientSearch = ({ onChange, lg, defaultClient }) => {
  const [currentClient, setCurrentClient] = useState(defaultClient);
  const [show, setShow] = useState(false);

  const onSetCurrentClient = useCallback(
    (client) => {
      setCurrentClient(client);
      if (onChange) onChange(client);
    },
    [onChange]
  );

  useEffect(() => {
    setCurrentClient(defaultClient);
  }, [defaultClient]);

  const client = currentClient;

  return (
    <div className="min-w-40 relative">
      <div
        className={clsx(
          "border  w-full flex items-center justify-between gap-2",
          {
            "text-sm border-gray-300 px-2 py-1 rounded": !lg,
            "border-gray-400 px-3 py-2 rounded-tl rounded-bl": lg,
          }
        )}
      >
        {client ? (
          <div className="flex items-center justify-between gap-2 grow">
            <div className="cursor-pointer grow" onClick={() => setShow(true)}>
              {client.name}
            </div>
            <div
              className="hover:opacity-60"
              onClick={() => {
                onSetCurrentClient(null);
              }}
            >
              <Icon />
            </div>
          </div>
        ) : (
          <div
            className="italic text-gray-400 cursor-pointer grow"
            onClick={() => setShow(true)}
          >
            <I18N id="search.turn.placeholder" />
          </div>
        )}
        <div className="cursor-pointer" onClick={() => setShow(true)}>
          <Icon type="search" className="text-gray-500" />
        </div>
      </div>
      {show && (
        <PadSearch
          onSetCurrentClient={onSetCurrentClient}
          setShow={setShow}
          startName={client?.name || ""}
        />
      )}
    </div>
  );
};

export default ClientSearch;
