import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import crypto from "crypto";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage === lastPage) {
      return null;
    }
    onPageChange(currentPage + 1);

  };

  const onPrevious = () => {
    if (currentPage === 1) {
      return null;
    } else {
      onPageChange(currentPage - 1);
    }

  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={classnames('flex p-2 justify-end align-middle rounded w-full gap-1 my-[3%]', { [className]: className })}

    >
      <li>
        <button
          className={classnames('p-3  shadow rounded hover:bg-colorSix dark:hover:bg-moroi-pinkdanger cursor-pointer self-center disabled:cursor-default disabled:bg-stone-300   bg-white dark:bg-moroi-dark text-stone-400 dark:text-colorFive',
            { disabled: currentPage === 1 }
          )}
          onClick={onPrevious}
          key={currentPage + lastPage}
          aria-label="Previous page"
        >
          <FaArrowLeft className='arrow left' />
        </button>
      </li>

      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="p-2">&#8230;</li>;
        }

        return (
          <li
            className={classnames('p-2 px-3  shadow rounded hover:bg-colorSix dark:hover:bg-moroi-pinkdanger cursor-pointer self-center active:bg-slate-100 dark:active:bg-colorRed  dark:bg-moroi-dark text-stone-400 dark:text-colorFive font-semibold', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
            key={currentPage + Math.random() * 100}
            aria-label={`Pagenumber ${pageNumber}`}
          >
            {pageNumber}
          </li>
        );
      })}

      <li>
        <button
          className={classnames('p-3  shadow rounded hover:bg-colorSix dark:hover:bg-moroi-pinkdanger cursor-pointer self-center disabled:cursor-default disabled:bg-stone-300 dark:bg-moroi-dark text-stone-400 dark:text-colorFive', {
            disabled: currentPage === lastPage
          })}
          onClick={onNext}
          key={currentPage + lastPage + 10}
          aria-label="Next page"
        >
          <FaArrowRight className=' arrow right' />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;