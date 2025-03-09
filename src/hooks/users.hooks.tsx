import { useLazyGetUserByIdQuery } from '@/states/api/apiQuerySlice';
import { setUserProfile } from '@/states/features/userSlice';
import { AppDispatch } from '@/states/store';
import { UUID } from '@/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// GET USER BY ID
export const useGetUserById = ({ id }: { id?: UUID }) => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();

  const [getUserById, { isFetching: userIsFetching }] =
    useLazyGetUserByIdQuery();

  useEffect(() => {
    if (id) {
      getUserById({ id })
        .unwrap()
        .then(({ data }) => {
          dispatch(setUserProfile(data));
        });
    }
  }, [getUserById, id, dispatch]);

  return {
    userIsFetching,
  };
};

