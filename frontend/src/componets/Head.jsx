import { logout } from "../slices/authSlice";
import { useDispatch } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";



const HeaderWithExitButton = ({children}) => {
  
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  
    return (
        <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">{t('login.hexletChat')}</a>
          <Button as={Link} to="/login" state={{from: location}} onClick={() => dispatch(logout())}>{t('login.header')}</Button>
          </div>
          </nav>
          <div className="flex-grow-1 overflow-hidden">
          {children}
          </div>
          
          </div>
          
    )
}

const Header = ({children}) => {
  const {t} = useTranslation();
return (
        <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">{t('login.hexletChat')}</a>
          </div>
          </nav>
          <div className="flex-grow-1 overflow-hidden">
          {children}
          </div>
          </div>
          
    )
}
export { Header, HeaderWithExitButton};