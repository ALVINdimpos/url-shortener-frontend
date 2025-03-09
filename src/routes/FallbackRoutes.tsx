import NotFoundPage from '@/pages/home/NotFoundPage';
import { RootState } from '@/states/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FallbackRoutes = () => {
  // STATE VARIABLES
  const { user, token } = useSelector((state: RootState) => state.user);

  // NAVIGATION
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !user) {
      navigate('/auth/login');
    }
  }, [navigate, token, user]);

  return <NotFoundPage />;
};

export default FallbackRoutes;
