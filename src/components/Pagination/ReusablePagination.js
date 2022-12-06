import { useState } from "react";

const ReusablePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

    const maxPage = Math.ceil(data.length / itemsPerPage);

    const currentData = () => {
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage;
      return data.slice(from, to);
    };

    const next = () => {
      setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    };

    const previous = () => {
      setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    };

    const jump = (page) => {
      const pageNumber = Math.max(1, page);
      setCurrentPage(() => Math.min(pageNumber, maxPage));
    };

    return { next, previous, jump, currentData, currentPage, maxPage };

};

export default ReusablePagination;
