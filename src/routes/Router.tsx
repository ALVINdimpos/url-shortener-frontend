import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import ManageUrls from '@/pages/urls/ManageUrls';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import VisitUrl from '@/pages/urls/VisitUrl';
import UrlStats from '@/pages/urls/UrlStats';
import FallbackRoutes from './FallbackRoutes';
import LandingPage from '@/pages/home/LandingPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/urls">
          <Route path="" element={<ManageUrls />} />
          <Route path=":shortCode" element={<UrlStats />} />
        </Route>
        <Route path="/link/:shortCode" element={<VisitUrl />} />
      </Route>
      <Route path="*" element={<FallbackRoutes />} />
    </Routes>
  );
};

export default Router;
