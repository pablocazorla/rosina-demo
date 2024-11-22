const Row = ({ item, columns }) => {
  return (
    <tr className="border-b border-gray-300">
      {columns.map((column, key) => {
        return (
          <td key={key} className="py-1 px-2">
            {column.render ? column.render(item) : item[column.value]}
          </td>
        );
      })}
    </tr>
  );
};
export default Row;
