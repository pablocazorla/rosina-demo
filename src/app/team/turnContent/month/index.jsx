import DateNavigator from "@/components/turnContentComponents/date-navigator";
import useMonth from "./useMonth";
import Card from "@/components/card";
import DayMonthView from "./day";
import clsx from "clsx";

const MonthView = () => {
  const { monthSequence, titleNavigation, navigate } = useMonth();

  return (
    <Card>
      <DateNavigator title={titleNavigation} navigate={navigate} roundTop />
      <div className="py-5 px-4">
        <div className="grid grid-cols-7 text-xs mb-2 font-bold">
          {monthSequence.headers.map((data, k) => (
            <div
              key={k}
              className={clsx("text-center", {
                "text-red-600": k === 6,
                "text-gray-500": k !== 6,
              })}
            >
              {data.short}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {monthSequence.monthMap.map((data, k) => (
            <DayMonthView key={k} data={data} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MonthView;
