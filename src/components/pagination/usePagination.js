import { useCallback, useEffect, useState, useMemo } from "react";

const minPage = 0;

const usePagination = (data, filter, setFilter) => {
  const total = useMemo(() => {
    if (data?.elementsTotal && data?.pagination) {
      return Math.ceil(data.elementsTotal / data.pagination);
    }
    return 1;
  }, [data]);

  const [page, setPage] = useState(minPage);

  useEffect(() => {
    setPage(filter?.page || minPage);
  }, [filter]);

  const updateFilter = useCallback(
    (num) => {
      const newPage = typeof num === "undefined" ? page : num;
      setFilter({ page: newPage === minPage ? undefined : newPage });
    },
    [setFilter, page]
  );

  const onChange = useCallback(({ target }) => {
    setPage(target.value !== "" ? parseInt(target.value) + minPage - 1 : 1);
  }, []);

  //////////////
  const prevPage = useCallback(() => {
    if (page > minPage) {
      setPage(page - 1);
      updateFilter(page - 1);
    }
  }, [page, updateFilter]);

  const nextPage = useCallback(() => {
    if (page < total + minPage - 1) {
      setPage(page + 1);
      updateFilter(page + 1);
    }
  }, [total, page, updateFilter]);

  return {
    minPage,
    page,
    onChange,
    total,
    updateFilter,

    showPrevPage: filter?.page && filter?.page > minPage,
    notShowNextPage:
      total <= 1 || (filter?.page && filter?.page >= total + minPage - 1),
    prevPage,
    nextPage,
  };
};

export default usePagination;
