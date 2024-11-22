import { Form } from "@/components/form";
import Icon from "@/components/icon";
import { useCallback, useEffect, useState } from "react";

const SearchClients = ({ filter, setFilter }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(filter?.search || "");
  }, [filter]);

  const onSubmit = useCallback(
    ({ search }) => {
      if (!search) {
        setFilter({ search: undefined, page: undefined });
      } else {
        setFilter({ search, page: undefined });
      }
    },
    [setFilter]
  );

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex items-center gap-1 border border-gray-400 rounded-md pr-1">
        <input
          type="text"
          name="search"
          className="w-full rounded-md px-2 focus:outline-none"
          placeholder="Buscar..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {!value ? (
          <Icon type="search" />
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => {
              setValue("");
              onSubmit({ search: undefined });
            }}
          >
            <Icon />
          </div>
        )}
      </div>
    </Form>
  );
};

export default SearchClients;
