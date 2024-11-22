import useInputContainer from "./useInputContainer";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";

const InputContainer = ({
  validate,
  error,
  className = "mb-5",
  children,
  customErrorText,
}) => {
  const { errorMessage } = useInputContainer(validate, error);

  return (
    <div
      className={clsx(className, { "is-invalid": errorMessage })}
      aria-invalid={errorMessage ? true : null}
      aria-errormessage={errorMessage ? getI18Ntext(errorMessage) : null}
    >
      {children}
      {errorMessage && (
        <div className="text-danger text-sm px-1">
          <I18N id={customErrorText || errorMessage} />
        </div>
      )}
    </div>
  );
};

export default InputContainer;
