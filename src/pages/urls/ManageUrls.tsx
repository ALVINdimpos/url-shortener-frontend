import { Heading } from "@/components/inputs/TextInputs";
import Layout from "@/containers/navigation/Layout";
import CreateShortUrl from "./CreateShortUrl";
import Button from "@/components/inputs/Button";
import { AppDispatch, RootState } from "@/states/store";
import { useDispatch, useSelector } from "react-redux";
import { setCreateUrlModal } from "@/states/features/urlSlice";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Table from "@/components/table/Table";
import { useFetchUrls, useUrlsColumns } from "@/hooks/urls.hooks";
import { useEffect } from "react";
import DeleteUrl from "./DeleteUrl";
import CustomBreadcrumb from "@/containers/navigation/CustomBreadcrumb";
import store from "store";

const ManageUrls = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { urlsList } = useSelector((state: RootState) => state.url);

  console.log(urlsList);

  // URLS COLUMNS
  const { urlsColumns } = useUrlsColumns();
  console.log(urlsColumns);
  // NAVIGATION LINKS
  const navigationLinks = [
    {
      label: "Manage URLs",
      route: "/urls",
      icon: faLink,
    },
  ];

  // FETCH URLS
  const {
    urlsIsFetching,
    page,
    size,
    totalPages,
    totalCount,
    setPage,
    setSize,
  } = useFetchUrls();

  useEffect(() => {
    document.title = "Manage URLs";
  }, []);

  useEffect(() => {
    const url = store.get("url");
    if (url) {
      dispatch(setCreateUrlModal(true));
    }
  }, [dispatch]);
  console.log(urlsColumns);
  return (
    <Layout>
      <main className="w-full flex flex-col gap-4">
        <nav className="w-full flex flex-col gap-4">
          <CustomBreadcrumb navigationLinks={navigationLinks} />
          <ul className="w-full flex items-center gap-4 justify-between">
            <Heading>Manage URLs</Heading>
            <Button
              primary
              icon={faLink}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setCreateUrlModal(true));
              }}
            >
              Create Short URL
            </Button>
          </ul>
        </nav>
        <section className="w-full flex flex-col gap-4">
          <Table
            data={urlsList}
            columns={urlsColumns}
            page={page}
            size={size}
            totalPages={totalPages}
            totalCount={totalCount}
            setPage={setPage}
            setSize={setSize}
            isLoading={urlsIsFetching}
          />
        </section>
      </main>
      <CreateShortUrl />
      <DeleteUrl />
    </Layout>
  );
};

export default ManageUrls;
