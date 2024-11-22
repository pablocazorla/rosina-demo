import clsx from "clsx";
import { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import { useEffect, useState } from "react";
import { getDateFocus } from "@/utils/dateUtils";
import { minHour, maxHour } from "@/config/turnConfig";

const hourOptions = (() => {
  const list = [];

  let d = minHour;
  let e = 0;

  while (d <= maxHour) {
    const h = d < 10 ? `0${d}` : `${d}`;
    e = 0;
    while (e < 50) {
      const m = e < 10 ? `0${e}` : `${e}`;
      list.push(`${h}:${m}`);
      e += 15;
    }

    d++;
  }

  return list;
})();

const HourInput = ({
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
    setValueInput((data && data[name]) || getDateFocus());
  }, [data, name]);

  return (
    <div className="flex items-stretch relative">
      <select
        name={name}
        type="date"
        className={clsx(
          "cursor-pointer block w-full border border-gray-400 rounded-md shadow-sm peer focus:outline-none order-2 border-l-0 rounded-tl-none rounded-bl-none",
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
      >
        {hourOptions.map((item) => {
          return (
            <option key={item} value={`${item}:00`}>
              {item}
            </option>
          );
        })}
      </select>
      <div
        className={clsx(
          "input-icon border text-gray-500 border-gray-400 order-1 border-r-0 rounded-tl-md rounded-bl-md w-[45px] flex flex-col justify-center items-center bg-gray-100 text-2xl",
          {
            "peer-focus:border-primary peer-focus:shadow-[0_0_6px_theme(colors.primary)]":
              !disabledInput,
          }
        )}
      >
        <Icon type="hour" />
      </div>
    </div>
  );
};

export default HourInput;
