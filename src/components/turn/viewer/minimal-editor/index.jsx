import Label from "@/components/label";
import StatusBadge from "@/components/statusBadge";
import I18N from "@/i18n";
import moneyString from "@/utils/money";
import clsx from "clsx";
import Editor from "./editor";
import CancelButton from "@/components/button/cancel";

const NotEditableContent = ({ status, cost, onClose }) => {
  return (
    <>
      <div className="flex gap-5 mb-5">
        <div className="">
          <Label>
            <I18N id="form.Cost" />
          </Label>
          <div
            className={clsx("font-semibold", {
              "line-through text-gray-500": status === "cancelled",
            })}
          >
            {moneyString(cost)}
          </div>
        </div>
        <div className="">
          <Label>
            <I18N id="form.Status" />
          </Label>
          <div className="">
            <StatusBadge status={status} />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-4 text-center">
        <CancelButton onClick={onClose}>Cerrar</CancelButton>
      </div>
    </>
  );
};

const MinimalEditor = ({ turn, onClose }) => {
  const { status, cost } = turn;

  return status === "completed" || status === "cancelled" ? (
    <NotEditableContent status={status} cost={cost} onClose={onClose} />
  ) : (
    <Editor turn={turn} onClose={onClose} />
  );
};

export default MinimalEditor;
