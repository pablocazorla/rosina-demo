import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { useEffect, useRef } from "react";
import clsx from "clsx";

const PhoneInput = ({ data, name, size = "md", disabled, disabledInput }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    intlTelInput(input, {
      // any initialisation options go here
      autoInsertDialCode: true,
      initialCountry: "ar",
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
      hiddenInput: function (telInputName) {
        return {
          phone: name,
          // country: "country_code",
        };
      },
    });
  }, [name]);

  return (
    <div className="">
      <input
        type="text"
        // name={name}
        defaultValue={(data && data[name]) || ""}
        className={clsx(
          "input block w-full border border-gray-400 rounded-md shadow-sm peer focus:outline-none",
          {
            "focus:border-primary focus:shadow-[0_0_6px_theme(colors.primary)]":
              !disabledInput,
            "p-3 text-base": size === "md",
            "p-2 text-sm": size === "sm",
            "bg-gray-200 text-gray-500": disabled || disabledInput,
          }
        )}
        ref={inputRef}
      />
    </div>
  );
};

export default PhoneInput;
