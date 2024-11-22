import clsx from "clsx";
import { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import { useEffect, useState } from "react";
import { getDateFocus } from "@/utils/dateUtils";
import { minHour, maxHour } from "@/config/turnConfig";

const durationOptions = [
  { value: "15", text: "15 min" },
  { value: "30", text: "30 min" },
  { value: "45", text: "45 min" },
  { value: "60", text: "1 hora" },
  { value: "75", text: "1 hora y 15 min" },
  { value: "90", text: "1 hora y media" },
  { value: "105", text: "1 hora y 45 min" },
  { value: "120", text: "2 horas" },
  { value: "135", text: "2 horas y 15 min" },
  { value: "150", text: "2 horas y media" },
  { value: "165", text: "2 horas y 45 min" },
  { value: "180", text: "3 horas" },
  { value: "195", text: "3 horas y 15 min" },
  { value: "210", text: "3 horas y media" },
  { value: "225", text: "3 horas y 45 min" },
  { value: "240", text: "4 horas" },
  { value: "255", text: "4 horas y 15 min" },
  { value: "270", text: "4 horas y media" },
  { value: "285", text: "4 horas y 45 min" },
  { value: "300", text: "5 horas" },
  { value: "330", text: "5 horas y media" },
  { value: "360", text: "6 horas" },
  { value: "390", text: "6 horas y media" },
  { value: "420", text: "7 horas" },
];

const DurationInput = ({
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
          "cursor-pointer block w-full border border-gray-400 rounded-md shadow-sm peer focus:outline-none",
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
        {durationOptions.map(({ value, text }) => {
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DurationInput;
