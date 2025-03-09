import Modal from '@/components/cards/Modal';
import { RootState } from '@/states/store';
import { AppDispatch } from '@/states/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCreateUrlModal } from '@/states/features/urlSlice';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import Input from '@/components/inputs/Input';
import { InputErrorMessage } from '@/components/inputs/ErrorLabels';
import Button from '@/components/inputs/Button';
import { useShortenUrlMutation } from '@/states/api/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '@/constants/environments.constants';
import store from 'store';

const CreateShortUrl = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { createUrlModal } = useSelector((state: RootState) => state.url);

  // REACT HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // NAVIGATION
  const navigate = useNavigate();

  // INITIALIZE SHORTEN URL MUTATION
  const [
    shortenUrl,
    {
      isLoading: shortenUrlIsLoading,
      isSuccess: shortenUrlIsSuccess,
      data: shortenUrlData,
      reset: shortenUrlReset,
    },
  ] = useShortenUrlMutation();

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setCreateUrlModal(false));
    reset({
      long_url: '',
    });
    shortenUrlReset();
    store.remove('url');
  }, [dispatch, reset, shortenUrlReset]);

  // HANDLE SUBMIT
  const onSubmit = handleSubmit((data: FieldValues) => {
    shortenUrl({
      long_url: data?.long_url,
    });
  });

  useEffect(() => {
    const url = store.get('url');
    if (url) {
      setValue('long_url', url);
    }
  }, [setValue]);

  return (
    <Modal
      isOpen={createUrlModal}
      onClose={closeModal}
      heading="Create Short URL"
    >
      {shortenUrlIsSuccess ? (
        <article className="w-full flex flex-col gap-4">
          <h4 className="font-semibold text-green-700 text-md">
            <FontAwesomeIcon icon={faCircleCheck} className="text-green-700" />{' '}
            Your link is available
          </h4>
          <p className="text-sm text-gray-500">
            {shortenUrlData?.data?.long_url ||
              'https://example.com/my-long-url'}
          </p>
          <menu className="p-3 flex items-start gap-2 justify-between px-4 rounded-md border-[.5px] border-primary">
            <Link
              to={`#`}
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `${baseUrl}/link/${shortenUrlData?.data?.short_code}`,
                  '_blank'
                );
              }}
              className="text-xl text-primary hover:underline"
            >
              {`${baseUrl}/link/${shortenUrlData?.data?.short_code}`}
            </Link>
            <ul className="w-fit flex flex-col items-center gap-2">
              <Button
                primary
                icon={faClipboard}
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(
                    `${baseUrl}/link/${shortenUrlData?.data?.short_code}`
                  );
                  toast.info('Copied to clipboard');
                }}
              >
                Copy
              </Button>
              <Button
                styled={false}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/urls/${shortenUrlData?.data?.short_code}`);
                  closeModal();
                }}
                className="flex items-center gap-2 text-sm hover:underline"
              >
                View details
              </Button>
            </ul>
          </menu>
        </article>
      ) : (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
          <Controller
            name="long_url"
            control={control}
            rules={{ required: `Please provide the long link to shorten` }}
            render={({ field }) => (
              <>
                <Input
                  label="Long URL"
                  required
                  placeholder="https://example.com/my-long-url"
                  {...field}
                />
                <InputErrorMessage message={errors.long_url?.message} />
              </>
            )}
          />
          <Button
            primary
            submit
            className="self-end"
            isLoading={shortenUrlIsLoading}
          >
            Get Short URL
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default CreateShortUrl;
