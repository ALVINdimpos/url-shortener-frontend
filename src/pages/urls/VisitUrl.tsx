import { Loader } from '@/components/inputs/Loader';
import { useGetUrl } from '@/hooks/urls.hooks';
import { RootState } from '@/states/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const VisitUrl = () => {
  // STATE VARIABLES
  const { url } = useSelector((state: RootState) => state.url);

  // NAVIGATION
  const { shortCode } = useParams();

  // GET URL
  useGetUrl({ shortCode: shortCode as string });

  useEffect(() => {
    if (url) {
      window.location.href = url?.long_url;
    }
  }, [url]);

  return (
    <main className="w-full flex flex-col gap-4 min-h-screen items-center justify-center">
      <figure className="w-[50%] flex flex-col gap-3">
        <h4 className="text-xl text-center font-bold text-primary">
          Redirecting...
        </h4>
        <Loader className="text-primary" />
      </figure>
    </main>
  );
};

export default VisitUrl;
