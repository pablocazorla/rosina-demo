import Icon from "@/components/icon";
import useClientSearch from "./useClientSearch";

const Item = ({ item, onSetCurrentClient }) => {
  return (
    <div
      className="px-2 py-1 cursor-pointer hover:bg-primary/20"
      onMouseDown={() => {
        onSetCurrentClient(item);
      }}
    >
      {item.name}
    </div>
  );
};

const PadSearch = ({ onSetCurrentClient, setShow, startName }) => {
  const { inputRef, inputValue, setInputValue, loading, list } =
    useClientSearch(startName);

  return (
    <div className="md:absolute fixed md:z-50 z-[8000] md:-top-1 top-0 md:-right-1 md:left-auto left-0 bg-white md:shadow-xl md:min-w-80 md:w-auto w-full md:h-auto h-screen overflow-y-scroll md:border md:border-gray-300 md:pt-0 pt-8">
      <div className="absolute top-0 right-0 p-2 md:hidden block">
        <Icon />
      </div>
      <div className="relative p-2">
        <input
          type="text"
          className="w-full border-b border-gray-300 py-1 pl-1 pr-5 focus:outline-none focus:border-primary"
          ref={inputRef}
          onBlur={() => {
            setTimeout(() => {
              setShow(false);
            }, 200);
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Icon
          type={loading ? "loading" : "search"}
          className="absolute  top-4 right-2 text-gray-500"
        />
      </div>
      {list.map((item) => {
        return (
          <Item
            key={item.id}
            onSetCurrentClient={onSetCurrentClient}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default PadSearch;
