import Modal from '@/components/cards/Modal';
import Button from '@/components/inputs/Button';
import { useDeleteUrlMutation } from '@/states/api/apiSlice';
import { setDeleteUrlModal, setSelectedUrl } from '@/states/features/urlSlice';
import { AppDispatch, RootState } from '@/states/store';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DeleteUrl = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { deleteUrlModal, selectedUrl } = useSelector(
    (state: RootState) => state.url
  );

  // INITIALIZE DELETE URL
  const [
    deleteUrl,
    { isLoading: urlIsLoading, isSuccess: urlIsSuccess, reset: urlReset },
  ] = useDeleteUrlMutation();

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setSelectedUrl(undefined));
    dispatch(setDeleteUrlModal(false));
    urlReset();
  }, [dispatch, urlReset]);

  // HANDLE DELETE URL
  useEffect(() => {
    if (urlIsSuccess) {
      if (selectedUrl?.id) {
        toast.success('URL deleted successfully');
      }
      closeModal();
    }
  }, [urlIsSuccess, closeModal, selectedUrl]);

  return (
    <Modal
      heading={`Delete ${selectedUrl?.short_code}`}
      headingClassName="text-red-700"
      isOpen={deleteUrlModal}
      onClose={closeModal}
    >
      <article className="w-full flex flex-col gap-4">
        <p>
          Are you sure you want to delete this URL? This action cannot be
          undone!
        </p>
        <Button
          isLoading={urlIsLoading}
          danger
          className="self-end"
          onClick={(e) => {
            e.preventDefault();
            if (selectedUrl?.id) {
              deleteUrl({ short_code: selectedUrl?.short_code });
            }
          }}
        >
          Delete
        </Button>
      </article>
    </Modal>
  );
};

export default DeleteUrl;
