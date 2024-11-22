import Row from "./row";
import Th from "./th";
import I18N from "@/i18n";

const Table = ({ data, columns, filter, setFilter }) => {
  const list = data?.data || [];
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-100 border-spacing-0 text-sm">
        <thead className="border-b border-t bg-gray-100 border-gray-300 align-top">
          <tr>
            {columns.map((column) => {
              return (
                <Th
                  key={column.value}
                  header={column.header}
                  value={column.value}
                  sort={column?.sort}
                  filter={filter}
                  setFilter={setFilter}
                />
              );
            })}
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="text-center italic text-gray-500 p-2">
                  <I18N id="noData" />
                </div>
              </td>
            </tr>
          ) : (
            list.map((item) => {
              return <Row key={item.id} item={item} columns={columns} />;
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
