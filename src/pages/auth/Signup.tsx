import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import { InputErrorMessage } from "@/components/inputs/ErrorLabels";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "@/components/inputs/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Heading } from "@/components/inputs/TextInputs";
import { useSignupMutation } from "@/states/api/apiSlice";
import validateInputs from "@/helpers/validations.helper";
import PublicNavbar from "@/containers/navigation/PublicNavbar";
import { localApiUrl } from "@/constants/environments.constants";

const Signup = () => {
  // STATE VARIABLES
  const [showPassword, setShowPassword] = useState(false);

  // REACT HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // NAVIGATION
  const navigate = useNavigate();

  // INITIALIZE SIGNUP
  const [
    signup,
    {
      isLoading: signupIsLoading,
      reset: signupReset,
      isSuccess: signupIsSuccess,
      data: signupData,
    },
  ] = useSignupMutation();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    signup({
      email: data?.email,
      password: data?.password,
      username: data?.username,
    });
  });

  // HANDLE SUCCESS
  useEffect(() => {
    if (signupIsSuccess) {
      reset({
        email: "",
        password: "",
        username: "",
      });
      signupReset();
      navigate("/auth/login");
    }
  }, [reset, signupData, signupIsSuccess, signupReset, navigate]);

  return (
    <main className="w-full h-screen flex items-center justify-center bg-background">
      <PublicNavbar />
      <section className="min-w-[30%] relative top-8 bg-white py-12 px-12 rounded-md shadow-md">
        <article className="max-w-md flex flex-col items-center mx-auto w-full">
          <Heading className="text-3xl font-bold text-gray-800 mb-2">
            Create your account
          </Heading>
          <p className="text-gray-600 mb-8">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Log in
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
                onClick={(e) => {
                  e.preventDefault();
                  const redirect_url = `${window.location.origin}/urls`;
                  window.location.href = `${localApiUrl}/auth/users/github?redirect_url=${encodeURIComponent(
                    redirect_url
                  )}`;
                }}
                className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-primary hover:text-white transition"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                Continue with GitHub
              </Link>
            </menu>

            <ul className="flex items-center gap-4 my-3">
              <hr className="flex-1 border-gray-200" />
              <span className="text-gray-500">OR</span>
              <hr className="flex-1 border-gray-200" />
            </ul>

            <fieldset className="space-y-4 flex flex-col gap-2">
              <Controller
                name="username"
                control={control}
                rules={{ required: `Please enter a valid username` }}
                render={({ field }) => {
                  return (
                    <label className="w-full flex flex-col gap-2">
                      <Input
                        {...field}
                        placeholder="Enter your username"
                        label="Username"
                        required
                      />
                      <InputErrorMessage message={errors?.username?.message} />
                    </label>
                  );
                }}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: `Please enter a valid email address`,
                  validate: (value) =>
                    validateInputs(value, "email") ||
                    "Please enter a valid email address",
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
                rules={{ required: "Please create a password" }}
                render={({ field }) => {
                  return (
                    <label className="flex flex-col gap-2">
                      <Input
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        required
                        placeholder="Create a strong password"
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

              <Button
                type="submit"
                className="w-full"
                primary
                isLoading={signupIsLoading}
              >
                Create free account
              </Button>
            </fieldset>

            <footer className="text-xs text-gray-500 mt-8">
              By creating an account, you agree to our{" "}
              <Link to="#" className="text-primary hover:underline">
                Terms of Service
              </Link>
              ,{" "}
              <Link to="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
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

export default Signup;
