import Card from "@/components/card";
import DateNavigator from "@/components/turnContentComponents/date-navigator";
import useYear from "./useYear";
import MonthView from "./month";

const YearView = () => {
  const { yearSequence, titleNavigation, navigate } = useYear();
  return (
    <div className="">
      <Card>
        <DateNavigator title={titleNavigation} navigate={navigate} roundTop />
        <div className="py-5 px-4">
          <div className="grid grid-cols-3">
            {yearSequence.yearMap.map((data) => (
              <MonthView key={data.num} data={data} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default YearView;
