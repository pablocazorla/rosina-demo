import Card from "@/components/card";
import DateNavigator from "@/components/turnContentComponents/date-navigator";
import DayWeekView from "./day";
import useWeek from "./useWeek";

const WeekView = () => {
  const { weekSequence, navegationTitle, navigate } = useWeek();

  return (
    <>
      <Card className="mb-2">
        <DateNavigator title={navegationTitle} navigate={navigate} />
      </Card>
      <div className="jk">
        {weekSequence.weekMap.map((data) => (
          <DayWeekView key={data.date} data={data} />
        ))}
      </div>
    </>
  );
};

export default WeekView;
