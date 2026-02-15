import { logout } from "./slices/authSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';
import { Button } from "react-bootstrap";


const HeaderWithExitButton = ({children}) => {
  const auth = useSelector(state => state.auth.auth)
  
  const dispatch = useDispatch();
  const location = useLocation();
  
    return (
        <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
          <Button as={Link} to="/login" state={{from: location}} onClick={() => dispatch(logout())}>Выйти</Button>
          </div>
          </nav>
          <div className="flex-grow-1 overflow-hidden">
          {children}
          </div>
          
          </div>
          
    )
}

const Header = ({children}) => {
return (
        <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
          </div>
          </nav>
          <div className="flex-grow-1 overflow-hidden">
          {children}
          </div>
          </div>
          
    )
}
export { Header, HeaderWithExitButton};