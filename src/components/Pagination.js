import React from "react";

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex flex-col items-center my-2">
      <div className="flex text-white">
        <div
          className={`h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-primary-green-300 ${
            currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div className="flex h-12 font-medium rounded-full bg-primary-green-400">
          {pageNumbers.map((number) => (
            <div
              onClick={() => paginate(number)}
              key={number}
              className={`w-12  justify-center items-center hidden  ${
                number === currentPage && "bg-primary-green-300 text-white"
              } cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  `}
            >
              {number}
            </div>
          ))}
        </div>
        <div
          className={`h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-primary-green-300 ${
            currentPage < pageNumbers[pageNumbers.length - 1]
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50"
          }`}
          onClick={() =>
            currentPage < pageNumbers[pageNumbers.length - 1] &&
            paginate(currentPage + 1)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
