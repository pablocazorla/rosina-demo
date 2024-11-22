import clsx from "clsx";
import Icon from "@/components/icon";
import { useState } from "react";
import I18N from "@/i18n";

const ModalBody = ({ title, children, onClose, canMinimize, backButton }) => {
  const [minimize, setMinimize] = useState(false);

  const toggleMinimize = () => {
    setMinimize(!minimize);
  };

  return (
    <>
      {minimize ? null : (
        <style
          dangerouslySetInnerHTML={{
            __html: "body{ overflow: hidden; }",
          }}
        />
      )}
      <div
        className="fixed inset-0 z-[1000] top-0 left-0 w-screen h-screen overflow-hidden bg-white/15 animate-showFromLeft"
        role="dialog"
        aria-modal="true"
      >
        <header
          className={clsx("absolute h-11 text-white left-0 w-full", {
            "top-0": !minimize,
            "top-auto bottom-4 px-5": minimize,
          })}
        >
          <div
            className={clsx("", {
              "bg-primary": !minimize,
              "bg-black rounded-full": minimize,
            })}
          >
            <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
              <div className="font-bold text-xl px-6">
                <I18N id={title} />
              </div>

              <div className="flex items-center gap-2">
                {canMinimize ? (
                  <button
                    className="h-11 w-11 text-4xl leading-none overflow-hidden"
                    title={minimize ? "Maximizar" : "Minimizar"}
                    onClick={toggleMinimize}
                  >
                    <Icon type={minimize ? "plus" : "minus"} />
                  </button>
                ) : null}
                <button
                  className="h-11 w-11 text-4xl leading-none overflow-hidden"
                  title={backButton ? "Volver" : "Cerrar"}
                  onClick={onClose}
                >
                  <Icon type={backButton ? "arrow-left" : "close"} />
                </button>
              </div>
            </div>
          </div>
        </header>
        <div
          className={clsx(
            "absolute bg-white top-11 left-0 bottom-0 w-full overflow-x-hidden overflow-y-auto",
            {
              invisible: minimize,
            }
          )}
        >
          <div className="max-w-md mx-auto py-4 px-6">
            {children}
            <div className="h-36"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBody;
