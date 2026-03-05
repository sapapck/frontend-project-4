import { logout } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const Header = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = useSelector(state => state.auth.token);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const showExitButton = isLoggedIn && !isAuthPage;

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {t('login.hexletChat')}
          </Link>

          {showExitButton && (
            <Button
              as={Link}
              to="/login"
              state={{ from: location }}
              onClick={() => dispatch(logout())}
            >
              {t('login.header')}
            </Button>
          )}
        </div>
      </nav>
      <div className="flex-grow-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default Header;
