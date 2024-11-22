import clsx from "clsx";
import { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import { useEffect, useState } from "react";
import { getDateFocus } from "@/utils/dateUtils";

const DateInput = ({
  name,
  placeholder,
  noTranslatePlaceholder,
  size = "md",
  onChange,
  onBlur,
  onFocus,
  disabled,
  disabledInput,
  ariaLabel,
  data,
}) => {
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    setValueInput((data && data[name]) || ""); //getDateFocus());
  }, [data, name]);

  return (
    <div className="flex items-stretch relative">
      <input
        name={name}
        type="date"
        className={clsx(
          "input block w-full border border-gray-400 rounded-md shadow-sm peer focus:outline-none order-2 border-l-0 rounded-tl-none rounded-bl-none",
          {
            "focus:border-primary focus:shadow-[0_0_6px_theme(colors.primary)]":
              !disabledInput,

            "p-3 text-base": size === "md",
            "p-2 text-sm": size === "sm",
            "bg-gray-200 text-gray-500": disabled || disabledInput,
          }
        )}
        placeholder={
          placeholder
            ? noTranslatePlaceholder
              ? placeholder
              : getI18Ntext(placeholder)
            : null
        }
        //defaultValue={defaultValueInput}
        value={valueInput}
        onChange={(e) => {
          if (!disabledInput) {
            setValueInput(e.target.value);
            if (onChange) onChange(e);
          }
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        aria-label={ariaLabel ? getI18Ntext(ariaLabel) : null}
      />
      <div
        className={clsx(
          "input-icon border text-gray-500 border-gray-400 order-1 border-r-0 rounded-tl-md rounded-bl-md w-[45px] flex flex-col justify-center items-center bg-gray-100 text-2xl",
          {
            "peer-focus:border-primary peer-focus:shadow-[0_0_6px_theme(colors.primary)]":
              !disabledInput,
          }
        )}
      >
        <Icon type="calendar" />
      </div>
    </div>
  );
};

export default DateInput;
