import { rowHeight } from "@/config/turnConfig";
import RowCreator from "./row-creator";
import Card from "@/components/card";
import DateNavigator from "@/components/turnContentComponents/date-navigator";
import useDay from "./useDay";
import CurrentHourBar from "./currentHourBar";
import Turn from "@/components/turn";

const DayView = () => {
  const {
    topCurrentHour,
    hourList,
    turnList,
    navigationTitle,
    navigate,
    isPastDay,
    isToday,
  } = useDay();

  return (
    <Card>
      <DateNavigator
        roundTop
        title={navigationTitle}
        isToday={isToday}
        navigate={navigate}
      />
      <div className="p-3">
        <div className="pt-4">
          <div className="relative">
            {hourList.map(({ hour }) => {
              return (
                <div key={hour} className="flex">
                  <div className="text-xs text-right w-14 pr-3 leading-none relative -top-1">
                    {`${hour < 10 ? `0${hour}` : hour}:00hs`}
                  </div>
                  <div
                    className="border-t-2 border-gray-300 grow"
                    style={{ height: rowHeight }}
                  >
                    <div className="border-b border-gray-300 h-1/2"></div>
                  </div>
                </div>
              );
            })}
            <div className="absolute top-0 bottom-0 left-14 right-0 overflow-hidden">
              {hourList.map(({ hour, day }) => {
                return (
                  <div key={hour}>
                    <RowCreator hour={hour} day={day} isPastDay={isPastDay} />
                    <RowCreator
                      hour={hour}
                      day={day}
                      mid
                      isPastDay={isPastDay}
                    />
                  </div>
                );
              })}
              {turnList.map((turn) => {
                return <Turn key={turn.id} turn={turn} isPastDay={isPastDay} />;
              })}
              <CurrentHourBar topCurrentHour={topCurrentHour} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DayView;
