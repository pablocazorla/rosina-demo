import { rowHeight } from "@/config/turnConfig";
import Modal from "@/components/modal";
import TurnEditor from "@/components/turn/editor";
import { useMemo, useState } from "react";

const RowCreatorEditor = ({ hour, day, mid }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const dataForNewTurn = useMemo(() => {
    return {
      startTime: `${hour < 10 ? `0${hour}` : hour}:${mid ? "30" : "00"}:00`,
      day,
      status: "pending",
    };
  }, [hour, day, mid]);

  return (
    <>
      <div
        className="hover:bg-primary/20 w-full cursor-pointer"
        style={{ height: 0.5 * rowHeight }}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        canMinimize
        title="turn.editor.title.new"
      >
        <TurnEditor dataForNewTurn={dataForNewTurn} onClose={onClose} />
      </Modal>
    </>
  );
};

const RowCreatorNone = () => {
  return <div className="w-full" style={{ height: 0.5 * rowHeight }} />;
};

const RowCreator = ({ isPastDay, hour, day, mid }) => {
  return isPastDay ? (
    <RowCreatorNone />
  ) : (
    <RowCreatorEditor hour={hour} day={day} mid={mid} />
  );
};
export default RowCreator;
