import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUrlStats } from '@/hooks/urls.hooks';
import Layout from '@/containers/navigation/Layout';
import { Heading } from '@/components/inputs/TextInputs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/states/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faExternalLink,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { formatDate } from '@/helpers/strings.helper';
import { baseUrl } from '@/constants/environments.constants';
import CustomBreadcrumb from '@/containers/navigation/CustomBreadcrumb';
import { setUrl } from '@/states/features/urlSlice';
import Button from '@/components/inputs/Button';

const UrlStats = () => {
  // NAVIGATION
  const { shortCode } = useParams();

  // GET URL
  const { urlStatsIsFetching } = useGetUrlStats({
    shortCode: shortCode as string,
  });

  // GET URL FROM STORE
  const dispatch: AppDispatch = useDispatch();
  const { url } = useSelector((state: RootState) => state.url);

  useEffect(() => {
    if (urlStatsIsFetching) {
      document.title = 'Loading...';
    } else if (url) {
      document.title = `Stats for ${url.short_code}`;
    }
  }, [url, urlStatsIsFetching]);

  // NAVIGATION LINKS
  const navigationLinks = [
    {
      label: 'Manage URLs',
      route: '/urls',
      icon: faLink,
    },
    {
      label: `${url?.short_code}`,
      route: `/urls/${url?.short_code}`,
      icon: faCircleInfo,
      isLoading: urlStatsIsFetching,
    },
  ];

  return (
    <Layout>
      <main className="w-full flex flex-col gap-8">
        {/* Header */}
        <header className="w-full flex flex-col gap-4">
          <CustomBreadcrumb navigationLinks={navigationLinks} />
          <Heading isLoading={urlStatsIsFetching}>
            {url?.short_code} Statistics
          </Heading>
        </header>

        {/* Stats Grid */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* URL Info Card */}
          <section className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
            <menu className="flex flex-col gap-4">
              <article className="flex flex-col gap-2">
                {/* <p className="text-gray-500 text-sm">Short URL</p> */}
                <Link
                  to={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      setUrl({
                        ...url,
                        clicks: url?.clicks ? url?.clicks + 1 : 1,
                      })
                    );
                    window.open(`${baseUrl}/link/${url?.short_code}`, '_blank');
                  }}
                  className="text-primary text-2xl font-medium hover:underline flex items-center gap-2"
                >
                  {`${baseUrl}/link/${url?.short_code}`}
                  <FontAwesomeIcon icon={faExternalLink} className="text-xs" />
                </Link>
              </article>
              <article className="flex flex-col gap-1">
                <p className="text-gray-300 text-sm">Original URL</p>
                <Link
                  to={url?.long_url || '#'}
                  target="_blank"
                  className="text-primary/80 text-sm hover:underline flex items-center gap-2"
                >
                  {url?.long_url}
                  <FontAwesomeIcon icon={faExternalLink} className="text-xs" />
                </Link>
              </article>
            </menu>
          </section>

          {/* Stats Cards */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <menu className="flex flex-col gap-4">
              <p className="text-gray-500">Total Clicks</p>
              <p className="text-2xl font-bold">{url?.clicks}</p>
            </menu>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <menu className="flex flex-col gap-4">
              <p className="text-gray-500">Date Added</p>
              <p>{formatDate(url?.createdAt, 'MMM DD, YYYY hh:mm A')}</p>
            </menu>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <menu className="flex flex-col gap-4">
              <p className="text-gray-500">Last Updated</p>
              <p>{formatDate(url?.updatedAt, 'MMM DD, YYYY hh:mm A')}</p>
            </menu>
          </section>
        </section>
        <menu className="w-full flex items-center gap-3 justify-between">
          <Button route="/urls">Back</Button>
        </menu>
      </main>
    </Layout>
  );
};

export default UrlStats;
