import { UnknownAction } from '@reduxjs/toolkit';
import { useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  return {
    page,
    setPage: setPage as (page: number) => UnknownAction,
    size,
    setSize: setSize as (size: number) => UnknownAction,
    totalPages,
    setTotalPages,
    totalCount,
    setTotalCount,
  };
};
