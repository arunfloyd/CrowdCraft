import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { userInfo } = useSelector(state => state.user);
  return userInfo ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
