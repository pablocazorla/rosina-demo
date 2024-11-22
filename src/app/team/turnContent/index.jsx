import Card from "@/components/card";
import ViewNavigator from "@/components/turnContentComponents/view-navigator";
import DayView from "./day";
import { useContext } from "react";
import { TurnContext } from "@/context/turn-context";
import WeekView from "./week";
import MonthView from "./month";
import YearView from "./year";
import ClientSearch from "@/components/client/clientSearch";
import LoadingBox from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import LocationSelector from "@/components/locationSelector";
import Container from "@/components/container";

const TurnContent = () => {
  const { view, setClientId, loadingTurns, errorTurns, location, setLocation } =
    useContext(TurnContext);

  return (
    <Container>
      <Card className="mb-2">
        <div className="py-2 px-3 border-b border-gray-300">
          <ViewNavigator />
        </div>
        <div className="flex items-center justify-between py-2 px-3">
          <LocationSelector
            value={location}
            onChange={(location) => {
              setLocation(location);
            }}
          />
          <ClientSearch
            onChange={(client) => {
              setClientId(client?.id || null);
            }}
          />
        </div>
      </Card>
      <ErrorAlert error={errorTurns} />
      {errorTurns ? null : (
        <>
          {view === 0 && <DayView />}
          {view === 1 && <WeekView />}
          {view === 2 && <MonthView />}
          {view === 3 && <YearView />}
        </>
      )}
      <LoadingBox loading={loadingTurns} />
    </Container>
  );
};

export default TurnContent;
