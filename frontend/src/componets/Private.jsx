import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.token);
  return auth ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
