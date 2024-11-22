import locations, { locationsList } from "@/config/locations";

const LocationSelector = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="text-sm font-bold text-gray-500">Lugar:</div>
      <div className="flex border border-gray-300 rounded">
        <div
          className="w-4 border-r border-gray-300 rounded-l"
          style={{ backgroundColor: locations[value]?.color || "transparent" }}
        />
        <select
          className="text-sm px-1 py-1 rounded-r bg-transparent focus:outline-none w-full cursor-pointer"
          value={value}
          onChange={({ target }) => {
            if (onChange) onChange(target.value);
          }}
        >
          <option value="0">Todos</option>
          {locationsList.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default LocationSelector;
