import Modal from "@/components/modal";
import TurnBox from "./box";
import useTurn from "./useTurn";
import TurnViewer from "./viewer";
import TurnEditor from "./editor";

const Turn = ({ turn, isPastDay }) => {
  const { isOpen, onClose, onClickBox } = useTurn(turn, isPastDay);

  return (
    <>
      <TurnBox turn={turn} onClick={onClickBox} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        canMinimize
        title="turn.editor.title.edit"
      >
        {isPastDay ? (
          <TurnViewer turn={turn} onClose={onClose} />
        ) : (
          <TurnEditor turn={turn} onClose={onClose} />
        )}
      </Modal>
    </>
  );
};

export default Turn;
