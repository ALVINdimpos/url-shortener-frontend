import {
  useLazyAuthenticateWithGithubCallbackQuery,
  useLazyAuthenticateWithGithubQuery,
  useLazyAuthenticateWithGoogleCallbackQuery,
  useLazyAuthenticateWithGoogleQuery,
} from '@/states/api/apiQuerySlice';

// AUTHENTICATE WITH GOOGLE
export const useAuthenticateWithGoogle = () => {
  const [
    authenticateWithGoogle,
    {
      isFetching: authenticateWithGoogleIsFetching,
      isSuccess: authenticateWithGoogleIsSuccess,
    },
  ] = useLazyAuthenticateWithGoogleQuery();

  return {
    authenticateWithGoogle,
    authenticateWithGoogleIsFetching,
    authenticateWithGoogleIsSuccess,
  };
};

// AUTHENTICATE WITH GOOGLE CALLBACK
export const useAuthenticateWithGoogleCallback = () => {
  const [
    authenticateWithGoogleCallback,
    {
      isFetching: authenticateWithGoogleCallbackIsFetching,
      isSuccess: authenticateWithGoogleCallbackIsSuccess,
    },
  ] = useLazyAuthenticateWithGoogleCallbackQuery();

  return {
    authenticateWithGoogleCallback,
    authenticateWithGoogleCallbackIsFetching,
    authenticateWithGoogleCallbackIsSuccess,
  };
};

// AUTHENTICATE WITH GITHUB
export const useAuthenticateWithGithub = () => {
  const [
    authenticateWithGithub,
    {
      isFetching: authenticateWithGithubIsFetching,
      isSuccess: authenticateWithGithubIsSuccess,
    },
  ] = useLazyAuthenticateWithGithubQuery();

  return {
    authenticateWithGithub,
    authenticateWithGithubIsFetching,
    authenticateWithGithubIsSuccess,
  };
};

// AUTHENTICATE WITH GITHUB CALLBACK
export const useAuthenticateWithGithubCallback = () => {
  const [
    authenticateWithGithubCallback,
    {
      isFetching: authenticateWithGithubCallbackIsFetching,
      isSuccess: authenticateWithGithubCallbackIsSuccess,
    },
  ] = useLazyAuthenticateWithGithubCallbackQuery();

  return {
    authenticateWithGithubCallback,
    authenticateWithGithubCallbackIsFetching,
    authenticateWithGithubCallbackIsSuccess,
  };
};
