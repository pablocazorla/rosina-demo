import I18N from "@/i18n";
import Icon from "@/components/icon";
import Modal from "@/components/modal";
import useDeleteButton from "./useDeleteButton";
import Button from "@/components/button";
import LoadingBox from "@/components/loading";
import ErrorAlert from "../errorAlert";

const DeleteButtonContent = ({ type, id, name, afterDelete }) => {
  const { isOpen, toggleOpen, onDeleteButton, loading, error } =
    useDeleteButton(type, id, afterDelete);
  return (
    <>
      <div className="border-t border-gray-400 py-4 text-center">
        <div
          className="text-red-500 hover:text-red-700 px-2 cursor-pointer"
          onClick={toggleOpen}
        >
          <div className="flex items-center gap-1">
            <Icon type="trash" />
            <I18N id={`delete.${type}.btn`} />
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={toggleOpen} title={`delete.${type}.btn`}>
        <div className="pt-5">
          <p className="text-center text-xl text-balance mb-4">
            <I18N id={`delete.${type}.text`} values={[name]} />
          </p>
          <ErrorAlert error={error} />
          <div className="flex items-stretch gap-4 justify-center pt-4 pb-8">
            <div
              className="font-bold hover:bg-gray-400 hover:text-white border-2 border-gray-400 text-gray-500 py-3 px-4 leading-none rounded-md transition-colors cursor-pointer"
              onClick={toggleOpen}
            >
              <I18N id="form.Cancel" />
            </div>
            <div
              class="cursor-pointer font-bold hover:opacity-90 transition-opacity bg-primary text-white  py-2 rounded-lg px-8"
              onClick={onDeleteButton}
            >
              <I18N id="form.Delete" />
            </div>
          </div>
        </div>
        <LoadingBox loading={loading} />
      </Modal>
    </>
  );
};

const DeleteButton = ({ type, id, name, afterDelete }) => {
  return id ? (
    <DeleteButtonContent
      type={type}
      id={id}
      name={name}
      afterDelete={afterDelete}
    />
  ) : null;
};

export default DeleteButton;
