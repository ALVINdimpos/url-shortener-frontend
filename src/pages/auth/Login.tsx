import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';
import { InputErrorMessage } from '@/components/inputs/ErrorLabels';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/inputs/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Heading } from '@/components/inputs/TextInputs';
import { useLoginMutation } from '@/states/api/apiSlice';
import validateInputs from '@/helpers/validations.helper';
import { AppDispatch } from '@/states/store';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '@/states/features/userSlice';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '@/types';
import PublicNavbar from '@/containers/navigation/PublicNavbar';
import { localApiUrl } from '@/constants/environments.constants';

const Login = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // NAVIGATION
  const navigate = useNavigate();

  // REACT HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // INITIALIZE LOGIN
  const [
    login,
    {
      isLoading: loginIsLoading,
      reset: loginReset,
      isSuccess: loginIsSuccess,
      data: loginData,
    },
  ] = useLoginMutation();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    login({
      email: data?.email,
      password: data?.password,
    });
  });

  // HANDLE SUCCESS
  useEffect(() => {
    if (loginIsSuccess) {
      const decodedToken = jwtDecode(loginData?.data?.token);
      dispatch(
        setUser({
          email: (decodedToken as unknown as IUser)?.email,
          id: (decodedToken as unknown as IUser)?.id,
        })
      );
      dispatch(setToken(loginData?.data?.token));
      loginReset();
      navigate('/urls');
    }
  }, [loginData, loginIsSuccess, loginReset, dispatch, navigate]);

  return (
    <main className="w-full h-screen flex items-center justify-center bg-background">
      <PublicNavbar />
      <section className="min-w-[30%] relative top-10 bg-white py-12 px-12 rounded-md shadow-md">
        <article className="max-w-md flex flex-col items-center mx-auto w-full">
          <Heading className="text-3xl font-bold text-gray-800 mb-2">
            Log in and start sharing friendlier links
          </Heading>
          <p className="text-gray-600 mb-8">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>

          <form className="space-y-4 flex flex-col gap-4" onSubmit={onSubmit}>
            <menu className="w-full flex flex-col gap-2">
              <Link
                to="#"
                className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-primary hover:text-white transition"
                onClick={(e) => {
                  e.preventDefault();
                  const redirect_url = `${window.location.origin}/urls`;
                  window.location.href = `${localApiUrl}/auth/users/google?redirect_url=${encodeURIComponent(
                    redirect_url
                  )}`;
                }}
              >
                <>
                  <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
                  Continue with Google
                </>
              </Link>

              <Link
                to="#"
                className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-primary hover:text-white transition"
                onClick={(e) => {
                  e.preventDefault();
                  const redirect_url = `${window.location.origin}/urls`;
                  window.location.href = `${localApiUrl}/auth/users/github?redirect_url=${encodeURIComponent(
                    redirect_url
                  )}`;
                }}
              >
                <>
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                  Continue with GitHub
                </>
              </Link>
            </menu>

            <ul className="flex items-center gap-4 my-3">
              <hr className="flex-1 border-gray-200" />
              <span className="text-gray-500">OR</span>
              <hr className="flex-1 border-gray-200" />
            </ul>

            <fieldset className="space-y-4 flex flex-col gap-2">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: `Please enter a valid email address`,
                  validate: (value) =>
                    validateInputs(value, 'email') ||
                    'Please enter a valid email address',
                }}
                render={({ field }) => {
                  return (
                    <label className="w-full flex flex-col gap-2">
                      <Input
                        {...field}
                        placeholder="Enter your email address"
                        label="Email"
                        required
                      />
                      <InputErrorMessage message={errors?.email?.message} />
                    </label>
                  );
                }}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: 'Please enter your password' }}
                render={({ field }) => {
                  return (
                    <label className="flex flex-col gap-2">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        required
                        placeholder="********"
                        suffixIcon={!showPassword ? faEye : faEyeSlash}
                        suffixIconHandler={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                        {...field}
                      />
                      <InputErrorMessage message={errors.password?.message} />
                    </label>
                  );
                }}
              />

              {/* <Link
                to="/forgot-password"
                className="block text-sm w-fit self-end text-primary hover:underline"
              >
                Forgot your password?
              </Link> */}

              <Button
                type="submit"
                className="w-full"
                primary
                isLoading={loginIsLoading}
              >
                Log in
              </Button>
            </fieldset>

            <footer className="text-xs text-gray-500 mt-8">
              By logging in with an account, you agree to our{' '}
              <Link to="#" className="text-primary hover:underline">
                Terms of Service
              </Link>
              ,{' '}
              <Link to="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-primary hover:underline">
                Acceptable Use Policy
              </Link>
            </footer>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Login;
