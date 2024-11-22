import ModalBody from "./modalBody";

const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  canMinimize,
  backButton,
}) => {
  return isOpen ? (
    <ModalBody
      onClose={onClose}
      canMinimize={canMinimize}
      backButton={backButton}
      title={title}
    >
      {children}
    </ModalBody>
  ) : null;
};

export default Modal;
