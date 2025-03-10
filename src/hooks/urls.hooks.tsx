import {
  useLazyFetchUrlsQuery,
  useLazyGetUrlQuery,
  useLazyGetUrlStatsQuery,
} from "@/states/api/apiQuerySlice";
import { usePagination } from "./pagination.hooks";
import { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IUrl } from "@/types";
import { AppDispatch, RootState } from "@/states/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteUrlModal,
  setSelectedUrl,
  setUpdateUrl,
  setUrl,
  setUrlsList,
} from "@/states/features/urlSlice";
import { formatDate } from "@/helpers/strings.helper";
import CustomTooltip from "@/components/inputs/CustomTooltip";
import { Link } from "react-router-dom";
import { baseUrl } from "@/constants/environments.constants";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import CustomPopover from "@/components/inputs/CustomPopover";

// FETCH URLS
export const useFetchUrls = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { deleteUrlModal, createUrlModal } = useSelector(
    (state: RootState) => state.url
  );

  // PAGINATION
  const {
    page,
    size,
    totalPages,
    totalCount,
    setPage,
    setSize,
    setTotalPages,
    setTotalCount,
  } = usePagination();

  // INITIALIZE FETCH URLS
  const [fetchUrls, { isFetching: urlsIsFetching }] = useLazyFetchUrlsQuery();

  console.log(fetchUrls);

  useEffect(() => {
    if (!deleteUrlModal && !createUrlModal) {
      fetchUrls({ page, size })
        .unwrap()
        .then(({ data }) => {
          dispatch(setUrlsList(data));
          setTotalPages(data.totalPages);
          setTotalCount(data.totalCount);
        });
    }
  }, [
    createUrlModal,
    deleteUrlModal,
    dispatch,
    fetchUrls,
    page,
    setTotalCount,
    setTotalPages,
    size,
  ]);

  return {
    urlsIsFetching,
    page,
    size,
    totalPages,
    totalCount,
    setPage,
    setSize,
  };
};

// URLS COLUMNS
export const useUrlsColumns = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();

  const urlsColumns: ColumnDef<IUrl>[] = useMemo(
    () => [
      {
        id: "no",
        header: "No.",
        accessorKey: "no",
        cell: ({ row }) => row?.index + 1,
      },
      {
        id: "short_code",
        header: "Short Code",
        accessorKey: "short_code",
        cell: ({ row }) => (
          <CustomTooltip label="Click to visit">
            <Link
              to={`#`}
              className="hover:underline"
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  setUpdateUrl({
                    ...row?.original,
                    clicks: row?.original?.clicks
                      ? row?.original?.clicks + 1
                      : 1,
                  })
                );
                window.open(
                  `${baseUrl}/link/${row?.original?.short_code}`,
                  "_blank"
                );
              }}
            >
              {row?.original?.short_code}
            </Link>
          </CustomTooltip>
        ),
      },
      {
        id: "long_url",
        header: "Long URL",
        accessorKey: "long_url",
        cell: ({ row }) =>
          row?.original?.long_url?.length > 40
            ? `${row?.original?.long_url?.substring(0, 50)}...`
            : row?.original?.long_url,
      },
      {
        id: "clicks",
        header: "Clicks",
        accessorKey: "clicks",
        cell: ({ row }) => row?.original?.clicks,
      },
      {
        id: "created_at",
        header: "Date added",
        accessorKey: "created_at",
        cell: ({ row }) =>
          formatDate(row?.original?.createdAt, "MMM DD, YYYY hh:mm A"),
      },
      {
        id: "updated_at",
        header: "Last updated",
        accessorKey: "updated_at",
        cell: ({ row }) =>
          formatDate(row?.original?.updatedAt, "MMM DD, YYYY hh:mm A"),
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => {
          return (
            <CustomPopover
              trigger={
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className="cursor-pointer bg-slate-200 hover:bg-slate-300 rounded-md p-1 px-4 text-primary"
                />
              }
            >
              <menu className="w-full flex flex-col gap-2">
                <Link
                  to={`${row.original.short_code}`}
                  className="text-primary flex items-center gap-2 text-sm hover:bg-background p-1 px-3 rounded-md"
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="text-primary text-sm"
                  />
                  View stats
                </Link>
                <Link
                  to={`#`}
                  className="text-red-700 flex items-center gap-2 text-sm hover:bg-background p-1 px-3 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setSelectedUrl(row?.original));
                    dispatch(setDeleteUrlModal(true));
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-700 text-sm"
                  />
                  Delete
                </Link>
              </menu>
            </CustomPopover>
          );
        },
      },
    ],
    [dispatch]
  );

  return { urlsColumns };
};

// GET URL
export const useGetUrl = ({ shortCode }: { shortCode: string }) => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();

  const [getUrl, { isFetching: urlIsFetching }] = useLazyGetUrlQuery();

  useEffect(() => {
    if (shortCode) {
      getUrl({ shortCode })
        .unwrap()
        .then(({ data }) => {
          dispatch(setUrl(data));
        });
    }
  }, [getUrl, shortCode, dispatch]);

  return { urlIsFetching };
};

// GET URL STATS
export const useGetUrlStats = ({ shortCode }: { shortCode: string }) => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();

  const [getUrlStats, { isFetching: urlStatsIsFetching }] =
    useLazyGetUrlStatsQuery();

  useEffect(() => {
    if (shortCode) {
      getUrlStats({ shortCode })
        .unwrap()
        .then(({ data }) => {
          dispatch(setUrl(data));
        });
    }
  }, [dispatch, getUrlStats, shortCode]);

  return {
    urlStatsIsFetching,
  };
};
