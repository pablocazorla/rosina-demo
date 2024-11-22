import I18N from "@/i18n";
import { Form } from "@/components/form";
import usePagination from "./usePagination";
import Icon from "@/components/icon";

const Pagination = ({ data, filter, setFilter }) => {
  const {
    minPage,
    page,
    onChange,
    total,
    updateFilter,
    showPrevPage,
    notShowNextPage,
    prevPage,
    nextPage,
  } = usePagination(data, filter, setFilter);

  return (
    <div className="flex items-center  gap-1">
      {showPrevPage ? (
        <div className="h-5 flex-[0_0_auto] px-1.5 py-0">
          <button
            className="w-5 h-5 leading-[16px] text-center border text-xl rounded-full
            border-solid border-gray-400 text-gray-400  hover:bg-primary hover:border-primary hover:text-white"
            onClick={prevPage}
          >
            <Icon
              type="arrow-left"
              className="relative top-[-1px] left-[-2px]"
            />
          </button>
        </div>
      ) : null}
      <div>
        {total > 1 ? (
          <Form
            onSubmit={() => {
              updateFilter();
            }}
          >
            <input
              className="border border-gray-400 rounded-md px-1 text-center text-sm w-13 focus:outline-none"
              type="number"
              name="page"
              value={page - minPage + 1}
              onChange={onChange}
              onBlur={() => {
                updateFilter();
              }}
              step="1"
              min={minPage}
              max={total}
            />
          </Form>
        ) : (
          <div className="text-sm font-bold text-gray-800">1</div>
        )}
      </div>

      <div className="text-sm font-bold text-gray-800 spx-1">
        {`/ ${total}`} <I18N id="pagination.label" />
      </div>
      {notShowNextPage ? null : (
        <div className="pagination-c pagination-c-btn">
          <button
            className="w-5 h-5 leading-[16px] text-center border text-xl rounded-full
            border-solid border-gray-400 text-gray-400 hover:bg-primary hover:border-primary hover:text-white"
            onClick={nextPage}
          >
            <Icon type="arrow-right" className="relative top-[-2px]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
