import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import { useMemo } from "react";

const Th = ({ header, value, sort, filter, setFilter }) => {
  const { order, dir } = useMemo(() => {
    if (!sort) return { order: false, dir: 1 };

    const dir = filter?.orderTo === "ASC" ? 1 : -1;
    const order = filter?.orderBy === value;
    return { order, dir };
  }, [sort, value, filter]);

  return (
    <th className="text-left py-1 px-2">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={
          sort
            ? () => {
                if (order) {
                  if (dir > 0) {
                    setFilter({ orderTo: "DESC", page: undefined });
                  } else {
                    setFilter({ orderTo: "ASC", page: undefined });
                  }
                } else {
                  setFilter({
                    orderBy: value,
                    orderTo: "DESC",
                    page: undefined,
                  });
                }
              }
            : null
        }
      >
        <div>
          <I18N id={header} />
        </div>
        {sort ? (
          <div
            className={clsx("text-xl leading-none", {
              "opacity-20": !order,
            })}
          >
            <Icon type={`chevron-${dir < 0 ? "down" : "up"}`} />
          </div>
        ) : null}
      </div>
    </th>
  );
};

export default Th;
