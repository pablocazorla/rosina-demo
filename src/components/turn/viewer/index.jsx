import Label from "@/components/label";
import { AppContext } from "@/context/appContext";
import { useContext, useMemo } from "react";
import {
  parseDay,
  normalizeHour,
  addDurationToStartTime,
} from "@/utils/dateUtils";

import Icon from "@/components/icon";

import locations from "@/config/locations";
import MinimalEditor from "./minimal-editor";
import I18N from "@/i18n";

const TurnViewer = ({ turn, onClose }) => {
  const { items } = useContext(AppContext);

  const {
    client_name,
    description,
    day,
    duration,
    startTime,
    status,
    location,
    cost,
    item_ids,
  } = turn;

  const item_list = useMemo(() => {
    const list = item_ids.split(",");
    return list.map((id) => {
      return items[id];
    });
  }, [items, item_ids]);

  const dayString = useMemo(() => {
    const d = parseDay(day);
    return `${d.weekDay.short}. ${d.day} de ${d.month.short}, ${d.year}`;
  }, [day]);

  const timeString = useMemo(() => {
    const endTime = addDurationToStartTime(startTime, duration);
    return `${normalizeHour(startTime)}  a  ${endTime} (${duration} min.)`;
  }, [startTime, duration]);

  const locationPosition = useMemo(() => {
    return locations[location] || null;
  }, [location]);

  return (
    <div className="">
      <div className="border-b border-gray-300 mb-3 pb-4">
        <div className="mb-3">
          <Label>
            <I18N id="form.Client" />
          </Label>
          <div className="text-2xl font-semibold">{client_name}</div>
        </div>

        <div className="flex items-start gap-6 font-semibold text-gray-600">
          <div>
            <div className="text-sm flex items-center gap-1 mb-2">
              <Icon type="calendar" className="text-gray-900" />
              {dayString}
            </div>
            <div className="text-sm flex items-center gap-1">
              <Icon type="hour" className="text-gray-900" />
              {timeString}
            </div>
          </div>
          {locationPosition ? (
            <div className="text-sm flex items-center gap-1">
              <div
                style={{ color: locationPosition.color }}
                className="leading-none"
              >
                <Icon type="map" />
              </div>

              {locationPosition.name}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-4">
        <Label>
          <I18N id="form.ItemIds" />
        </Label>
        <ul className=" list-disc pl-5">
          {item_list.map(({ id, name, type }) => (
            <li key={id}>{`${name} (${type})`}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <Label>
          <I18N id="form.Descripcion" />
        </Label>
        <div className="text-sm">{description}</div>
      </div>
      <MinimalEditor turn={turn} onClose={onClose} />
    </div>
  );
};

export default TurnViewer;
