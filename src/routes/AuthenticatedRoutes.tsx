import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { setToken, setUser } from "@/states/features/userSlice";
import { AppDispatch, RootState } from "@/states/store";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types/user";

const AuthenticatedRoutes = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.user);

  // NAVIGATION
  const navigate = useNavigate();

  // NAVIGATION
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(
        setUser({
          email: (decodedToken as unknown as IUser)?.email,
          id: (decodedToken as unknown as IUser)?.id,
        })
      );
      dispatch(setToken(token));
      searchParams.delete("token");
      setSearchParams(searchParams);
    }
  }, [searchParams, dispatch, setSearchParams]);

  useEffect(() => {
    if (!token && !user && !searchParams.get("token")) {
      navigate("/auth/login");
    }
  }, [navigate, token, user, searchParams]);

  return <Outlet />;
};

export default AuthenticatedRoutes;
